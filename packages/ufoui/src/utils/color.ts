import type { ColorType } from './colorRegistry';
import { getColorRegistry } from './colorRegistry';
import type { BaseColor, BorderColor, ExtendedColor, SemanticColor, SurfaceColor, ThemeColor } from '../types';

export type {
    CoreSemanticColor,
    CoreSurfaceColor,
    CoreThemeColor,
    CustomColors,
    SemanticBaseColor,
    OnColor,
    SemanticColor,
    ExtendedColor,
    OnExtendedColor,
    SurfaceColor,
    BaseColor,
    ThemeColor,
    BorderColor,
} from '../types';

export function getOnColorName(colorName: ThemeColor): ThemeColor | undefined {
    return getColorRegistry()[colorName]?.onColor as ThemeColor | undefined;
}

/**
 * Returns all color names from the global registry for the selected type.
 *
 * @param type - Color type to filter by.
 * @returns List of color names matching the requested type.
 * @category Theme
 */
export function getColorNames(type: 'semantic'): SemanticColor[];
export function getColorNames(type: 'extended'): ExtendedColor[];
export function getColorNames(type: 'surface'): SurfaceColor[];
export function getColorNames(type: 'theme'): ThemeColor[];
export function getColorNames(type: 'base'): BaseColor[];
export function getColorNames(type: 'border'): BorderColor[];
export function getColorNames(type: ColorType) {
    let allowedTypes: ColorType[];

    switch (type) {
        case 'surface':
            allowedTypes = ['surface', 'extended'];
            break;
        case 'base':
            allowedTypes = ['semantic', 'surface', 'extended'];
            break;
        case 'border':
            allowedTypes = ['semantic', 'surface', 'extended', 'border'];
            break;
        default:
            allowedTypes = [type];
            break;
    }

    return Object.entries(getColorRegistry())
        .filter(([_, entry]) => (entry?.type ? allowedTypes.includes(entry.type) : false))
        .map(([name]) => name);
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
export const getSurfaceColorVar = (color: ThemeColor) => {
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
