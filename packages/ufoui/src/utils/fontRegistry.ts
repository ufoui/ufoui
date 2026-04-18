import { toKebabCase } from './utils';
import { CoreFont, ElementFont, PartialThemeFonts, ThemeFont } from '../types';
import { mergeOverrides } from './mergeOverrides';

/**
 * Built-in font names available in the default font registry.
 *
 * @category Theme
 */
export const coreFonts = [
    'displayLarge',
    'displayMedium',
    'displaySmall',
    'headlineLarge',
    'headlineMedium',
    'headlineSmall',
    'titleLarge',
    'titleMedium',
    'titleSmall',
    'labelLarge',
    'labelMedium',
    'labelSmall',
    'bodyLarge',
    'bodyMedium',
    'bodySmall',
    'caption',
    'overline',
] as const;

const coreFontMap = Object.fromEntries(coreFonts.map(font => [font, `uui-font-${toKebabCase(font)}`])) as Record<
    CoreFont,
    string
>;

let fontRegistry = new Map<string, string>(Object.entries(coreFontMap));

/**
 * Replaces the runtime font registry with core fonts plus provided overrides.
 *
 * @param fonts - Optional font class overrides keyed by font name.
 * @category Theme
 */
export const setFontRegistry = (fonts?: PartialThemeFonts): void => {
    const { merged } = mergeOverrides(coreFontMap, fonts);
    fontRegistry = new Map<string, string>(Object.entries(merged));
};

/**
 * Returns all font names currently registered at runtime.
 *
 * @returns List of registered font names.
 * @category Theme
 */
export const getFontNames = (): ThemeFont[] => Array.from(fontRegistry.keys()) as ThemeFont[];

/**
 * Returns the CSS class registered for the given font name.
 *
 * @param font - Font name key.
 * @returns Registered CSS class or empty string when key is not registered.
 * @category Theme
 */
export const getFontClass = (font: ElementFont): string => fontRegistry.get(font) ?? '';
