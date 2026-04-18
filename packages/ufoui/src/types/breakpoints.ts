/**
 * Defines responsive breakpoints used by the design system.
 *
 * @category Theme
 */
export type ThemeBreakpointKey = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Optional custom breakpoint names added via module augmentation.
 *
 * @example
 * declare module '@ufoui/core' {
 *   interface CustomBreakpoints {
 *     ufo: true;
 *   }
 * }
 *
 * @category Theme
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CustomBreakpoints {}

/**
 * Custom breakpoint keys registered via {@link CustomBreakpoints}.
 *
 * @category Theme
 */
export type CustomBreakpointKey = Extract<keyof CustomBreakpoints, string>;

/**
 * Defines the canonical responsive breakpoints used by the design system.
 *
 * @category Theme
 */
export type ThemeBreakpoints = Record<ThemeBreakpointKey, string> &
    Partial<Record<CustomBreakpointKey, string>> &
    Record<string, string>;

/**
 * Partial variant of {@link ThemeBreakpoints}, allowing selective overrides.
 *
 * @category Theme
 */
export type PartialThemeBreakpoints = Partial<Record<ThemeBreakpointKey | CustomBreakpointKey, string>> &
    Record<string, string | undefined>;
