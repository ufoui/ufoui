import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import '../../styles/index.css';
import { defaultTheme, ThemeContext, ThemeContextValue } from '../../context';
import { applyThemeColors, generateMaterialColors, mergeOverrides, setFontRegistry } from '../../utils';
import {
    PartialThemeBreakpoints,
    PartialThemeFonts,
    Theme,
    ThemeColor,
    ThemeCustomColors,
} from '../../types';

export interface ThemeProviderProps {
    /** React children to render within the theme context. */
    children: ReactNode;

    /**
     * Optional color mode: 'light' or 'dark'.
     * If not provided, defaults to 'light'.
     */
    colorMode?: 'light' | 'dark';

    /**
     * Optional seed color used to generate MD3 theme.
     * Defaults to #6750A4 if omitted.
     */
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
 * @param props - Theme provider props.
 * @param props.children - React children rendered within the theme context.
 * @param props.colorMode - Optional color mode: `'light'` or `'dark'`. Defaults to `'light'`.
 * @param props.seedColor - Optional base color used to generate the theme. Defaults to `#6750A4`.
 * @param props.colors - Optional semantic seed colors map (core + augmented via `CustomColors`).
 *
 * @example
 * ```tsx
 * <ThemeProvider colorMode="dark" seedColor="#6200ee" colors={{ info: '#2196f3', primary: '#0f62fe' }}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @privateRemarks
 * The provider intentionally computes generated schemes during state initialization and once again
 * in the `[colors, seedColor]` effect. This keeps theme token names available on first render,
 * including setups without `ColorRegistry`, at the cost of an extra computation.
 *
 * @category Components
 * @group Theme
 */
export const ThemeProvider = ({ children, colorMode, seedColor, colors, breakpoints, fonts }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const darkMode = colorMode === 'dark';
        const generatedSchemes = generateMaterialColors(seedColor, colors);
        return {
            darkMode,
            schemes: generatedSchemes,
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

    useEffect(() => {
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
