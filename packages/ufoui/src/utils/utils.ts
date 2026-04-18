import React from 'react';

export type ElementSize = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
export type ElementInset = 'none' | 'left' | 'right' | 'top' | 'bottom' | 'middle';
export type ElementShape = 'square' | 'smooth' | 'rounded' | 'round';
/**
 * Border width levels used across UUI components (0–4).
 *
 * @remarks
 * Numeric scale mapped to design-token border thickness:
 * - **0** – no border
 * - **1** – thin (default)
 * - **2–3** – medium / strong emphasis
 * - **4** – maximum emphasis
 *
 * Used by inputs, buttons, menus, cards and other surface components.
 *
 * @category Utils
 */
export type ElementBorder = 0 | 1 | 2 | 3 | 4;
export type ElementOutline = 0 | 1 | 2 | 3 | 4;
/**
 * Layout orientation used by axis-based components.
 *
 * @remarks
 * Determines whether a component operates along the vertical
 * (top-to-bottom) or horizontal (left-to-right) axis.
 *
 * Commonly used by components that can render in two directions,
 * such as Collapse, Tabs, Divider, and Accordion.
 *
 * - **vertical** – primary axis is height (Y-axis)
 * - **horizontal** – primary axis is width (X-axis)
 *
 * @category Utils
 */
export type ElementOrientation = 'vertical' | 'horizontal';
/**
 * Elevation (shadow depth) levels used across UUI surfaces.
 *
 * @remarks
 * Maps numeric values **0–5** to predefined shadow tokens (`--uui-elevation-*`):
 * - **0** — no shadow
 * - **1–2** — low elevation (small ambient + subtle directional shadow)
 * - **3–4** — medium elevation (stronger spread, more depth)
 * - **5** — highest elevation (max separation from background)
 *
 * Each level resolves to a CSS `box-shadow` defined in theme tokens.
 * Supports hover/pressed elevation transitions via utility classes:
 * - `.uui-hover-elevate`
 * - `.uui-pressed-elevate`
 *
 * Used by menus, cards, buttons, popovers and all floating surfaces.
 *
 * @category Utils
 */
export type ElementElevation = 0 | 1 | 2 | 3 | 4 | 5;
/**
 * Alignment positions for floating and anchored UI components.
 *
 * @remarks
 * Defines all relative placements between a reference element and its
 * floating content (menus, tooltips, dropdowns, submenus).
 *
 * Standard positions:
 * - **topLeft**, **topCenter**, **topRight**
 * - **centerLeft**, **center**, **centerRight**
 * - **bottomLeft**, **bottomCenter**, **bottomRight**
 *
 * Extended positions (used mainly for submenus):
 * - **topRightOut** – flush to the right, outside the reference element.
 * - **topLeftOut** – flush to the left, outside the reference element.
 *
 * Special:
 * - **auto** – automatically selects the best fitting placement.
 *
 * @category Utils
 */
export type ElementPlacement =
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'centerLeft'
    | 'center'
    | 'centerRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
    | 'topRightOut'
    | 'topLeftOut'
    | 'auto';
export type ElementDensity = 'comfortable' | 'compact' | 'dense';
export type ElementFocusEffect = 'ring' | 'overlay';
export type ElementPressedEffect = 'elevate' | 'overlay' | 'scale';
export type ElementHoverEffect = 'elevate' | 'overlay' | 'color';
export type ElementSelectedEffect = 'color' | 'morph' | 'border' | 'overlay';
export type ElementTouchEffect = 'ripple';
export type ElementTextPlacement = 'start' | 'end' | 'top' | 'bottom';

/**
 * Converts a camelCase, PascalCase, or acronym-based string into kebab-case.
 *
 * @param str - Input string to convert.
 * @returns The kebab-case version of the string.
 *
 * @example
 * toKebabCase("myVariableName"); // "my-variable-name"
 * toKebabCase("URLParser"); // "url-parser"
 *
 * @category Utils
 */
export function toKebabCase(str: string): string {
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // camelCase, PascalCase
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // HTMLParser → HTML-Parser
        .toLowerCase();
}

