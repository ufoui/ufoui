import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { Theme } from '@ufoui/types';
import '../../styles/index.css';
import { defaultTheme, ThemeContext, ThemeContextValue } from '@ufoui/context/themeContext';

import { generateSchemes } from '../../utils/generateSchemes';
import { ThemeColor } from '../../utils/color';

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

    /**
     * Optional custom colors used for info, warning, and success roles.
     * If omitted, defaults to:
     * - info: #03a9f4
     * - warning: #ffd600
     * - success: #689f38
     */
    extraColors?: Partial<Record<'info' | 'warning' | 'success', string>>;
}

/**
 * Provides a ThemeContext to all descendant components using Material Design 3 color tokens.
 *
 * - Dynamically generates full theme schemes (`light` and `dark`) based on the provided `seedColor`
 *   and optional `extraColors` (`info`, `warning`, `success`).
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
 * @param children - React children rendered within the theme context.
 * @param colorMode - Optional color mode: `'light'` or `'dark'`. Defaults to `'light'`.
 * @param seedColor - Optional base color used to generate the theme. Defaults to `#6750A4`.
 * @param extraColors - Optional custom base colors for semantic roles (`info`, `warning`, `success`).
 *
 * @example
 * ```tsx
 * <ThemeProvider colorMode="dark" seedColor="#6200ee" extraColors={{ info: '#2196f3' }}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @category Components
 * @group Theme
 */
export const ThemeProvider = ({ children, colorMode, seedColor, extraColors }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

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
        const { schemes } = defaultTheme;
        setTheme(v => ({
            darkMode: v.darkMode,
            schemes: generateSchemes(seedColor, extraColors, schemes),
        }));
    }, [extraColors, seedColor]);

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
