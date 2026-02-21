import { toKebabCase } from './utils';
import {
  ThemeExtendedColorKeys,
  ThemeSchemeKeys,
  ThemeSemanticColorKeys,
  ThemeSurfaceColorKeys,
} from '../types';

/**
 * Represents a high-level semantic color token (e.g. `primary`, `error`, `success`).
 * Derived from {@link ThemeSemanticColorKeys}.
 * @category Color
 */
export type SemanticColor = (typeof ThemeSemanticColorKeys)[number];

/**
 * Represents tokens extending the {@link SemanticColor} set
 * with additional container and fixed variants.
 * Derived from {@link ThemeExtendedColorKeys}.
 * @category Color
 */
export type ExtendedColor = (typeof ThemeExtendedColorKeys)[number];

/**
 * Represents surface-related color tokens extending {@link ExtendedColor},
 * including background, outline, and container surface roles.
 * Derived from {@link ThemeSurfaceColorKeys}.
 * @category Color
 */
export type SurfaceColor = (typeof ThemeSurfaceColorKeys)[number];

/**
 * Represents any valid color token defined in the theme,
 * including semantic, extended, and surface roles.
 * Derived from {@link ThemeSchemeKeys}.
 * @category Color
 */
export type ThemeColor = (typeof ThemeSchemeKeys)[number];

/**
 * Generates utility class names (`uui-*`) for a given **semantic color** and its variants.
 *
 * @remarks
 * Produces `text`, `border`, and `background` class names for a semantic color and its
 * derived tokens (`on`, `container`, `fixed`, `fixedDim`, etc.).
 * If the provided key is invalid, `'primary'` is used as fallback.
 *
 * All class names follow the pattern `uui-{type}-{kebab-case-color}`.
 *
 * @param color - Semantic color name (e.g. `'primary'`, `'error'`, `'success'`).
 * @returns Object with `uui-text-*`, `uui-border-*`, and `uui-bg-*` class names for all variants.
 *
 * @example
 * ```ts
 * getSemanticColorClasses('primary');
 * // → { textColor: 'uui-text-primary', bgOnColor: 'uui-bg-on-primary', ... }
 * ```
 * @category Color
 */
export const getSemanticColorClasses = (color: SemanticColor) => {
  const elementColor = ThemeSemanticColorKeys.includes(color)
    ? color
    : 'primary';

  return {
    textColor: `uui-text-${elementColor}`,
    borderColor: `uui-border-${elementColor}`,
    bgColor: `uui-bg-${elementColor}`,

    textOnColor: `uui-text-on-${elementColor}`,
    borderOnColor: `uui-border-on-${elementColor}`,
    bgOnColor: `uui-bg-on-${elementColor}`,

    textContainer: `uui-text-${elementColor}-container`,
    borderContainer: `uui-border-${elementColor}-container`,
    bgContainer: `uui-bg-${elementColor}-container`,

    textOnContainer: `uui-text-on-${elementColor}-container`,
    borderOnContainer: `uui-border-on-${elementColor}-container`,
    bgOnContainer: `uui-bg-on-${elementColor}-container`,

    textFixed: `uui-text-${elementColor}-fixed`,
    borderFixed: `uui-border-${elementColor}-fixed`,
    bgFixed: `uui-bg-${elementColor}-fixed`,

    textOnFixed: `uui-text-on-${elementColor}-fixed`,
    borderOnFixed: `uui-border-on-${elementColor}-fixed`,
    bgOnFixed: `uui-bg-on-${elementColor}-fixed`,

    textFixedDim: `uui-text-${elementColor}-fixed-dim`,
    borderFixedDim: `uui-border-${elementColor}-fixed-dim`,
    bgFixedDim: `uui-bg-${elementColor}-fixed-dim`,

    textOnFixedVariant: `uui-text-on-${elementColor}-fixed-variant`,
    borderOnFixedVariant: `uui-border-on-${elementColor}-fixed-variant`,
    bgOnFixedVariant: `uui-bg-on-${elementColor}-fixed-variant`,
  };
};

