import { ThemeBreakpoints } from '../../types';

/**
 * Viewport snapshot used by the breakpoint store.
 *
 * @category Breakpoints
 */
export type ViewportSnapshot = {
    width: number;
    isPrint: boolean;
};

type BreakpointEntry = {
    key: string;
    minWidth: number;
};

/**
 * Converts a CSS length value to pixels.
 *
 * Supports `px`, `rem`, and unitless numeric strings.
 *
 * @function
 * @param value CSS length value to convert.
 *
 * @category Breakpoints
 */
export const toPx = (value: string): number => {
    const normalized = value.trim().toLowerCase();

    if (normalized.endsWith('px')) {
        return Number.parseFloat(normalized);
    }
    if (normalized.endsWith('rem')) {
        return Number.parseFloat(normalized) * getRootFontSize();
    }

    const parsed = Number.parseFloat(normalized);
    return Number.isNaN(parsed) ? 0 : parsed;
};

/**
 * Returns the ordered list of theme breakpoints sorted by width.
 *
 * @function
 * @param breakpoints Breakpoint map from the active theme.
 *
 * @category Breakpoints
 */
export const getOrderedBreakpoints = (breakpoints: ThemeBreakpoints): BreakpointEntry[] => {
    return Object.entries(breakpoints)
        .map(([key, minWidth]) => ({ key, minWidth: toPx(minWidth) }))
        .sort((a, b) => a.minWidth - b.minWidth);
};

/**
 * Resolves the active breakpoint key for a viewport width.
 *
 * @function
 * @param breakpoints Ordered breakpoint entries.
 * @param width Current viewport width.
 *
 * @category Breakpoints
 */
export const resolveBreakpoint = (breakpoints: BreakpointEntry[], width: number): string => {
    let active = breakpoints[0]?.key ?? 'base';

    for (const bp of breakpoints) {
        if (width >= bp.minWidth) {
            active = bp.key;
        }
    }

    return active;
};

/**
 * Resolves a responsive value map against the current viewport state.
 *
 * @function
 * @param values Responsive values keyed by breakpoint.
 * @param breakpoints Ordered breakpoint entries.
 * @param snapshot Current viewport snapshot.
 *
 * @category Breakpoints
 */
export const resolveResponsiveValue = <T>(
    values: { base?: T; print?: T } & Record<string, T | undefined>,
    breakpoints: BreakpointEntry[],
    snapshot: ViewportSnapshot
): T | undefined => {
    if (snapshot.isPrint && values.print !== undefined) {
        return values.print;
    }

    let resolved = values.base;

    for (const bp of breakpoints) {
        if (snapshot.width >= bp.minWidth && values[bp.key] !== undefined) {
            resolved = values[bp.key];
        }
    }

    return resolved;
};

const getRootFontSize = (): number => {
    if (typeof window === 'undefined') {
        return 16;
    }
    const parsed = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    return Number.isNaN(parsed) ? 16 : parsed;
};
