/**
 * Defines built-in typography tokens available in the design system.
 *
 * @category Theme
 */
export type CoreFont =
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
 * Optional custom typography tokens added via module augmentation.
 *
 * @example
 * declare module '@ufoui/core' {
 *   interface CustomFonts {
 *     promoFont: true;
 *   }
 * }
 *
 * @category Theme
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CustomFonts {}

/**
 * Custom typography token keys registered via {@link CustomFonts}.
 *
 * @category Theme
 */
export type CustomFontKey = Extract<keyof CustomFonts, string>;
/**
 * All theme typography tokens (core + custom).
 *
 * @category Theme
 */
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type ThemeFont = CoreFont | CustomFontKey;

/**
 * Typography token accepted by component-level `font` props.
 *
 * @category Theme
 */
export type ElementFont = ThemeFont;

/**
 * Full font class map keyed by typography token names.
 *
 * @remarks
 * Includes core and custom typography keys, while also allowing additional string keys.
 *
 * @category Theme
 */
export type ThemeFonts = Partial<Record<ThemeFont, string>> & Record<string, string>;

/**
 * Partial variant of {@link ThemeFonts}, allowing selective overrides.
 *
 * @category Theme
 */
export type PartialThemeFonts = Partial<Record<ThemeFont, string>> & Record<string, string | undefined>;