/**
 * Bidirectional mapping between theme colors and their “on” counterparts.
 *
 * @remarks
 * Provides both directions — e.g. `'surface' → 'onSurface'` and `'onSurface' → 'surface'` —
 * for all semantic, extended, and surface tokens defined in {@link ThemeColor}.
 * Enables consistent inverse lookups for text/background pairings.
 *
 * Commonly used by {@link getSurfaceColorClasses}.
 *
 * @category Color
 */
export const inverseColorMap = {
  // SURFACE
  surface: 'onSurface',
  surfaceVariant: 'onSurfaceVariant',
  surfaceContainerLowest: 'onSurface',
  surfaceContainerLow: 'onSurface',
  surfaceContainer: 'onSurface',
  surfaceContainerHigh: 'onSurface',
  surfaceContainerHighest: 'onSurface',
  surfaceDim: 'onSurface',
  surfaceBright: 'onSurface',
  background: 'onBackground',
  inverseSurface: 'inverseOnSurface',

  // SEMANTIC
  primary: 'onPrimary',
  secondary: 'onSecondary',
  tertiary: 'onTertiary',
  warning: 'onWarning',
  info: 'onInfo',
  success: 'onSuccess',
  error: 'onError',

  // EXTENDED
  primaryContainer: 'onPrimaryContainer',
  primaryFixed: 'onPrimaryFixed',
  primaryFixedDim: 'onPrimaryFixedVariant',
  secondaryContainer: 'onSecondaryContainer',
  secondaryFixed: 'onSecondaryFixed',
  secondaryFixedDim: 'onSecondaryFixedVariant',
  tertiaryContainer: 'onTertiaryContainer',
  tertiaryFixed: 'onTertiaryFixed',
  tertiaryFixedDim: 'onTertiaryFixedVariant',
  warningContainer: 'onWarningContainer',
  warningFixed: 'onWarningFixed',
  warningFixedDim: 'onWarningFixedVariant',
  infoContainer: 'onInfoContainer',
  infoFixed: 'onInfoFixed',
  infoFixedDim: 'onInfoFixedVariant',
  successContainer: 'onSuccessContainer',
  successFixed: 'onSuccessFixed',
  successFixedDim: 'onSuccessFixedVariant',
  errorContainer: 'onErrorContainer',
  errorFixed: 'onErrorFixed',
  errorFixedDim: 'onErrorFixedVariant',

  // NEUTRAL / TECHNICAL (for TS completeness)
  outline: 'surface',
  outlineVariant: 'inverseSurface',
  inversePrimary: 'onPrimaryContainer',
  black: 'white',
  white: 'black',

  onSurface: 'surface',
  onSurfaceVariant: 'surfaceVariant',
  onBackground: 'background',
  inverseOnSurface: 'inverseSurface',

  onPrimary: 'primary',
  onSecondary: 'secondary',
  onTertiary: 'tertiary',
  onWarning: 'warning',
  onInfo: 'info',
  onSuccess: 'success',
  onError: 'error',

  onPrimaryContainer: 'primaryContainer',
  onSecondaryContainer: 'secondaryContainer',
  onTertiaryContainer: 'tertiaryContainer',
  onWarningContainer: 'warningContainer',
  onInfoContainer: 'infoContainer',
  onSuccessContainer: 'successContainer',
  onErrorContainer: 'errorContainer',
} as const satisfies Partial<Record<ThemeColor, ThemeColor>>;

/**
 * Returns utility class names (`uui-*`) for a given surface color and its mapped “on” color.
 *
 * @remarks
 * Uses the {@link inverseColorMap} to find the related “on” color
 * (e.g. `'surfaceContainer'` → `'onSurface'`).
 * Produces `text`, `border`, and `background` variants for both.
 * All names are kebab-cased (e.g. `'surfaceContainerHigh'` → `'surface-container-high'`).
 *
 * @param color - Surface color key (e.g. `'surfaceContainerHigh'`).
 * @returns Object with `uui-text-*`, `uui-border-*`, and `uui-bg-*` class names for base and on-color.
 *
 * @example
 * ```ts
 * getSurfaceColorClasses('surfaceContainer');
 * // → { textColor: 'uui-text-surface-container', textOnColor: 'uui-text-on-surface', ... }
 * ```
 * @category Color
 */
