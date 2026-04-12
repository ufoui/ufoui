import { ColorType, getColorRegistry } from './colorRegistry';

/**
 * Built-in semantic color names available in every theme.
 *
 * @remarks
 * These roles define intent-focused colors such as brand, feedback, and status tones.
 *
 * @category Color
 */
export type CoreSemanticColor = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'info' | 'success' | 'error';

/**
 * Built-in surface color names intended for backgrounds, layers, and outlines.
 *
 * @category Color
 */
export type CoreSurfaceColor =
    | 'surface'
    | 'surfaceVariant'
    | 'background'
    | 'inverseSurface'
    | 'outline'
    | 'outlineVariant'
    | 'surfaceContainerLowest'
    | 'surfaceContainerLow'
    | 'surfaceContainer'
    | 'surfaceContainerHigh'
    | 'surfaceContainerHighest'
    | 'surfaceBright'
    | 'surfaceDim';

/**
 * Built-in technical color names that are not intended as direct semantic/surface choices.
 *
 * @remarks
 * Includes `on*` technical tokens and utility values like `scrim`, `shadow`, and `surfaceTint`.
 *
 * @category Color
 */
export type CoreThemeColor =
    | 'onSurface'
    | 'onSurfaceVariant'
    | 'onBackground'
    | 'inverseOnSurface'
    | 'inversePrimary'
    | 'surfaceTint'
    | 'scrim'
    | 'shadow'
    | 'black'
    | 'white';

/**
 * Empty custom-color map used as the default generic parameter.
 *
 * @category Color
 */
export type EmptyColors = Record<never, never>;

/**
 * Extracts custom semantic color names from the provided color map.
 *
 * @typeParam CustomColors - Custom color dictionary passed by the consumer.
 * @category Color
 */
export type UserSemanticColor<CustomColors extends Record<string, string>> = Extract<keyof CustomColors, string>;

/**
 * Union of built-in semantic names and custom semantic names.
 *
 * @typeParam CustomColors - Custom color dictionary passed by the consumer.
 * @category Color
 */
export type SemanticBaseColor<CustomColors extends Record<string, string>> =
    | CoreSemanticColor
    | UserSemanticColor<CustomColors>;

/**
 * Builds a matching `on*` color name for a given base color name.
 *
 * @typeParam T - Base token name.
 * @category Color
 */
export type OnColor<T extends string> = `on${Capitalize<T>}`;

/**
 * Color names intended for semantic usage in component props.
 *
 * @typeParam CustomColors - Optional custom semantic color map.
 * @category Color
 */
export type SemanticColor<CustomColors extends Record<string, string> = EmptyColors> = SemanticBaseColor<CustomColors>;

/**
 * Extended semantic color names (`*Container`, `*Fixed`, `*FixedDim`).
 *
 * @typeParam CustomColors - Optional custom semantic color map.
 * @category Color
 */
export type ExtendedColor<CustomColors extends Record<string, string> = EmptyColors> =
    | `${SemanticBaseColor<CustomColors>}Container`
    | `${SemanticBaseColor<CustomColors>}Fixed`
    | `${SemanticBaseColor<CustomColors>}FixedDim`;

/**
 * `on*` counterparts for extended semantic color names.
 *
 * @typeParam CustomColors - Optional custom semantic color map.
 * @category Color
 */
export type OnExtendedColor<CustomColors extends Record<string, string> = EmptyColors> =
    | OnColor<`${SemanticBaseColor<CustomColors>}Container`>
    | OnColor<`${SemanticBaseColor<CustomColors>}Fixed`>
    | OnColor<`${SemanticBaseColor<CustomColors>}FixedVariant`>;

/**
 * Color names intended for surfaces and layered containers.
 *
 * @remarks
 * Does not include plain semantic roles like `primary` or `error`.
 *
 * @typeParam CustomColors - Optional custom semantic color map.
 * @category Color
 */
export type SurfaceColor<CustomColors extends Record<string, string> = EmptyColors> =
    | CoreSurfaceColor
    | ExtendedColor<CustomColors>;

/**
 * Color names used directly in visual component APIs.
 *
 * @remarks
 * Combines semantic and surface-capable roles while excluding technical-only `on*` and utility tokens.
 *
 * @typeParam CustomColors - Optional custom semantic color map.
 * @category Color
 */