/**
 * Clamps a numeric value to an integer range with a fallback.
 *
 * Converts the input to a number, rounds it to an integer,
 * then clamps it between `min` and `max`.
 * If the value is not a finite number, returns `fallback`.
 *
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 * @param value - Input value to clamp. Can be any type.
 * @param fallback - Value returned when input is invalid.
 * @returns A clamped integer within the given range.
 *
 * @category Utils
 */
export function clampInt(min: number, max: number, value: unknown, fallback?: number): number | undefined {
    const n = Number(value);
    if (!Number.isFinite(n)) {
        return fallback;
    }
    return Math.min(max, Math.max(min, Math.round(n)));
}

export const getPlacementClass = (position: ElementPlacement) => {
    const positions = {
        topLeft: 'uui-top-left',
        topCenter: 'uui-top-center',
        topRight: 'uui-top-right',
        topRightOut: 'uui-top-right-out',
        topLeftOut: 'uui-top-left-out',
        centerLeft: 'uui-center-left',
        center: 'uui-center',
        centerRight: 'uui-center-right',
        bottomLeft: 'uui-bottom-left',
        bottomCenter: 'uui-bottom-center',
        bottomRight: 'uui-bottom-right',
        auto: 'uui-top-right',
    };
    return positions[position];
};

/**
 * Returns the appropriate CSS class for the given shape token.
 *
 * @param shape Shape token.
 * @returns CSS class for shape variant.
 */
export const getShapeClass = (shape?: ElementShape): string => {
    return shape ? `uui-${shape}` : '';
};

/**
 * Returns the CSS class for the given size token.
 *
 * @param size Size token.
 * @returns CSS class for size variant.
 */
export const getSizeClass = (size: ElementSize): string => `uui-${toKebabCase(size)}`;

/**
 * Returns the appropriate CSS class for the given border size.
 *
 * @param border - Border size (0 to 4)
 * @returns A class name like 'uui-border-2'
 */
export const getBorderClass = (border?: ElementBorder): string => {
    const size = clampInt(0, 4, border);
    return size === undefined ? '' : `uui-border-${size}`;
};

/**
 * Returns the appropriate CSS class for the given elevation level.
 *
 * @param elevation Elevation token.
 * @returns CSS class in the form uui-elevation-X.
 */
export const getElevationClass = (elevation?: ElementElevation): string => {
    const size = clampInt(0, 5, elevation);
    return size === undefined ? '' : `uui-elevation-${size}`;
};

/**
 * Returns the appropriate CSS class for the given density token.
 *
 * @param density Density token.
 * @returns CSS class for density variant.
 */
export const getDensityClass = (density?: ElementDensity): string => {
    return density ? `uui-${density}` : '';
};

/**
 * Merges multiple React refs into a single ref callback.
 *
 * @param refs - List of refs (callback refs or `MutableRefObject`s) to update.
 * @returns A ref callback that assigns the same value to all provided refs.
 *
 * @remarks
 * - Supports both function refs and object refs.
 * - Commonly used when forwarding a ref while also keeping a local one.
 *
 * @example
 * const innerRef = useRef<HTMLDivElement>(null);
 * const merged = mergeRefs(ref, innerRef);
 *
 * <div ref={merged} />
 *
 * @category Utils
 */
export function mergeRefs<T>(...refs: React.Ref<T>[]): React.RefCallback<T> {
    return value => {
        refs.forEach(ref => {
            if (typeof ref === 'function') {
                ref(value);
            } else if (ref) {
                const mutableRef = ref as React.MutableRefObject<T | null>;
                mutableRef.current = value;
            }
        });
    };
}

/**
 * Joins class names into a single string.
 *
 * Accepts strings or arrays of strings and filters out falsy values.
 *
 * @function
 * @param classes Class names to combine.
 *
 * @category Utils
 */
export function cn(...classes: (string | false | null | undefined | string[])[]): string {
    return classes.flat().filter(Boolean).join(' ');
}
