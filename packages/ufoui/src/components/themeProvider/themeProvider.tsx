import { ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { defaultTheme, ThemeContext, ThemeContextValue } from '../../context';
import { generateMaterialColors, mergeOverrides, setFontRegistry } from '../../utils';
import { applyThemeColors } from '../../utils/applyThemeColors';
import { PartialThemeBreakpoints, PartialThemeFonts, Theme, ThemeColor, ThemeCustomColors } from '../../types';

const useThemeEffect = typeof document === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Props for the {@link ThemeProvider} component.
 *
 * @category Theme
 */
export interface ThemeProviderProps {
    /** React children to render within the theme context. */
    children: ReactNode;

    /** Optional color mode: 'light' or 'dark'. If not provided, defaults to 'light'. */
    colorMode?: 'light' | 'dark';

    /** Seed color used to generate MD3 theme; ignored when `colors.primary` is set. @default '#6750A4' */
    seedColor?: string;

    /** Optional semantic seed colors map (core + augmented). */
    colors?: ThemeCustomColors;

    /** Optional responsive breakpoints map. */
    breakpoints?: PartialThemeBreakpoints;

    /** Optional font class map keyed by theme font token name. */
    fonts?: PartialThemeFonts;
}

/**
 * Provides a ThemeContext to all descendant components using Material Design 3 color tokens.
 *
 * - Dynamically generates full theme schemes (`light` and `dark`) based on the provided `seedColor`
 *   and optional `colors`.
 * - Injects resolved colors as CSS custom properties into the DOM (`:root` and `.dark`).
 * - Automatically toggles the `.dark` class on `<body>` based on `colorMode`.
 * - Exposes utility functions via context:
 *   - `setTheme`: updates the full theme object
 *   - `setDarkMode`: enables/disables dark mode
 *   - `getColorValue`: gets current color value (light or dark based on mode)
 *   - `getThemeColorValue`: gets any color from a specified scheme (`light` or `dark`)
 *
 * This provider must wrap your application to enable theming and contextual access to color tokens.
 *
 * @param props Component properties.
 * @function
 * @example
 * ```tsx
 * <ThemeProvider colorMode="dark" seedColor="#6200ee" colors={{ info: '#2196f3' }}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @privateRemarks
 * The provider intentionally computes generated schemes during state initialization and once again
 * in the `[colors, seedColor]` effect. This keeps theme token names available on first render,
 * including setups without `ColorRegistry`, at the cost of an extra computation.
 *
 * @category Theme
 */
export const ThemeProvider = ({ children, colorMode, seedColor, colors, breakpoints, fonts }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const darkMode = colorMode === 'dark';
        return {
            darkMode,
            schemes: generateMaterialColors(seedColor, colors),
            breakpoints: mergeOverrides(defaultTheme.breakpoints, breakpoints).merged,
            fonts: mergeOverrides(defaultTheme.fonts, fonts).merged,
        };
    });

    /**
     * Sets dark mode by toggling the `dark` class on the `<body>`.
     * Also updates the `darkMode` flag in the theme state.
     *
     * @param darkMode - Whether dark mode should be active.
     */
    const setDarkMode = useCallback(
        (darkMode: boolean) => {
            if (darkMode) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
            setTheme(prev => ({ ...prev, darkMode }));
        },
        [setTheme]
    );

    /**
     * Returns the current theme value (from either light or dark scheme)
     * for a given color token.
     *
     * @param color - The theme token key (e.g. `"primary"`, `"onBackground"`).
     * @returns The resolved color hex string.
     */
    const getColorValue = useCallback(
        (color: ThemeColor): string => {
            const scheme = theme.darkMode ? theme.schemes.dark : theme.schemes.light;
            return scheme[color] ?? '';
        },
        [theme]
    );

    /**
     * Returns a theme value from the specified scheme.
     *
     * @param scheme - `'light'` or `'dark'`.
     * @param color - The theme token key (e.g. `"primary"`, `"surfaceContainer"`).
     * @returns The resolved color hex string.
     */
    const getThemeColorValue = useCallback(
        (scheme: 'light' | 'dark', color: ThemeColor): string => {
            return theme.schemes[scheme][color] ?? '';
        },
        [theme]
    );

    useEffect(() => {
        if (colorMode) {
            const dark = colorMode === 'dark';
            document.body.classList.toggle('dark', dark);
            setTheme(v => ({ ...v, darkMode: dark }));
        }
    }, [colorMode]);

    useEffect(() => {
        const generatedSchemes = generateMaterialColors(seedColor, colors);
        setTheme(v => ({
            ...v,
            schemes: generatedSchemes,
        }));
    }, [colors, seedColor]);

    useEffect(() => {
        setTheme(v => ({
            ...v,
            breakpoints: mergeOverrides(defaultTheme.breakpoints, breakpoints).merged,
        }));
    }, [breakpoints]);

    useEffect(() => {
        const mergedFonts = mergeOverrides(defaultTheme.fonts, fonts).merged;
        setTheme(v => ({
            ...v,
            fonts: mergedFonts,
        }));
    }, [fonts]);

    useThemeEffect(() => {
        applyThemeColors(theme.schemes);
    }, [theme.schemes]);

    useEffect(() => {
        setFontRegistry(theme.fonts);
    }, [theme.fonts]);

    const value = useMemo<ThemeContextValue>(
        () => ({
            theme,
            setTheme,
            darkMode: theme.darkMode,
            setDarkMode,
            getColorValue,
            getThemeColorValue,
        }),
        [getColorValue, getThemeColorValue, setDarkMode, theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
