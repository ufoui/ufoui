import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import '../../styles/index.css';
import { defaultTheme, ThemeContext, ThemeContextValue } from '../../context';
import { applyThemeFonts } from '../../utils/fonts';
import { applyThemeTokens, generateMaterialColors, ThemeColor } from '../../utils';
import { PartialThemeBreakpoints, PartialThemeFonts, Theme, ThemeBreakpoints, ThemeFonts } from '../../types';

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

    /** Optional custom colors map used to define or override generated theme roles. */
    colors?: Record<string, string>;

    /** Optional responsive breakpoints map. */
    breakpoints?: PartialThemeBreakpoints;

    /** Optional font class map keyed by theme font token name. */
    fonts?: PartialThemeFonts;
}

const resolveBreakpoints = (overrides?: PartialThemeBreakpoints): ThemeBreakpoints => {
    const merged: ThemeBreakpoints = { ...defaultTheme.breakpoints };
    if (!overrides) {
        return merged;
    }

    for (const [key, value] of Object.entries(overrides)) {
        if (value !== undefined) {
            merged[key] = value;
        }
    }

    return merged;
};

const resolveFonts = (overrides?: PartialThemeFonts): ThemeFonts => {
    const merged: ThemeFonts = { ...defaultTheme.fonts };
    if (!overrides) {
        return merged;
    }

    for (const [key, value] of Object.entries(overrides)) {
        if (value !== undefined) {
            merged[key] = value;
        }
    }

    return merged;
};

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
 * @param props.colors - Optional custom colors map used to define or override generated theme roles.
 *
 * @example
 * ```tsx
 * <ThemeProvider colorMode="dark" seedColor="#6200ee" colors={{ info: '#2196f3', primary: '#0f62fe' }}>
 *   <App />
 * </ThemeProvider>
 * ```
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
            breakpoints: resolveBreakpoints(breakpoints),
            fonts: resolveFonts(fonts),
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
            darkMode: v.darkMode,
            schemes: generatedSchemes,
            breakpoints: resolveBreakpoints(breakpoints),
            fonts: resolveFonts(fonts),
        }));
    }, [breakpoints, colors, fonts, seedColor]);

    useEffect(() => {
        applyThemeTokens(theme.schemes);
    }, [theme.schemes]);

    useEffect(() => {
        applyThemeFonts(theme.fonts);
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
