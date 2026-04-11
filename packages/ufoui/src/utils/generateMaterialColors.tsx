import {
    argbFromHex,
    ColorGroup,
    CustomColor,
    CustomColorGroup,
    hexFromArgb,
    themeFromSourceColor,
    TonalPalette,
} from '@material/material-color-utilities';

import { PartialThemeSchemes, ThemeSchemeKeys, ThemeSchemes } from '../types';

export type UserColors = Record<string, string>;
/**
 * Generates a full ThemeSchemes object (light and dark modes) based on a seed color,
 * optional token overrides, and custom semantic colors (info, warning, success).
 *
 * Internally uses the Material Design 3 `themeFromSourceColor()` generator and applies
 * full resolution of all MD3 roles as defined in ThemeSchemeKeys.
 *
 * Custom semantic colors (e.g. `info`, `warning`, `success`) are blended into the palette
 * and expanded to support `Container`, `Fixed`, `Dim`, and `on*` roles.
 *
 * @param seedColor - Optional seed color in hex (e.g. "#6200ee"). Used as the base for the primary palette.
 *                    Defaults to `#6750A4` if not provided.
 * @param colors - Optional map of custom base colors. Defaults include `info`, `warning`, and `success`.
 *                 Any key can be provided (e.g. `brand`, `neutralStrong`, `secondary`).
 * @param customSchemes - Optional skin overrides for schemes (e.g. light/dark/high-contrast).
 *                        Applied as the final merge step.
 *
 * @returns A fully resolved ThemeSchemes object with all required color roles populated for light and dark modes.
 *
 * @example
 * ```ts
 * const schemes = generateMaterialColors('#6200ee', { info: '#2196f3' }, {});
 * const primary = schemes.light.primary;
 * const infoContainer = schemes.dark.infoContainer;
 * ```
 *
 * @category Theme
 */

export function generateMaterialColors(
    seedColor = '#6750A4',
    colors: UserColors = {},
    customSchemes: PartialThemeSchemes = {}
): ThemeSchemes {
    const schemes: ThemeSchemes = { light: {}, dark: {} };
    const sourceColor = colors.primary ? argbFromHex(colors.primary) : argbFromHex(seedColor);

    const resolvedColors: UserColors = {
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

    // basic colors
    baseSchemes.forEach(mdScheme => {
        ThemeSchemeKeys.forEach(key => {
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
        baseSchemes.forEach(mdScheme => {
            Object.keys(colorMap).forEach(key => {
                schemes[mdScheme][colorMap[key]] = hexFromArgb(item[mdScheme][key as keyof ColorGroup]);
            });
        });
    });

    // derived colors
    ['primary', 'secondary', 'tertiary', 'error'].forEach(colorName => {
        const pascalColorName = colorName[0].toUpperCase() + colorName.slice(1);
        baseSchemes.forEach(mdScheme => {
            schemes[mdScheme][`${colorName}Fixed`] = hexFromArgb(
                theme.palettes[colorName as keyof typeof theme.palettes].tone(90)
            );
            schemes[mdScheme][`${colorName}FixedDim`] = hexFromArgb(
                theme.palettes[colorName as keyof typeof theme.palettes].tone(80)
            );
            schemes[mdScheme][`on${pascalColorName}Fixed`] = hexFromArgb(
                theme.palettes[colorName as keyof typeof theme.palettes].tone(10)
            );
            schemes[mdScheme][`on${pascalColorName}FixedVariant`] = hexFromArgb(
                theme.palettes[colorName as keyof typeof theme.palettes].tone(30)
            );
        });
    });

    // Generate derived colors for custom colors
    const getTone = (color: number, toneValue: number) => {
        const p = TonalPalette.fromInt(color);
        return hexFromArgb(p.tone(toneValue));
    };

    theme.customColors.forEach((customColor: CustomColorGroup) => {
        const colorName = customColor.color.name;
        const pascalColorName = colorName[0].toUpperCase() + colorName.slice(1);

        baseSchemes.forEach(mdScheme => {
            const generatedColor = customColor[mdScheme].color;
            schemes[mdScheme][`${colorName}Fixed`] = getTone(generatedColor, 90);
            schemes[mdScheme][`${colorName}FixedDim`] = getTone(generatedColor, 80);
            schemes[mdScheme][`on${pascalColorName}Fixed`] = getTone(generatedColor, 10);
            schemes[mdScheme][`on${pascalColorName}FixedVariant`] = getTone(generatedColor, 30);
        });
    });

    // basic colors
    const bw = {
        black: '#000000',
        onBlack: '#ffffff',
        white: '#ffffff',
        onWhite: '#000000',
    };
    Object.assign(schemes.light, bw);
    Object.assign(schemes.dark, bw);

    schemes.light.surface = hexFromArgb(theme.palettes.neutral.tone(99));
    schemes.light.surfaceDim = hexFromArgb(theme.palettes.neutral.tone(87));
    schemes.light.surfaceBright = hexFromArgb(theme.palettes.neutral.tone(99));
    schemes.light.surfaceContainerLowest = hexFromArgb(theme.palettes.neutral.tone(100));
    schemes.light.surfaceContainerLow = hexFromArgb(theme.palettes.neutral.tone(96));
    schemes.light.surfaceContainer = hexFromArgb(theme.palettes.neutral.tone(94));
    schemes.light.surfaceContainerHigh = hexFromArgb(theme.palettes.neutral.tone(92));
    schemes.light.surfaceContainerHighest = hexFromArgb(theme.palettes.neutral.tone(90));

    schemes.dark.surface = hexFromArgb(theme.palettes.neutral.tone(6));
    schemes.dark.surfaceDim = hexFromArgb(theme.palettes.neutral.tone(6));
    schemes.dark.surfaceBright = hexFromArgb(theme.palettes.neutral.tone(24));

    schemes.dark.surfaceContainerLowest = hexFromArgb(theme.palettes.neutral.tone(4));
    schemes.dark.surfaceContainerLow = hexFromArgb(theme.palettes.neutral.tone(10));
    schemes.dark.surfaceContainer = hexFromArgb(theme.palettes.neutral.tone(12));
    schemes.dark.surfaceContainerHigh = hexFromArgb(theme.palettes.neutral.tone(17));
    schemes.dark.surfaceContainerHighest = hexFromArgb(theme.palettes.neutral.tone(22));

    schemes.light.surfaceTint = hexFromArgb(theme.palettes.primary.tone(40));
    schemes.dark.surfaceTint = hexFromArgb(theme.palettes.primary.tone(80));

    // Apply skin overrides as the final step.
    Object.entries(customSchemes).forEach(([schemeName, schemeOverrides]) => {
        if (!schemeOverrides) {
            return;
        }
        schemes[schemeName] = { ...(schemes[schemeName] ?? {}), ...schemeOverrides };
    });

    return schemes;
}
