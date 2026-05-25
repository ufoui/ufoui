import {
    argbFromHex,
    ColorGroup,
    CustomColor,
    CustomColorGroup,
    Hct,
    hexFromArgb,
    themeFromSourceColor,
    TonalPalette,
} from '@material/material-color-utilities';

import type { ColorRoleValue, CustomColorConfig, ThemeColorSchemes, ThemeCustomColors } from '../types';
import { ColorRegistryEntry, setColorRegistry } from './colorRegistry';

type RegColor = Record<string, ColorRegistryEntry>;

function resolveSeed(input: CustomColorConfig): string {
    if (typeof input === 'string') {
        return input;
    }
    const { light } = input.main;
    return typeof light === 'string' ? light : light.color;
}

function resolveRole(value: ColorRoleValue): { color: string; on?: string } {
    return typeof value === 'string' ? { color: value } : value;
}
/**
 * Generates a full ThemeColorSchemes object (light and dark modes) based on a seed color
 * and optional custom semantic colors.
 *
 * Internally uses the Material Design 3 `themeFromSourceColor()` generator. Each color is blended
 * toward the source hue and expanded into a full set of roles: main, `on*`, `Container`,
 * `onContainer`, `Fixed`, `onFixed`, `FixedDim`, and `onFixedVariant`.
 *
 * Built-in defaults (`info`, `warning`, `success`) are always included unless overridden.
 *
 * @remarks
 * Each entry in `colors` accepts two forms:
 *
 * - **String** — seed hex used to generate the full MD3 tonal palette. All roles are MD3-computed.
 *   ```ts
 *   { info: '#2196f3' }
 *   ```
 *
 * - **Object** — allows exact color overrides per mode:
 *   - `main.light` / `main.dark` — overrides the primary role token. `dark` defaults to `light` if omitted.
 *   - `on` color is derived automatically from the overridden color's luminance (HCT tone < 50 → white, ≥ 50 → near-black)
 *     unless provided explicitly via `{ color, on }`.
 *   - `fixed` — controls the `Fixed` / `onFixed` tokens:
 *     - omitted: inherited from `main` override
 *     - `'preserve'`: keeps the MD3-generated values
 *     - object `{ light, dark? }`: explicit override, same rules as `main`
 *   - `Container` roles are always MD3-generated and cannot be overridden here.
 *   ```ts
 *   { brandBlue: { main: { light: '#0057FF' }, fixed: 'preserve' } }
 *   { brandBlue: { main: { light: { color: '#0057FF', on: '#FFD600' } } } }
 *   ```
 *
 * @param seedColor - Hex string used as the MD3 source color for the primary palette. Defaults to `#6750A4`.
 * @param colors - Optional map of semantic color configs (core + augmented via `CustomColors`).
 *
 * @returns A fully resolved `ThemeColorSchemes` object for light and dark modes.
 *          Also updates the global color registry via `setColorRegistry()`.
 *
 * @example
 * ```ts
 * const schemes = generateMaterialColors('#6200ee', {
 *     info: '#2196f3',
 *     brandBlue: { main: { light: '#0057FF', dark: '#0057FF' } },
 *     brandBlueYellow: { main: { light: { color: '#0057FF', on: '#FFD600' } } },
 * });
 * const primary = schemes.light.primary;
 * const brandBlue = schemes.dark.brandBlue;
 * const onBrandBlueYellow = schemes.light.onBrandBlueYellow; // '#FFD600'
 * ```
 *
 * @category Theme
 */

