import { useCallback, useMemo, useSyncExternalStore } from 'react';

import { ThemeBreakpointKey, ThemeBreakpoints } from '../types';
import { useTheme } from './useTheme';

type ResponsiveCoreValues<T> = {
    /** Base fallback value used when no breakpoint value matches. */
    base?: T;
} & Partial<Record<ThemeBreakpointKey, T>>;

export type ResponsiveValues<T> = ResponsiveCoreValues<T> & Record<string, T | undefined>;

export interface UseResponsiveResult {
    /** Current viewport width in pixels. */
    width: number;
    /** Current active breakpoint key for the viewport width. */
    breakpoint: string;
    /** Theme breakpoint map. */
    breakpoints: ThemeBreakpoints;
    /**
     * Resolves a responsive value map to a single value based on viewport width.
     *
     * @example
     * br({ base: 'gray', sm: 'red', xl: 'blue' })
     */
    br: <T>(values: ResponsiveValues<T>) => T | undefined;
}

type BreakpointEntry = {
    key: string;
    minWidth: number;
};

const BASE_REM_PX = 16;

const toPx = (value: string): number => {
    const normalized = value.trim().toLowerCase();

    if (normalized.endsWith('px')) {
        return Number.parseFloat(normalized);
    }
    if (normalized.endsWith('rem') || normalized.endsWith('em')) {
        return Number.parseFloat(normalized) * BASE_REM_PX;
    }

    const parsed = Number.parseFloat(normalized);
    return Number.isNaN(parsed) ? 0 : parsed;
};

const getWindowWidth = (): number => {
    if (typeof window === 'undefined') {
        return 0;
    }
    return window.innerWidth;
};

type ViewportSubscriber = () => void;

const viewportSubscribers = new Set<ViewportSubscriber>();
let viewportListenerReady = false;
let viewportWidthSnapshot = 0;

const emitViewportWidth = () => {
    viewportSubscribers.forEach(listener => {
        listener();
    });
};

const onViewportChange = () => {
    const nextWidth = getWindowWidth();
    if (nextWidth === viewportWidthSnapshot) {
        return;
    }
    viewportWidthSnapshot = nextWidth;
    emitViewportWidth();
};

const ensureViewportWidth = () => {
    if (typeof window === 'undefined' || viewportListenerReady) {
        return;
    }

    viewportWidthSnapshot = getWindowWidth();
    window.addEventListener('resize', onViewportChange);
    window.addEventListener('orientationchange', onViewportChange);
    viewportListenerReady = true;
};

const subscribeViewportWidth = (listener: ViewportSubscriber) => {
    ensureViewportWidth();
    viewportSubscribers.add(listener);

    return () => {
        viewportSubscribers.delete(listener);
    };
};

const getViewportWidthSnapshot = () => {
    ensureViewportWidth();
    return viewportWidthSnapshot;
};

const getServerViewportWidthSnapshot = () => 0;

/**
 * Returns responsive helpers based on the active theme breakpoints.
 *
 * @category Hooks
 */
export const useResponsive = (): UseResponsiveResult => {
    const { theme } = useTheme();
    const width = useSyncExternalStore(
        subscribeViewportWidth,
        getViewportWidthSnapshot,
        getServerViewportWidthSnapshot
    );

    const orderedBreakpoints = useMemo<BreakpointEntry[]>(() => {
        return Object.entries(theme.breakpoints)
            .map(([key, minWidth]) => ({ key, minWidth: toPx(minWidth) }))
            .sort((a, b) => a.minWidth - b.minWidth);
    }, [theme.breakpoints]);

    const breakpoint = useMemo(() => {
        let active = orderedBreakpoints[0]?.key ?? 'base';
        for (const bp of orderedBreakpoints) {
            if (width >= bp.minWidth) {
                active = bp.key;
            }
        }
        return active;
    }, [orderedBreakpoints, width]);

    const br = useCallback(
        <T>(values: ResponsiveValues<T>): T | undefined => {
            let resolved = values.base;

            for (const bp of orderedBreakpoints) {
                if (width >= bp.minWidth && values[bp.key] !== undefined) {
                    resolved = values[bp.key];
                }
            }

            return resolved;
        },
        [orderedBreakpoints, width]
    );

    return {
        width,
        breakpoint,
        breakpoints: theme.breakpoints,
        br,
    };
};
