import { useCallback, useMemo, useSyncExternalStore } from 'react';

import { CustomBreakpointKey, ThemeBreakpointKey, ThemeBreakpoints } from '../types';
import { breakpointStore, getOrderedBreakpoints, resolveBreakpoint, resolveResponsiveValue } from '../utils';
import { useTheme } from './useTheme';

type ResponsiveResolvedBreakpoint = ThemeBreakpointKey | CustomBreakpointKey | 'base';

type ResponsiveCoreValues<T> = {
    base?: T;
    print?: T;
} & Partial<Record<ThemeBreakpointKey, T>>;

/**
 * Responsive value map resolved against the current viewport width.
 *
 * `base` acts as the fallback value, matching breakpoint keys override it,
 * and `print` is used when the browser enters print mode.
 *
 * @category Hooks
 */
export type ResponsiveValues<T> = ResponsiveCoreValues<T> & Partial<Record<CustomBreakpointKey, T>>;

/**
 * Result returned by the useResponsive hook.
 *
 * @category Hooks
 */
export interface UseResponsiveResult {
    /** Current viewport width in pixels. */
    width: number;

    /** Indicates whether the browser is currently rendering for print media. */
    isPrint: boolean;

    /** Active breakpoint key for the current viewport width. */
    breakpoint: ResponsiveResolvedBreakpoint;

    /** Breakpoint map from the active theme. */
    breakpoints: ThemeBreakpoints;

    /** Resolves a responsive value map to a single value for the current viewport. */
    br: <T>(values: ResponsiveValues<T>) => T | undefined;
}

/**
 * Returns the current viewport state and helpers for resolving theme breakpoints.
 *
 * The hook exposes:
 * - `width` for the current viewport width
 * - `breakpoint` for the active theme breakpoint
 * - `isPrint` for print media detection
 * - `br()` to resolve responsive values against the current viewport
 *
 * @example
 * const { breakpoint, br } = useResponsive();
 * const direction = br({ base: 'column', md: 'row' });
 *
 * @example
 * declare module '@ufoui/core' {
 *   interface CustomBreakpoints {
 *     tablet: true;
 *     desktopWide: true;
 *   }
 * }
 *
 * const { br } = useResponsive();
 * const gap = br({ base: 8, tablet: 12, desktopWide: 20 });
 *
 * @category Hooks
 */
export const useResponsive = (): UseResponsiveResult => {
    const { theme } = useTheme();

    const { width, isPrint } = useSyncExternalStore(
        breakpointStore.subscribe,
        breakpointStore.getSnapshot,
        breakpointStore.getServerSnapshot
    );

    const orderedBreakpoints = useMemo(() => getOrderedBreakpoints(theme.breakpoints), [theme.breakpoints]);

    const breakpoint = useMemo(
        () => resolveBreakpoint(orderedBreakpoints, width) as ResponsiveResolvedBreakpoint,
        [orderedBreakpoints, width]
    );

    const br = useCallback(
        <T>(values: ResponsiveValues<T>): T | undefined => {
            return resolveResponsiveValue(values, orderedBreakpoints, { width, isPrint });
        },
        [isPrint, orderedBreakpoints, width]
    );

    return {
        width,
        isPrint,
        breakpoint,
        breakpoints: theme.breakpoints,
        br,
    };
};
