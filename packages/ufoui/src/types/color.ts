/**
 * Defines all color roles used in a single theme color scheme (e.g. light or dark).
 *
 * Based on the Material Design 3 palette structure with custom extensions
 * for semantic and system colors (e.g. info, success, warning).
 *
 * @remarks
 * Provides the canonical source for all `--uui-color-*` tokens in both light and dark modes.
 *
 * @category Theme
 */
export interface ThemeColorScheme {
    /** Primary brand color used for main UI elements. */
    primary: string;
    /** Foreground color displayed on primary. */
    onPrimary: string;
    /** Container background for primary content. */
    primaryContainer: string;
    /** Foreground color on primary container. */
    onPrimaryContainer: string;
    /** Fixed version of primary for consistent tone. */
    primaryFixed: string;
    /** Foreground color on primaryFixed. */
    onPrimaryFixed: string;
    /** Dimmed tone of primaryFixed. */
    primaryFixedDim: string;
    /** Variant tone for content on primaryFixedDim. */
    onPrimaryFixedVariant: string;

    /** Secondary color for less prominent accents. */
    secondary: string;
    /** Foreground color on secondary. */
    onSecondary: string;
    /** Background container using secondary tone. */
    secondaryContainer: string;
    /** Foreground color on secondary container. */
    onSecondaryContainer: string;
    /** Fixed version of secondary tone. */
    secondaryFixed: string;
    /** Foreground color on secondaryFixed. */
    onSecondaryFixed: string;
    /** Dimmed version of secondaryFixed. */
    secondaryFixedDim: string;
    /** Variant tone for content on secondaryFixedDim. */
    onSecondaryFixedVariant: string;

    /** Tertiary color for decorative or alternative accents. */
    tertiary: string;
    /** Foreground color on tertiary. */
    onTertiary: string;
    /** Background container using tertiary tone. */
    tertiaryContainer: string;
    /** Foreground color on tertiary container. */
    onTertiaryContainer: string;
    /** Fixed version of tertiary tone. */
    tertiaryFixed: string;
    /** Foreground color on tertiaryFixed. */
    onTertiaryFixed: string;
    /** Dimmed version of tertiaryFixed. */
    tertiaryFixedDim: string;
    /** Variant tone for content on tertiaryFixedDim. */
    onTertiaryFixedVariant: string;

    /** Warning tone for alerts or cautions. */
    warning: string;
    /** Foreground color on warning. */
    onWarning: string;
    /** Container color for warning messages. */
    warningContainer: string;
    /** Foreground color on warning container. */
    onWarningContainer: string;
    /** Fixed warning tone. */
    warningFixed: string;
    /** Foreground color on warningFixed. */
    onWarningFixed: string;
    /** Dimmed warningFixed variant. */
    warningFixedDim: string;
    /** Variant foreground color for dimmed warning. */
    onWarningFixedVariant: string;

    /** Informational tone for neutral messages. */
    info: string;
    /** Foreground color on info. */
    onInfo: string;
    /** Container background for info tone. */
    infoContainer: string;
    /** Foreground color on info container. */
    onInfoContainer: string;
    /** Fixed tone for info. */
    infoFixed: string;
    /** Foreground color on infoFixed. */
    onInfoFixed: string;
    /** Dimmed infoFixed variant. */
    infoFixedDim: string;
    /** Variant foreground color for dimmed info. */
    onInfoFixedVariant: string;

    /** Success tone for positive feedback. */
    success: string;
    /** Foreground color on success. */
    onSuccess: string;
    /** Container background for success tone. */
    successContainer: string;
    /** Foreground color on success container. */
    onSuccessContainer: string;
    /** Fixed success tone. */
    successFixed: string;
    /** Foreground color on successFixed. */
    onSuccessFixed: string;
    /** Dimmed successFixed variant. */
    successFixedDim: string;
    /** Variant foreground color for dimmed success. */
    onSuccessFixedVariant: string;

    /** Error tone for destructive actions or validation. */
    error: string;
    /** Foreground color on error. */
    onError: string;
    /** Container background for error tone. */
    errorContainer: string;
    /** Foreground color on error container. */
    onErrorContainer: string;
    /** Fixed error tone. */
    errorFixed: string;
    /** Foreground color on errorFixed. */
    onErrorFixed: string;
    /** Dimmed errorFixed variant. */
    errorFixedDim: string;
    /** Variant foreground color for dimmed error. */
    onErrorFixedVariant: string;

    /** Border and divider color. */
    outline: string;
    /** Secondary outline tone. */
    outlineVariant: string;

    /** Default surface background color. */
    surface: string;
    /** Foreground color on surface. */
    onSurface: string;
    /** Variant background tone for surfaces. */
    surfaceVariant: string;
    /** Foreground color on surfaceVariant. */
    onSurfaceVariant: string;

    /** UI background color. */
    background: string;
    /** Foreground color on background. */
    onBackground: string;

    /** Inverse surface tone (e.g. for bottom navs). */
    inverseSurface: string;
    /** Foreground color on inverse surface. */
    inverseOnSurface: string;
    /** Primary accent used on inverse surfaces. */
    inversePrimary: string;

