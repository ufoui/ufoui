import { toKebabCase } from './utils';

export type ElementFont =
    | 'displayLarge'
    | 'displayMedium'
    | 'displaySmall'
    | 'headlineLarge'
    | 'headlineMedium'
    | 'headlineSmall'
    | 'titleLarge'
    | 'titleMedium'
    | 'titleSmall'
    | 'labelLarge'
    | 'labelMedium'
    | 'labelSmall'
    | 'bodyLarge'
    | 'bodyMedium'
    | 'bodySmall'
    | 'caption'
    | 'overline';

/**
 * Returns the CSS class for the given typography token.
 *
 * @param font Typography token.
 * @returns CSS class in the form uui-font-<token>.
 */
export const getFontClass = (font: ElementFont): string => `uui-font-${toKebabCase(font)}`;