export type BaseColor<CustomColors extends Record<string, string> = EmptyColors> =
    | SemanticColor<CustomColors>
    | SurfaceColor<CustomColors>;

/**
 * Any valid color name in the theme system (semantic, surface, extended, `on*`, technical).
 *
 * @typeParam CustomColors - Optional custom semantic color map.
 * @category Color
 */
export type ThemeColor<CustomColors extends Record<string, string> = EmptyColors> =
    | SemanticColor<CustomColors>
    | SurfaceColor<CustomColors>
    | OnColor<SemanticBaseColor<CustomColors>>
    | OnExtendedColor<CustomColors>
    | CoreThemeColor;

/**
 * Color names allowed for border-related props.
 *
 * @remarks
 * Borders can use both semantic and surface-oriented color names.
 *
 * @typeParam CustomColors - Optional custom semantic color map.
 * @category Color
 */
export type BorderColor<CustomColors extends Record<string, string> = EmptyColors> = BaseColor<CustomColors>;

type ColorByType<
    Type extends ColorType,
    CustomColors extends Record<string, string> = EmptyColors,
> = Type extends 'semantic'
    ? SemanticColor<CustomColors>
    : Type extends 'extended'
      ? ExtendedColor<CustomColors>
      : Type extends 'surface'
        ? SurfaceColor<CustomColors>
        : ThemeColor<CustomColors>;

type ColorNameType = ColorType | 'base' | 'border';

type ColorByNameType<
    Type extends ColorNameType,
    CustomColors extends Record<string, string> = EmptyColors,
> = Type extends 'base' | 'border' ? BaseColor<CustomColors> : ColorByType<Extract<Type, ColorType>, CustomColors>;

// /**
//  * Represents a high-level semantic color token (e.g. `primary`, `error`, `success`).
//  * Based on core semantic keys and optionally extended by custom color names.
//  * @category Color
//  */
// type CoreSemanticColor = (typeof ThemeSemanticColorKeys)[number];
// export type SemanticColor<TColors extends Record<string, string> = {}> = CoreSemanticColor | Extract<keyof TColors, string>;
//
// /**
//  * Represents tokens extending the {@link SemanticColor} set
//  * with additional container and fixed variants.
//  * Derived from {@link ThemeExtendedColorKeys}.
//  * @category Color
//  */
// export type ExtendedColor = (typeof ThemeExtendedColorKeys)[number];
//
// /**
//  * Represents surface-related color tokens extending {@link ExtendedColor},
//  * including background, outline, and container surface roles.
//  * Derived from {@link ThemeSurfaceColorKeys}.
//  * @category Color
//  */
// export type SurfaceColor = (typeof ThemeSurfaceColorKeys)[number];
//
// /**
//  * Represents any valid color token defined in the theme,
//  * including semantic, extended, and surface roles.
//  * Derived from {@link ThemeSchemeKeys}.
//  * @category Color
//  */
// export type ThemeColor = (typeof ThemeSchemeKeys)[number];
//
// /**
//  * Represents the available border color options.
//  *
//  * @category Color
//  */
// export type BorderColor = SurfaceColor;

export function getOnColorName<CustomColors extends Record<string, string> = EmptyColors>(
    colorName: ThemeColor<CustomColors>
): ThemeColor<CustomColors> | undefined {
    return getColorRegistry()[colorName]?.onColor as ThemeColor<CustomColors> | undefined;
}

/**
 * Returns all color names from the global registry for the selected type.
 *
 * @param type - Color type to filter by.
 * @returns List of color names matching the requested type.
 * @category Theme
 */
export function getColorNames<Type extends ColorNameType, CustomColors extends Record<string, string> = EmptyColors>(
    type: Type
): ColorByNameType<Type, CustomColors>[] {
    const allowedTypes: ColorType[] =
        type === 'base' || type === 'border' ? ['semantic', 'surface', 'extended'] : [type];
    return Object.entries(getColorRegistry())
        .filter(([_, entry]) => (entry?.type ? allowedTypes.includes(entry.type) : false))
        .map(([name]) => name as ColorByNameType<Type, CustomColors>);
}

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
export const getSurfaceColorVar = (color: BaseColor) => {
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
    return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
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
export function getTintOverlayColor(elevation: number, tintColor: string): string {
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

export function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getBorderColor(borderColor?: BorderColor): BorderColor {
    return borderColor ?? 'outlineVariant';
}