    /** Color used for shadows and elevation. */
    shadow: string;
    /** Tint overlay for elevated components. */
    surfaceTint: string;

    /** Overlay color for modals, drawers, etc. */
    scrim: string;

    /** Surface tone for highest-level containers. */
    surfaceContainerHighest: string;
    /** Surface tone for high elevation containers. */
    surfaceContainerHigh: string;
    /** Base tone for standard surface containers. */
    surfaceContainer: string;
    /** Surface tone for low elevation containers. */
    surfaceContainerLow: string;
    /** Surface tone for lowest elevation containers. */
    surfaceContainerLowest: string;

    /** Brightest surface tone variant. */
    surfaceBright: string;
    /** Dimmed surface tone variant. */
    surfaceDim: string;

    /** Pure black color used for contrast or background. */
    black: string;
    /** Pure white color used for contrast or foreground. */
    white: string;

    /** Allows for additional custom tokens. */
    [key: string]: string;
}

/**
 * A partial version of {@link ThemeColorScheme}, used for theme overrides
 * or gradual, progressive theming updates.
 *
 * @remarks
 * Useful when defining incomplete color sets (e.g. custom brand palettes).
 * Also permits additional custom token keys with optional values.
 *
 * @category Theme
 */
export type PartialThemeColorScheme = Partial<ThemeColorScheme> & Record<string, string | undefined>;

/**
 * Collection of named color schemes (e.g. light, dark, high-contrast).
 * Used to organize multiple theme modes within a design system.
 *
 * @category Theme
 */
export interface ThemeColorSchemes {
    /** Light mode color scheme. */
    light: PartialThemeColorScheme;

    /** Dark mode color scheme. */
    dark: PartialThemeColorScheme;

    /** Additional custom schemes such as high-contrast or sepia. */
    [key: string]: PartialThemeColorScheme;
}

/**
 * Built-in semantic color names available in every theme.
 *
 * @category Color
 */
export type CoreSemanticColor = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'info' | 'success' | 'error';

/**
 * Built-in surface color names intended for backgrounds, layers, and outlines.
 *
 * @category Color
 */
export type CoreSurfaceColor =
    | 'surface'
    | 'surfaceVariant'
    | 'background'
    | 'inverseSurface'
    | 'surfaceContainerLowest'
    | 'surfaceContainerLow'
    | 'surfaceContainer'
    | 'surfaceContainerHigh'
    | 'surfaceContainerHighest'
    | 'surfaceBright'
    | 'surfaceDim'
    | 'black'
    | 'white';

export type CoreBorderColor = 'outline' | 'outlineVariant';

/**
 * Built-in technical color names not intended for direct usage.
 *
 * @category Color
 */
export type CoreThemeColor =
    | 'onSurface'
    | 'onSurfaceVariant'
    | 'onBackground'
    | 'inverseOnSurface'
    | 'inversePrimary'
    | 'surfaceTint'
    | 'scrim'
    | 'shadow';

/**
 * Augmentation point for custom semantic colors.
 *
 * @example
 * declare module '@ufoui/core' {
 *   interface CustomColors {
 *     myBlue: true;
 *   }
 * }
 *
 * @category Color
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CustomColors {}

/**
 * Custom semantic color token keys registered via {@link CustomColors}.
 *
 * @category Color
 */
export type CustomColorKey = Extract<keyof CustomColors, string>;

/**
 * Base semantic color (core + augmented).
 *
 * @category Color
 */
export type SemanticBaseColor = CoreSemanticColor | CustomColorKey;

/**
 * Builds `on*` color name.
 *
 * @category Color
 */
export type OnColor<T extends string> = `on${Capitalize<T>}`;

/**
 * Semantic color used in component APIs.
 *
 * @category Color
 */
export type SemanticColor = SemanticBaseColor;

/**
 * Extended semantic colors.
 *
 * @category Color
 */
export type ExtendedColor =
    | `${SemanticBaseColor}Container`
    | `${SemanticBaseColor}Fixed`
    | `${SemanticBaseColor}FixedDim`;

/**
 * `on*` counterparts for extended colors.
 *
 * @category Color
 */
export type OnExtendedColor =
    | OnColor<`${SemanticBaseColor}Container`>
    | OnColor<`${SemanticBaseColor}Fixed`>
    | OnColor<`${SemanticBaseColor}FixedVariant`>;

/**
 * Surface colors.
 *
 * @category Color
 */
export type SurfaceColor = CoreSurfaceColor | ExtendedColor;

/**
 * Colors allowed in component props.
 *
 * @category Color
 */
export type BaseColor = SemanticColor | SurfaceColor;

/**
 * Border color.
 *
 * @category Color
 */
export type BorderColor = BaseColor | CoreBorderColor;

/**
 * Full theme color set.
 *
 * @category Color
 */
export type ThemeColor = BaseColor | OnColor<SemanticBaseColor> | OnExtendedColor | CoreThemeColor;

/**
 * Input color map used to seed/generate theme schemes.
 *
 * @remarks
 * Accepts only semantic base color keys (core + augmented via {@link CustomColors}).
 *
 * @category Theme
 */
export type ThemeCustomColors = Partial<Record<SemanticBaseColor, string>>;
