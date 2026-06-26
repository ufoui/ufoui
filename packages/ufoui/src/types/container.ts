import type { CustomBreakpointKey, ThemeBreakpointKey } from './breakpoints';

/**
 * Page container configuration consumed by the `ThemeProvider`.
 *
 * @category Theme
 */
export type ContainerConfig = {
    /** Centers the container with `margin-inline: auto`. Defaults to `true`. */
    center?: boolean;

    /** Mobile-first horizontal padding: a single value, or a per-breakpoint map cascading from `base` up. */
    padding?: string | Partial<Record<'base' | ThemeBreakpointKey | CustomBreakpointKey, string>>;
};
