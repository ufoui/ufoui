import {
  argbFromHex,
  ColorGroup,
  CustomColor,
  CustomColorGroup,
  hexFromArgb,
  themeFromSourceColor,
  TonalPalette,
} from '@material/material-color-utilities';

import {
  PartialThemeSchemes,
  ThemeSchemeKeys,
  ThemeSchemes,
} from '@ufoui/types';

export type ExtraColorOverrides = Partial<
  Record<'info' | 'warning' | 'success', string>
>;
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
 * @param customSchemes - Optional overrides for light and dark color values.
 *                        Partial values will be merged with generated ones.
 * @param extraColors - Optional custom base colors for `info`, `warning`, and `success`.
 *                      These will override the default values (`#03a9f4`, `#ffd600`, `#689f38`).
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
  extraColors?: ExtraColorOverrides,
  customSchemes: PartialThemeSchemes = {},
): ThemeSchemes {
  const schemes: ThemeSchemes = { light: {}, dark: {} };
  const sourceColor = customSchemes.light?.primary
    ? argbFromHex(customSchemes.light.primary)
    : argbFromHex(seedColor);

  const extraSemanticColors = {
    ...{
      info: '#03a9f4',
      warning: '#ffd600',
      success: '#689f38',
    },
    ...extraColors,
  };

  const customColorsList: CustomColor[] = [];

  Object.keys(extraSemanticColors).forEach((colorName) => {
    const lightColor =
      customSchemes.light?.[colorName as keyof typeof extraSemanticColors];
    if (lightColor) {
      customColorsList.push({
        value: argbFromHex(lightColor),
        name: colorName,
        blend: true,
      });
    } else {
      customColorsList.push({
        value: argbFromHex(
          extraSemanticColors[colorName as keyof typeof extraSemanticColors],
        ),
        name: colorName,
        blend: true,
      });
    }
  });

  // check overridden colors
  ['secondary', 'tertiary', 'error'].forEach((colorName) => {
    const lightColor = customSchemes.light?.[colorName];
    if (lightColor) {
      customColorsList.push({
        value: argbFromHex(lightColor),
        name: colorName,
        blend: true,
      });
    }
  });

  const theme = themeFromSourceColor(sourceColor, customColorsList);
  // basic colors
  ['light', 'dark'].forEach((scheme) => {
    const mdScheme = scheme as 'light' | 'dark';
    ThemeSchemeKeys.forEach((key) => {
      if (customSchemes[mdScheme]?.[key]) {
        schemes[mdScheme][key] = customSchemes[mdScheme][key];
      } else if (
        typeof theme.schemes[mdScheme][
          key as keyof typeof theme.schemes.light
        ] === 'number'
      ) {
        schemes[mdScheme][key] = hexFromArgb(
          theme.schemes[mdScheme][
            key as keyof typeof theme.schemes.light
          ] as number,
        );
      }
    });
  });

  schemes.light.scrim = '#00000052';
  schemes.dark.scrim = '#00000052';

  // custom colors
  theme.customColors.forEach((item) => {
    const pascalColorName =
      item.color.name[0].toUpperCase() + item.color.name.slice(1);
    const colorMap: Record<string, string> = {
      color: item.color.name,
      onColor: `on${pascalColorName}`,
      colorContainer: `${item.color.name}Container`,
      onColorContainer: `on${pascalColorName}Container`,
    };
    ['light', 'dark'].forEach((scheme) => {
      const mdScheme = scheme as 'light' | 'dark';
      Object.keys(colorMap).forEach((key) => {
        schemes[scheme][colorMap[key]] =
          customSchemes[scheme]?.[colorMap[key]] ??
          hexFromArgb(item[mdScheme][key as keyof ColorGroup]);
      });
    });
  });

  // derived colors
  ['primary', 'secondary', 'tertiary', 'error'].forEach((colorName) => {
    const pascalColorName = colorName[0].toUpperCase() + colorName.slice(1);
    ['light', 'dark'].forEach((scheme) => {
      schemes[scheme][`${colorName}Fixed`] = customSchemes[scheme]?.[
        `${colorName}Fixed`
      ]
        ? customSchemes[scheme][`${colorName}Fixed`]
        : hexFromArgb(
            theme.palettes[colorName as keyof typeof theme.palettes].tone(90),
          );
      schemes[scheme][`${colorName}FixedDim`] = customSchemes[scheme]?.[
        `${colorName}FixedDim`
      ]
        ? customSchemes[scheme][`${colorName}FixedDim`]
        : hexFromArgb(
            theme.palettes[colorName as keyof typeof theme.palettes].tone(80),
          );
      schemes[scheme][`on${pascalColorName}Fixed`] = customSchemes[scheme]?.[
        `on${pascalColorName}Fixed`
      ]
        ? customSchemes[scheme][`on${pascalColorName}Fixed`]
        : hexFromArgb(
            theme.palettes[colorName as keyof typeof theme.palettes].tone(10),
          );
      schemes[scheme][`on${pascalColorName}FixedVariant`] = customSchemes[
        scheme
      ]?.[`on${pascalColorName}FixedVariant`]
        ? customSchemes[scheme][`on${pascalColorName}FixedVariant`]
        : hexFromArgb(
            theme.palettes[colorName as keyof typeof theme.palettes].tone(30),
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

    ['light', 'dark'].forEach((scheme) => {
      const generatedColor = customColor[scheme as 'dark' | 'light'].color;
      schemes[scheme][`${colorName}Fixed`] = customSchemes[scheme]?.[
        `${colorName}Fixed`
      ]
        ? customSchemes[scheme][`${colorName}Fixed`]
        : getTone(generatedColor, 90);

      schemes[scheme][`${colorName}FixedDim`] = customSchemes[scheme]?.[
        `${colorName}FixedDim`
      ]
        ? customSchemes[scheme][`${colorName}FixedDim`]
        : getTone(generatedColor, 80);

      schemes[scheme][`on${pascalColorName}Fixed`] = customSchemes[scheme]?.[
        `on${pascalColorName}Fixed`
      ]
        ? customSchemes[scheme][`on${pascalColorName}Fixed`]
        : getTone(generatedColor, 10);

      schemes[scheme][`on${pascalColorName}FixedVariant`] = customSchemes[
        scheme
      ]?.[`on${pascalColorName}FixedVariant`]
        ? customSchemes[scheme][`on${pascalColorName}FixedVariant`]
        : getTone(generatedColor, 30);
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

  schemes.light.surface =
    customSchemes.light?.surface ??
    hexFromArgb(theme.palettes.neutral.tone(99));
  schemes.light.surfaceDim =
    customSchemes.light?.surfaceDim ??
    hexFromArgb(theme.palettes.neutral.tone(87));
  schemes.light.surfaceBright =
    customSchemes.light?.surfaceBright ??
    hexFromArgb(theme.palettes.neutral.tone(99));
  schemes.light.surfaceContainerLowest =
    customSchemes.light?.surfaceContainerLowest ??
    hexFromArgb(theme.palettes.neutral.tone(100));
  schemes.light.surfaceContainerLow =
    customSchemes.light?.surfaceContainerLow ??
    hexFromArgb(theme.palettes.neutral.tone(96));
  schemes.light.surfaceContainer =
    customSchemes.light?.surfaceContainer ??
    hexFromArgb(theme.palettes.neutral.tone(94));
  schemes.light.surfaceContainerHigh =
    customSchemes.light?.surfaceContainerHigh ??
    hexFromArgb(theme.palettes.neutral.tone(92));
  schemes.light.surfaceContainerHighest =
    customSchemes.light?.surfaceContainerHighest ??
    hexFromArgb(theme.palettes.neutral.tone(90));

  schemes.dark.surface =
    customSchemes.dark?.surface ?? hexFromArgb(theme.palettes.neutral.tone(6));
  schemes.dark.surfaceDim =
    customSchemes.dark?.surfaceDim ??
    hexFromArgb(theme.palettes.neutral.tone(6));
  schemes.dark.surfaceBright =
    customSchemes.dark?.surfaceBright ??
    hexFromArgb(theme.palettes.neutral.tone(24));

  schemes.dark.surfaceContainerLowest =
    customSchemes.dark?.surfaceContainerLowest ??
    hexFromArgb(theme.palettes.neutral.tone(4));
  schemes.dark.surfaceContainerLow =
    customSchemes.dark?.surfaceContainerLow ??
    hexFromArgb(theme.palettes.neutral.tone(10));
  schemes.dark.surfaceContainer =
    customSchemes.dark?.surfaceContainer ??
    hexFromArgb(theme.palettes.neutral.tone(12));
  schemes.dark.surfaceContainerHigh =
    customSchemes.dark?.surfaceContainerHigh ??
    hexFromArgb(theme.palettes.neutral.tone(17));
  schemes.dark.surfaceContainerHighest =
    customSchemes.dark?.surfaceContainerHighest ??
    hexFromArgb(theme.palettes.neutral.tone(22));

  schemes.light.surfaceTint = hexFromArgb(theme.palettes.primary.tone(40));
  schemes.dark.surfaceTint = hexFromArgb(theme.palettes.primary.tone(80));

  return schemes;
}
