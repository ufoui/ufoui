import { createContext } from 'react';

import { Theme } from '../types';
import { ThemeColor } from '../utils';

/**
 * Provides shape for the theme context shared across the application.
 * Allows reading and updating theme configuration and resolving token values.
 *
 * @category Contexts
 */
export interface ThemeContextValue {
  /** The current theme configuration including MD3 color schemes and dark mode flag. */
  theme: Theme;

  /**
   * Updates the entire theme object.
   * Useful for switching theme variants or applying generated color overrides.
   *
   * @param theme - A complete Theme object to replace the current one.
   */
  setTheme: (theme: Theme) => void;

  /** Shorthand for theme.darkMode */
  darkMode: boolean;

  /**
   * Enables or disables dark mode and toggles `.dark` class on `<body>`.
   *
   * @param darkMode - Boolean flag to activate or deactivate dark mode.
   */
  setDarkMode: (darkMode: boolean) => void;

  /**
   * Returns the current resolved value of a theme token
   * based on the active color mode (light/dark).
   *
   * @param color - A theme token key (e.g. `primary`, `onBackground`, `surfaceContainerLow`).
   * @returns The corresponding color value as a hex string.
   */
  getColorValue: (color: ThemeColor) => string;

  /**
   * Returns the value of a theme token from a specific scheme (`light` or `dark`),
   * regardless of the current mode.
   *
   * @param scheme - `'light'` or `'dark'`.
   * @param color - A theme token key.
   * @returns The resolved color value from the specified scheme.
   */
  getThemeColorValue: (scheme: 'light' | 'dark', color: ThemeColor) => string;
}

/**
 * A basic fallback theme used as default value for the ThemeContext.
 * Contains empty light and dark schemes with dark mode disabled.
 *
 * @category Constants
 */
export const defaultTheme: Theme = {
  darkMode: false,
  schemes: { light: {}, dark: {} },
};

/**
 * ThemeContext provides access to the current theme and utility methods.
 *
 * Should be accessed via the `useTheme()` hook or consumed within a `<ThemeProvider>`.
 *
 * Returns `null` if used outside the provider.
 *
 * @category Contexts
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null);
