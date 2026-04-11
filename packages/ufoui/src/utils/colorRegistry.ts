/**
 * Runtime category used by the generated color registry.
 *
 * @category Theme
 */
export type ColorCategory = 'semantic' | 'surface' | 'extended' | 'theme';

/**
 * Metadata entry describing how a color should be used.
 *
 * @category Theme
 */
export interface ColorRegistryEntry {
    type: ColorCategory;
    onColor?: string;
}

/**
 * Global color registry keyed by theme color name.
 *
 * @category Theme
 */
export type ColorRegistry = Record<string, ColorRegistryEntry | undefined>;

let globalColorRegistry: ColorRegistry = {};

/**
 * Replaces the global color registry.
 *
 * @param registry - New registry produced by theme generation.
 * @category Theme
 */
export function setColorRegistry(registry: ColorRegistry): void {
    globalColorRegistry = registry;
}

/**
 * Returns the current global color registry.
 *
 * @returns The last registry set by theme generation.
 * @category Theme
 */
export function getColorRegistry(): ColorRegistry {
    return globalColorRegistry;
}

/**
 * Resolves the paired contrast color from the global color registry.
 *
 * @param colorName - Base color name from the registry.
 * @returns Linked `onColor` value if present.
 * @category Theme
 */
export function getOnColorName(colorName: string): string | undefined {
    return globalColorRegistry[colorName]?.onColor;
}