export function generateMaterialColors(seedColor = '#6750A4', colors: ThemeCustomColors = {}): ThemeColorSchemes {
    const regColor: RegColor = {};
    const schemes: ThemeColorSchemes = { light: {}, dark: {} };
    const sourceColor = colors.primary ? argbFromHex(resolveSeed(colors.primary)) : argbFromHex(seedColor);

    // Build the list of custom colors passed to themeFromSourceColor.
    // Defaults (info, warning, success) are included unless the caller overrides them.
    // Each user color is reduced to a single seed hex via resolveSeed (object form → main.light.color).
    // blend: true makes material-color-utilities harmonise each color toward the source hue.
    const customColorsList: CustomColor[] = Object.entries({
        info: '#03a9f4',
        warning: '#ffd600',
        success: '#689f38',
        ...Object.fromEntries(Object.entries(colors).map(([k, v]) => [k, resolveSeed(v)])),
    }).map(([name, hex]) => ({ value: argbFromHex(hex), name, blend: true }));

    const theme = themeFromSourceColor(sourceColor, customColorsList);
    const baseSchemes: ('light' | 'dark')[] = ['light', 'dark'];

    const themeKeys = Object.keys(theme.schemes.light.toJSON());
    // Copy all numeric MD3 scheme tokens (primary, secondary, surface, outline, etc.) into both light and dark schemes.
    // theme.schemes[mode] exposes keys as numbers (ARGB), so we convert each to hex.
    baseSchemes.forEach(mdScheme => {
        themeKeys.forEach(key => {
            if (typeof theme.schemes[mdScheme][key as keyof typeof theme.schemes.light] === 'number') {
                schemes[mdScheme][key] = hexFromArgb(
                    theme.schemes[mdScheme][key as keyof typeof theme.schemes.light] as number
                );
            }
        });
    });

    schemes.light.scrim = '#00000052';
    schemes.dark.scrim = '#00000052';
    // Write the four standard MD3 roles for each blended custom color (color, onColor, colorContainer, onColorContainer)
    // into both schemes and register each role in regColor so ControlStyle can resolve it.
    theme.customColors.forEach(item => {
        const pascalColorName = item.color.name[0].toUpperCase() + item.color.name.slice(1);
        const colorMap: Record<string, string> = {
            color: item.color.name,
            onColor: `on${pascalColorName}`,
            colorContainer: `${item.color.name}Container`,
            onColorContainer: `on${pascalColorName}Container`,
        };
        regColor[colorMap.color] = { type: 'semantic', onColor: colorMap.onColor };
        regColor[colorMap.onColor] = { type: 'theme', onColor: colorMap.color };
        regColor[colorMap.colorContainer] = { type: 'extended', onColor: colorMap.onColorContainer };
        regColor[colorMap.onColorContainer] = { type: 'text', onColor: colorMap.colorContainer };
        baseSchemes.forEach(mdScheme => {
            Object.keys(colorMap).forEach(key => {
                schemes[mdScheme][colorMap[key]] = hexFromArgb(item[mdScheme][key as keyof ColorGroup]);
            });
        });
    });

    // Generate Fixed/FixedDim/onFixed/onFixedVariant tokens for the four core MD3 roles.
    // These are not included in the scheme object, so we derive them manually from the tonal palette:
    // Fixed = tone 90, FixedDim = tone 80, onFixed = tone 10, onFixedVariant = tone 30.
    ['primary', 'secondary', 'tertiary', 'error'].forEach(colorName => {
        const pascalColorName = colorName[0].toUpperCase() + colorName.slice(1);
        regColor[colorName] = { type: 'semantic', onColor: `on${pascalColorName}` };
        regColor[`on${pascalColorName}`] = { type: 'theme', onColor: colorName };
        regColor[`${colorName}Container`] = { type: 'extended', onColor: `on${pascalColorName}Container` };
        regColor[`on${pascalColorName}Container`] = { type: 'text', onColor: `${colorName}Container` };
        baseSchemes.forEach(mdScheme => {
            schemes[mdScheme][`${colorName}Fixed`] = hexFromArgb(
                theme.palettes[colorName as keyof typeof theme.palettes].tone(90)
            );
            regColor[`${colorName}Fixed`] = { type: 'extended', onColor: `on${pascalColorName}Fixed` };

            schemes[mdScheme][`${colorName}FixedDim`] = hexFromArgb(
                theme.palettes[colorName as keyof typeof theme.palettes].tone(80)
            );
            regColor[`${colorName}FixedDim`] = { type: 'border', onColor: `on${pascalColorName}FixedVariant` };

            schemes[mdScheme][`on${pascalColorName}Fixed`] = hexFromArgb(
                theme.palettes[colorName as keyof typeof theme.palettes].tone(10)
            );
            regColor[`on${pascalColorName}Fixed`] = { type: 'text', onColor: `${colorName}Fixed` };

            schemes[mdScheme][`on${pascalColorName}FixedVariant`] = hexFromArgb(
                theme.palettes[colorName as keyof typeof theme.palettes].tone(30)
            );
            regColor[`on${pascalColorName}FixedVariant`] = { type: 'text', onColor: `${colorName}FixedDim` };
        });
    });

    const bw = {
        black: '#000000',
        white: '#ffffff',
    };
    Object.assign(schemes.light, bw);
    Object.assign(schemes.dark, bw);
    regColor.white = { type: 'surface', onColor: 'black' };
    regColor.black = { type: 'surface', onColor: 'white' };

    // Same Fixed tokens as above for user-defined custom colors.
    // Because custom palettes are not in theme.palettes, we rebuild the tonal palette via TonalPalette.fromInt
    // using the blended ARGB value that material-color-utilities produced for the custom color.
    const getTone = (color: number, toneValue: number) => {
        const p = TonalPalette.fromInt(color);
        return hexFromArgb(p.tone(toneValue));
    };

    theme.customColors.forEach((customColor: CustomColorGroup) => {
        const colorName = customColor.color.name;
        const pascalColorName = colorName[0].toUpperCase() + colorName.slice(1);
        regColor[`${colorName}Fixed`] = { type: 'extended', onColor: `on${pascalColorName}Fixed` };
        regColor[`${colorName}FixedDim`] = { type: 'border', onColor: `on${pascalColorName}FixedVariant` };
        regColor[`on${pascalColorName}Fixed`] = { type: 'text', onColor: `${colorName}Fixed` };
        regColor[`on${pascalColorName}FixedVariant`] = { type: 'text', onColor: `${colorName}FixedDim` };

        baseSchemes.forEach(mdScheme => {
            const generatedColor = customColor[mdScheme].color;
            schemes[mdScheme][`${colorName}Fixed`] = getTone(generatedColor, 90);
            schemes[mdScheme][`${colorName}FixedDim`] = getTone(generatedColor, 80);
            schemes[mdScheme][`on${pascalColorName}Fixed`] = getTone(generatedColor, 10);
            schemes[mdScheme][`on${pascalColorName}FixedVariant`] = getTone(generatedColor, 30);
        });
    });

    // Override main and on-main tokens for object-form configs only — strings use MD3-generated values as-is.
    // When on is not provided, derive it from the overridden color's luminance (Hct tone):
    // dark color (tone < 50) → light on (tone 100), light color (tone >= 50) → dark on (tone 10).
    const deriveOn = (hex: string) => {
        const argb = argbFromHex(hex);
        return hexFromArgb(TonalPalette.fromInt(argb).tone(Hct.fromInt(argb).tone < 50 ? 100 : 10));
    };
    Object.entries(colors).forEach(([colorName, config]) => {
        if (typeof config === 'string') {
            return;
        }
        const pascalName = colorName[0].toUpperCase() + colorName.slice(1);
        const onKey = `on${pascalName}`;

        const lightRole = resolveRole(config.main.light);
        schemes.light[colorName] = lightRole.color;
        schemes.light[onKey] = lightRole.on ?? deriveOn(lightRole.color);

        const darkRole = resolveRole(config.main.dark ?? config.main.light);
        schemes.dark[colorName] = darkRole.color;
        schemes.dark[onKey] = darkRole.on ?? deriveOn(darkRole.color);

        // fixed: undefined → inherit from main; 'preserve' → leave MD3 as-is; object → apply override same as main.
        if (!config.fixed) {
            schemes.light[`${colorName}Fixed`] = schemes.light[colorName];
            schemes.light[`on${pascalName}Fixed`] = schemes.light[onKey];
            schemes.dark[`${colorName}Fixed`] = schemes.dark[colorName];
            schemes.dark[`on${pascalName}Fixed`] = schemes.dark[onKey];
        } else if (config.fixed !== 'preserve') {
            const lightFixed = resolveRole(config.fixed.light);
            schemes.light[`${colorName}Fixed`] = lightFixed.color;
            schemes.light[`on${pascalName}Fixed`] = lightFixed.on ?? deriveOn(lightFixed.color);

            const darkFixed = resolveRole(config.fixed.dark ?? config.fixed.light);
            schemes.dark[`${colorName}Fixed`] = darkFixed.color;
            schemes.dark[`on${pascalName}Fixed`] = darkFixed.on ?? deriveOn(darkFixed.color);
        }
    });

    schemes.light.surface = hexFromArgb(theme.palettes.neutral.tone(99));
    regColor.surface = { type: 'surface', onColor: 'onSurface' };
    schemes.light.surfaceDim = hexFromArgb(theme.palettes.neutral.tone(87));
    regColor.surfaceDim = { type: 'surface', onColor: 'onSurface' };
    schemes.light.surfaceBright = hexFromArgb(theme.palettes.neutral.tone(99));
    regColor.surfaceBright = { type: 'surface', onColor: 'onSurface' };
    schemes.light.surfaceContainerLowest = hexFromArgb(theme.palettes.neutral.tone(100));
    regColor.surfaceContainerLowest = { type: 'surface', onColor: 'onSurface' };
    schemes.light.surfaceContainerLow = hexFromArgb(theme.palettes.neutral.tone(96));
    regColor.surfaceContainerLow = { type: 'surface', onColor: 'onSurface' };
    schemes.light.surfaceContainer = hexFromArgb(theme.palettes.neutral.tone(94));
    regColor.surfaceContainer = { type: 'surface', onColor: 'onSurface' };
    schemes.light.surfaceContainerHigh = hexFromArgb(theme.palettes.neutral.tone(92));
    regColor.surfaceContainerHigh = { type: 'surface', onColor: 'onSurface' };
    schemes.light.surfaceContainerHighest = hexFromArgb(theme.palettes.neutral.tone(90));
    regColor.surfaceContainerHighest = { type: 'surface', onColor: 'onSurface' };

    schemes.dark.surface = hexFromArgb(theme.palettes.neutral.tone(6));
    schemes.dark.surfaceDim = hexFromArgb(theme.palettes.neutral.tone(6));
    schemes.dark.surfaceBright = hexFromArgb(theme.palettes.neutral.tone(24));
    schemes.dark.surfaceContainerLowest = hexFromArgb(theme.palettes.neutral.tone(4));
    schemes.dark.surfaceContainerLow = hexFromArgb(theme.palettes.neutral.tone(10));
    schemes.dark.surfaceContainer = hexFromArgb(theme.palettes.neutral.tone(12));
    schemes.dark.surfaceContainerHigh = hexFromArgb(theme.palettes.neutral.tone(17));
    schemes.dark.surfaceContainerHighest = hexFromArgb(theme.palettes.neutral.tone(22));

    schemes.light.surfaceTint = hexFromArgb(theme.palettes.primary.tone(40));
    regColor.surfaceTint = { type: 'theme' };
    schemes.dark.surfaceTint = hexFromArgb(theme.palettes.primary.tone(80));

    regColor.surfaceVariant = { type: 'surface', onColor: 'onSurfaceVariant' };
    regColor.scrim = { type: 'theme' };
    regColor.onSurface = { type: 'text', onColor: 'surface' };
    regColor.onSurfaceVariant = { type: 'text', onColor: 'surfaceVariant' };
    regColor.background = { type: 'surface', onColor: 'onBackground' };
    regColor.onBackground = { type: 'text', onColor: 'background' };
    regColor.inverseSurface = { type: 'surface', onColor: 'inverseOnSurface' };
    regColor.inverseOnSurface = { type: 'theme', onColor: 'inverseSurface' };
    regColor.outline = { type: 'border', onColor: 'surface' };
    regColor.outlineVariant = { type: 'border', onColor: 'inverseSurface' };
    regColor.inversePrimary = { type: 'theme', onColor: 'onPrimaryContainer' };
    regColor.shadow = { type: 'theme' };
    setColorRegistry(regColor);

    return schemes;
}
