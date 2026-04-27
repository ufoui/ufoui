import {
    argbFromHex,
    ColorGroup,
    CustomColor,
    CustomColorGroup,
    hexFromArgb,
    themeFromSourceColor,
    TonalPalette,
} from '@material/material-color-utilities';

import type { ThemeColorSchemes, ThemeCustomColors } from '../types';
import { ColorRegistryEntry, setColorRegistry } from './colorRegistry';

type RegColor = Record<string, ColorRegistryEntry>;
/**
 * Generates a full ThemeColorSchemes object (light and dark modes) based on a seed color,
 * and optional semantic seed colors.
 *
 * Internally uses the Material Design 3 `themeFromSourceColor()` generator and applies
 * full resolution of all MD3 roles as defined in ThemeSchemeKeys.
 *
 * Custom semantic colors (e.g. `info`, `warning`, `success`) are blended into the palette
 * and expanded to support `Container`, `Fixed`, `Dim`, and `on*` roles.
 *
 * @param seedColor - Optional seed color in hex (e.g. "#6200ee"). Used as the base for the primary palette.
 *                    Defaults to `#6750A4` if not provided.
 * @param colors - Optional map of semantic base colors (core + augmented).
 *                 Defaults include `info`, `warning`, and `success`.
 *
 * @returns A fully resolved ThemeColorSchemes object with all required color roles populated for light and dark modes.
 *          Also updates the global color registry via `setColorRegistry()`.
 *
 * @example
 * ```ts
 * const schemes = generateMaterialColors('#6200ee', { info: '#2196f3' });
 * const primary = schemes.light.primary;
 * ```
 *
 * @category Theme
 */

export function generateMaterialColors(seedColor = '#6750A4', colors: ThemeCustomColors = {}): ThemeColorSchemes {
    const regColor: RegColor = {};
    const schemes: ThemeColorSchemes = { light: {}, dark: {} };
    const sourceColor = colors.primary ? argbFromHex(colors.primary) : argbFromHex(seedColor);

    const resolvedColors: Record<string, string> = {
        ...{
            info: '#03a9f4',
            warning: '#ffd600',
            success: '#689f38',
        },
        ...colors,
    };
    const customColorsList: CustomColor[] = [];

    Object.keys(resolvedColors).forEach(colorName => {
        customColorsList.push({
            value: argbFromHex(resolvedColors[colorName]),
            name: colorName,
            blend: true,
        });
    });

    const theme = themeFromSourceColor(sourceColor, customColorsList);
    const baseSchemes: ('light' | 'dark')[] = ['light', 'dark'];

    const themeKeys = Object.keys(theme.schemes.light.toJSON());
    // basic colors
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
    // custom colors
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
        regColor[colorMap.onColorContainer] = { type: 'theme', onColor: colorMap.colorContainer };
        baseSchemes.forEach(mdScheme => {
            Object.keys(colorMap).forEach(key => {
                schemes[mdScheme][colorMap[key]] = hexFromArgb(item[mdScheme][key as keyof ColorGroup]);
            });
        });
    });

    // derived colors
    ['primary', 'secondary', 'tertiary', 'error'].forEach(colorName => {
        const pascalColorName = colorName[0].toUpperCase() + colorName.slice(1);
        regColor[colorName] = { type: 'semantic', onColor: `on${pascalColorName}` };
        regColor[`on${pascalColorName}`] = { type: 'theme', onColor: colorName };
        regColor[`${colorName}Container`] = { type: 'extended', onColor: `on${pascalColorName}Container` };
        regColor[`on${pascalColorName}Container`] = { type: 'theme', onColor: `${colorName}Container` };
        baseSchemes.forEach(mdScheme => {
            schemes[mdScheme][`${colorName}Fixed`] = hexFromArgb(
                theme.palettes[colorName as keyof typeof theme.palettes].tone(90)
            );
            regColor[`${colorName}Fixed`] = { type: 'extended', onColor: `on${pascalColorName}Fixed` };

            schemes[mdScheme][`${colorName}FixedDim`] = hexFromArgb(
                theme.palettes[colorName as keyof typeof theme.palettes].tone(80)
            );
            regColor[`${colorName}FixedDim`] = { type: 'extended', onColor: `on${pascalColorName}FixedVariant` };

            schemes[mdScheme][`on${pascalColorName}Fixed`] = hexFromArgb(
                theme.palettes[colorName as keyof typeof theme.palettes].tone(10)
            );
            regColor[`on${pascalColorName}Fixed`] = { type: 'theme', onColor: `${colorName}Fixed` };

            schemes[mdScheme][`on${pascalColorName}FixedVariant`] = hexFromArgb(
                theme.palettes[colorName as keyof typeof theme.palettes].tone(30)
            );
            regColor[`on${pascalColorName}FixedVariant`] = { type: 'theme', onColor: `${colorName}FixedDim` };
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

    // Generate derived colors for custom colors
    const getTone = (color: number, toneValue: number) => {
        const p = TonalPalette.fromInt(color);
        return hexFromArgb(p.tone(toneValue));
    };

    theme.customColors.forEach((customColor: CustomColorGroup) => {
        const colorName = customColor.color.name;
        const pascalColorName = colorName[0].toUpperCase() + colorName.slice(1);
        regColor[`${colorName}Fixed`] = { type: 'extended', onColor: `on${pascalColorName}Fixed` };
        regColor[`${colorName}FixedDim`] = { type: 'extended', onColor: `on${pascalColorName}FixedVariant` };
        regColor[`on${pascalColorName}Fixed`] = { type: 'theme', onColor: `${colorName}Fixed` };
        regColor[`on${pascalColorName}FixedVariant`] = { type: 'theme', onColor: `${colorName}FixedDim` };

        baseSchemes.forEach(mdScheme => {
            const generatedColor = customColor[mdScheme].color;
            schemes[mdScheme][`${colorName}Fixed`] = getTone(generatedColor, 90);
            schemes[mdScheme][`${colorName}FixedDim`] = getTone(generatedColor, 80);
            schemes[mdScheme][`on${pascalColorName}Fixed`] = getTone(generatedColor, 10);
            schemes[mdScheme][`on${pascalColorName}FixedVariant`] = getTone(generatedColor, 30);
        });
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
    regColor.onSurface = { type: 'theme', onColor: 'surface' };
    regColor.onSurfaceVariant = { type: 'theme', onColor: 'surfaceVariant' };
    regColor.background = { type: 'surface', onColor: 'onBackground' };
    regColor.onBackground = { type: 'theme', onColor: 'background' };
    regColor.inverseSurface = { type: 'surface', onColor: 'inverseOnSurface' };
    regColor.inverseOnSurface = { type: 'theme', onColor: 'inverseSurface' };
    regColor.outline = { type: 'border', onColor: 'surface' };
    regColor.outlineVariant = { type: 'border', onColor: 'inverseSurface' };
    regColor.inversePrimary = { type: 'theme', onColor: 'onPrimaryContainer' };
    regColor.shadow = { type: 'theme' };
    setColorRegistry(regColor);

    return schemes;
}
