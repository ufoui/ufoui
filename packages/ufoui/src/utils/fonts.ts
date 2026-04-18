import { toKebabCase } from './utils';
import { CoreFont, ElementFont, PartialThemeFonts, ThemeFont } from '../types/fonts';
export type { CoreFont, CustomFonts, CustomFontKey, ThemeFont, ElementFont, ThemeFonts, PartialThemeFonts } from '../types/fonts';

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

const coreFontClassMap = Object.fromEntries(coreFonts.map(font => [font, `uui-font-${toKebabCase(font)}`])) as Record<
    CoreFont,
    string
>;

let fontClassMap = new Map<string, string>(Object.entries(coreFontClassMap));
let fontNames = new Set<ThemeFont>(coreFonts);

export const applyThemeFonts = (fonts?: PartialThemeFonts): void => {
    fontClassMap = new Map<string, string>(Object.entries(coreFontClassMap));
    fontNames = new Set<ThemeFont>(coreFonts);
    for (const [key, value] of Object.entries(fonts ?? {})) {
        if (value !== undefined) {
            fontClassMap.set(key, value);
            fontNames.add(key as ThemeFont);
        }
    }
};

export const getFontNames = (): ThemeFont[] => Array.from(fontNames);
export const getFontClass = (font: ElementFont): string => fontClassMap.get(font) ?? '';
