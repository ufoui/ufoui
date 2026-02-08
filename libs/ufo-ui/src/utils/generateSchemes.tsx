import { PartialThemeSchemes, ThemeSchemes } from '@ufoui/types';
import { toKebabCase } from '@ufoui/core';

import { ExtraColorOverrides, generateMaterialColors } from './generateMaterialColors';
/**
 * Generates and injects CSS custom properties for Material Design 3 theme colors.
 *
 * This function calls `generateMaterialColors()` to resolve a complete light/dark
 * `ThemeSchemes` object based on a seed color, optional extra semantic colors
 * (`info`, `warning`, `success`), and optional overrides for individual color tokens.
 *
 * All resolved tokens are converted to CSS variables using kebab-case, e.g.:
 *   `--uui-color-primary`, `--uui-color-on-surface`, etc.
 *
 * Light mode tokens are injected into `:root`, dark mode tokens into `.dark`.
 * Variables are injected once into a single `<style>` tag with ID `ufo-ui-theme`.
 *
 * @param seedColor - The base seed color used to generate MD3 tonal palettes.
 *                    Defaults to `#6750A4` if not provided.
 * @param extraColors - Optional map of base semantic colors for `info`, `warning`, and `success`.
 *                      These override the default values.
 * @param schemes - Optional overrides for light and dark color tokens.
 *                  Partial values will be merged with the generated ones.
 *
 * @returns A fully resolved `ThemeSchemes` object containing all tokens for light and dark modes.
 *
 * @example
 * ```ts
 * const schemes = generateSchemes('#6200ee', { info: '#0288d1' }, { light: { primary: '#ff5722' } });
 * ```
 *
 * @category Theme
 */
// seedColor = '#1A73E8',
// seedColor = '#6750A4', default md3
export function generateSchemes(
    seedColor = '#6750A4',
    extraColors?: ExtraColorOverrides,
    schemes: PartialThemeSchemes = {}
): ThemeSchemes {
    const styleId = 'ufo-ui-theme';
    let style = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        document.head.appendChild(style);
    }

    const generatedSchemes = generateMaterialColors(seedColor, extraColors, schemes);

    // Light mode
    const lightVars = [
        ...(Object.entries(generatedSchemes.light) as [string, string][]).map(
            ([k, v]) => `--uui-color-${toKebabCase(k)}: ${v};`
        ),
    ].join('');

    // Dark mode
    const darkVars = (Object.entries(generatedSchemes.dark) as [string, string][])
        .map(([k, v]) => `--uui-color-${toKebabCase(k)}: ${v};`)
        .join('');

    style.textContent = `:root{${lightVars}}.dark{${darkVars}}`;

    return generatedSchemes;
}