export const getSurfaceColorClasses = (color: SurfaceColor) => {
  const surfaceColor = ThemeSurfaceColorKeys.includes(color)
    ? color
    : 'primary';
  const baseColor = toKebabCase(surfaceColor as string);
  const onColor = toKebabCase(inverseColorMap[surfaceColor]);
  return {
    textColor: `uui-text-${baseColor}`,
    textOnColor: `uui-text-${onColor}`,
    borderColor: `uui-border-${baseColor}`,
    borderOnColor: `uui-border-${onColor}`,
    bgColor: `uui-bg-${baseColor}`,
    bgOnColor: `uui-bg-${onColor}`,
  } as const;
};

/**
 * Returns utility class names (`uui-*`) for any theme color token.
 *
 * @remarks
 * Generates `text`, `border`, and `background` class names based on the provided
 * {@link ThemeColor}. If the color key is invalid, `'primary'` is used as fallback.
 *
 * @param color - Theme color token (e.g. `'primary'`, `'surfaceContainerHigh'`, `'error'`).
 * @returns An object with `uui-text-*`, `uui-border-*`, and `uui-bg-*` class names.
 *
 * @example
 * ```ts
 * getColorClasses('error');
 * // → { textColor: 'uui-text-error', borderColor: 'uui-border-error', bgColor: 'uui-bg-error' }
 * ```
 * @category Color
 */
export const getColorClasses = (color: ThemeColor) => {
  const baseColor = ThemeSchemeKeys.includes(color) ? color : 'primary';
  const colorClass = toKebabCase(baseColor);
  return {
    textColor: `uui-text-${colorClass}`,
    borderColor: `uui-border-${colorClass}`,
    bgColor: `uui-bg-${colorClass}`,
  } as const;
};

/**
 * Represents the available border color options.
 *
 * @category Color
 */
export type BorderColor = SurfaceColor;

/**
 * Returns the appropriate border color class for a given configuration.
 *
 * @remarks
 * Typical border colors are `'outline'` and `'outlineVariant'`, matching MD3 tokens.
 * @param borderColor - Border color keyword or surface color token.
 * @returns The resolved border color class (e.g. `'uui-border-surface-container-high'`).
 *
 * @example
 * ```ts
 * getBorderColorClass('surfaceContainer'); // → 'uui-border-surface-container'
 * ```
 * @category Color
 */
export function getBorderColorClass(borderColor: BorderColor) {
  return getSurfaceColorClasses(borderColor).borderColor;
}

/**
 * Returns all CSS variable references for a **semantic color**.
 *
 * @remarks
 * Generates `var(--uui-color-*)` tokens only for semantic colors
 * defined in {@link SemanticColor} (e.g. `primary`, `error`, `success`).
 * Useful for dynamic component theming and inline styles.
 *
 * @param color - Semantic color key (e.g. `'primary'`, `'error'`, `'info'`).
 * @returns Object containing `var(--uui-color-...)` references for all variants.
 *
 * @example
 * ```ts
 * const vars = getSemanticColorVar('primary');
 * // → "var(--uui-color-primary)", "var(--uui-color-on-primary)"
 * ```
 * @category Color
 */
export const getSemanticColorVar = (color: SemanticColor) => {
  const kebab = color.toLowerCase();
  const p = `--uui-color-${kebab}`;
  const on = `--uui-color-on-${kebab}`;
  return {
    color: `var(${p})`,
    onColor: `var(${on})`,
    container: `var(${p}-container)`,
    onContainer: `var(${on}-container)`,
    fixed: `var(${p}-fixed)`,
    fixedDim: `var(${p}-fixed-dim)`,
    onFixed: `var(${on}-fixed)`,
    onFixedVariant: `var(${on}-fixed-variant)`,
  };
};

/**
 * Returns basic CSS variable references for a **surface color**.
 *
 * @remarks
 * Generates `var(--uui-color-*)` tokens for surface-related colors
 * defined in {@link SurfaceColor} (e.g. `surface`, `surfaceContainer`, `background`).
 * Intended for quick surface/background styling.
 *
 * @param color - Surface color key (e.g. `'surface'`, `'background'`, `'surfaceContainerHigh'`).
 * @returns Object containing `{ color, onColor }` variable references.
 *
 * @example
 * ```ts
 * const vars = getSurfaceColorVar('surfaceContainer');
 * // → { color: "var(--uui-color-surface-container)", onColor: "var(--uui-color-on-surface)" }
 * ```
 * @category Color
 */
