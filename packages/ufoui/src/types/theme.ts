import type { ThemeBreakpoints } from './breakpoints';
import type { ThemeFonts } from './fonts';
import type { ThemeColorSchemes } from './color';

/**
 * Defines the overall theme configuration, including
 * the active mode and all available color schemes.
 *
 * @category Theme
 */
export interface Theme {
    /** Indicates whether dark mode is currently active. */
    darkMode: boolean;

    /** Collection of all available color schemes. */
    schemes: ThemeColorSchemes;

    /** Responsive breakpoint tokens. */
    breakpoints: ThemeBreakpoints;

    /** Font class map keyed by theme font token name. */
    fonts: ThemeFonts;
}
