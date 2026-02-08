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
export interface ThemeScheme {
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
  /** Foreground color displayed on black (typically white). */
  onBlack: string;
  /** Pure white color used for contrast or foreground. */
  white: string;
  /** Foreground color displayed on white (typically black). */
  onWhite: string;

  /** Allows for additional custom tokens. */
  [key: string]: string;
}

/**
 * A partial version of {@link ThemeScheme}, used for theme overrides
 * or gradual, progressive theming updates.
 *
 * @remarks
 * Useful when defining incomplete color sets (e.g. custom brand palettes).
 *
 * @category Theme
 */
export type PartialThemeScheme = Partial<ThemeScheme>;

/**
 * Collection of named color schemes (e.g. light, dark, high-contrast).
 * Used to organize multiple theme modes within a design system.
 *
 * @category Theme
 */
export interface ThemeSchemes {
  /** Light mode color scheme. */
  light: PartialThemeScheme;

  /** Dark mode color scheme. */
  dark: PartialThemeScheme;

  /** Additional custom schemes such as high-contrast or sepia. */
  [key: string]: PartialThemeScheme;
}

/**
 * Partial variant of {@link ThemeSchemes}, allowing selective definition
 * of available color modes.
 *
 * @category Theme
 */
export type PartialThemeSchemes = Partial<ThemeSchemes>;

/**
 * Defines the overall theme configuration, including
 * the active mode and all available color schemes.
 *
 * @category Theme
 */
export interface Theme {
  /** Indicates whether dark mode is currently active. */
  darkMode: boolean;

  /** Collection of all available color schemes. */
  schemes: ThemeSchemes;
}

/**
 * Core subset of theme colors representing primary semantic intents
 * (e.g., primary, error, success).
 * Commonly referenced across UI components.
 *
 * Serves as the base for {@link SemanticColor} and {@link ThemeSchemeKeys}.
 *
 * @category Theme
 */
export const ThemeSemanticColorKeys = [
  'primary',
  'secondary',
  'tertiary',
  'warning',
  'info',
  'success',
  'error',
] as const satisfies readonly (keyof ThemeScheme)[];

/**
 * Extended set of semantic theme colors.
 * @category Theme
 */
export const ThemeExtendedColorKeys = [
  ...ThemeSemanticColorKeys,
  'primaryContainer',
  'primaryFixed',
  'primaryFixedDim',

  'secondaryContainer',
  'secondaryFixed',
  'secondaryFixedDim',

  'tertiaryContainer',
  'tertiaryFixed',
  'tertiaryFixedDim',

  'warningContainer',
  'warningFixed',
  'warningFixedDim',

  'infoContainer',
  'infoFixed',
  'infoFixedDim',

  'successContainer',
  'successFixed',
  'successFixedDim',

  'errorContainer',
  'errorFixed',
  'errorFixedDim',

  'black',
  'white',
] as const satisfies readonly (keyof ThemeScheme)[];

/**
 * Surface-level theme colors including extended and neutral tones.
 * @category Theme
 */
export const ThemeSurfaceColorKeys = [
  ...ThemeExtendedColorKeys,
  'outline',
  'outlineVariant',
  'surface',
  'surfaceVariant',

  'background',

  'inverseSurface',
  'inversePrimary',

  'surfaceContainerHighest',
  'surfaceContainerHigh',
  'surfaceContainer',
  'surfaceContainerLow',
  'surfaceContainerLowest',
  'surfaceBright',
  'surfaceDim',
] as const satisfies readonly (keyof ThemeScheme)[];

/**
 * Complete set of color tokens defined in {@link ThemeScheme}.
 * Combines all semantic, extended, and surface color roles for full theme coverage.
 * @category Theme
 */
export const ThemeSchemeKeys = [
  ...ThemeSurfaceColorKeys,
  'onPrimary',
  'onPrimaryContainer',
  'onPrimaryFixed',
  'onPrimaryFixedVariant',

  'onSecondary',
  'onSecondaryContainer',
  'onSecondaryFixed',
  'onSecondaryFixedVariant',

  'onTertiary',
  'onTertiaryContainer',
  'onTertiaryFixed',
  'onTertiaryFixedVariant',

  'onWarning',
  'onWarningContainer',
  'onWarningFixed',
  'onWarningFixedVariant',

  'onInfo',
  'onInfoContainer',
  'onInfoFixed',
  'onInfoFixedVariant',

  'onSuccess',
  'onSuccessContainer',
  'onSuccessFixed',
  'onSuccessFixedVariant',

  'onError',
  'onErrorContainer',
  'onErrorFixed',
  'onErrorFixedVariant',

  'onSurface',
  'onSurfaceVariant',

  'onBackground',

  'inverseOnSurface',
  'inversePrimary',
  'shadow',
  'surfaceTint',

  'scrim',
] as const satisfies readonly (keyof ThemeScheme)[];