export const getSurfaceColorVar = (color: SurfaceColor) => {
  const kebab = color.toLowerCase();
  const p = `--uui-color-${kebab}`;
  const on = `--uui-color-on-${kebab}`;
  return {
    color: `var(${p})`,
    onColor: `var(${on})`,
  };
};

/**
 * Converts a HEX color string into an RGB tuple.
 *
 * @param hex - HEX color string (e.g. `#ff8800`).
 * @returns RGB tuple as `[r, g, b]` numeric values.
 *
 * @example
 * ```ts
 * hexToRgbValues('#ff8800');
 * // → [255, 136, 0]
 * ```
 * @category Color
 */
export const hexToRgbValues = (hex: string): [number, number, number] => {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
};

/**
 * Converts a HEX color string to an RGB string format.
 *
 * @param colorValue - HEX color string (e.g. `#ff8800`).
 * @returns Comma-separated RGB string (e.g. `"255,136,0"`).
 *
 * @example
 * ```ts
 * hexToRgb('#ff8800');
 * // → "255,136,0"
 * ```
 * @category Color
 */
export const hexToRgb = (colorValue: string): string => {
  return [
    parseInt(colorValue.slice(1, 3), 16),
    parseInt(colorValue.slice(3, 5), 16),
    parseInt(colorValue.slice(5, 7), 16),
  ].join(',');
};

/**
 * Calculates the Material Design 3 surface tint overlay color
 * for a given elevation level and base tint color.
 *
 * @param elevation - Elevation level between 0–5.
 * @param tintColor - Base tint color in HEX format (e.g. `#ffcc00`).
 * @returns CSS color string in `rgba(r, g, b, a)` format with correct alpha applied.
 *
 * @example
 * ```ts
 * getTintOverlayColor(3, '#ffcc00');
 * // → "rgba(255, 204, 0, 0.11)"
 * ```
 * @category Color
 */
export function getTintOverlayColor(
  elevation: number,
  tintColor: string,
): string {
  const alphaMap: Record<number, string> = {
    0: '0',
    1: '0.05',
    2: '0.08',
    3: '0.11',
    4: '0.12',
    5: '0.14',
  };

  const alpha = alphaMap[elevation] ?? 0;
  const [r, g, b] = hexToRgbValues(tintColor);

  return `rgba(${String(r)}, ${String(g)}, ${String(b)}, ${alpha})`;
}

// todo to remove

/**
 * Returns a set of predefined utility class names for fixed theme colors.
 *
 * Each entry maps text, border, outline, and background variants like:
 * `textSurface`, `bgOnSurface`, `borderOutlineVariant`, etc.
 *
 * @returns Object with fixed color class mappings.
 */
export const getFixedColorClasses = () => {
  const keys = [
    'surface',
    'onSurface',
    'surfaceDim',
    'surfaceBright',
    'surfaceContainerLowest',
    'surfaceContainerLow',
    'surfaceContainer',
    'surfaceContainerHigh',
    'surfaceContainerHighest',
    'onSurfaceVariant',
    'inverseSurface',
    'inverseOnSurface',
    'outline',
    'outlineVariant',
    'inversePrimary',
    'scrim',
    'shadow',
    'white',
    'black',
    'background',
    'onBackground',
    'surfaceTint',
  ];

  const classes: Record<string, string> = {};

  for (const key of keys) {
    const cap = key.charAt(0).toUpperCase() + key.slice(1);
    classes[`text${cap}`] = `uui-text-${key}`;
    classes[`border${cap}`] = `uui-border-${key}`;
    classes[`outline${cap}`] = `uui-outline-${key}`;
    classes[`bg${cap}`] = `uui-bg-${key}`;
  }

  return classes;
};

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getBorderColor(borderColor?: BorderColor): BorderColor {
  return borderColor ?? 'outlineVariant';
}
