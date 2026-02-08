import { useContext } from 'react';

import { ThemeContext } from '@ufoui/context/themeContext';
import type { ThemeContextValue } from '@ufoui/context/themeContext';

/**
 * Hook to access the current theme context.
 *
 * Must be used within a `<ThemeProvider>`. If used outside, it will throw an error.
 *
 * @throws Error if the context is unavailable (i.e., outside a ThemeProvider).
 * @returns The current ThemeContextValue.
 *
 * @category Hooks
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return context;
}
