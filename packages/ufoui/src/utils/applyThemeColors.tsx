import { ThemeColorSchemes } from '../types';
import { toKebabCase } from './utils';

/**
 * Applies resolved theme tokens as CSS custom properties.
 *
 * @param schemes - Fully resolved theme schemes.
 * @returns The same input object for convenient chaining.
 *
 * @category Theme
 */
export function applyThemeColors(schemes: ThemeColorSchemes): ThemeColorSchemes {
    if (typeof document === 'undefined') {
        return schemes;
    }

    const styleId = 'ufo-ui-theme';
    let style = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        document.head.appendChild(style);
    }

    // Light mode
    const lightVars = [...Object.entries(schemes.light).map(([k, v]) => `--uui-color-${toKebabCase(k)}: ${v};`)].join(
        ''
    );

    // Dark mode
    const darkVars = Object.entries(schemes.dark)
        .map(([k, v]) => `--uui-color-${toKebabCase(k)}: ${v};`)
        .join('');

    style.textContent = `:root{${lightVars}}.dark{${darkVars}}`;

    return schemes;
}
