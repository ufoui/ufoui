/**
 * Runtime color type used by the generated color registry.
 *
 * @category Theme
 */
export type ColorType = 'semantic' | 'surface' | 'extended' | 'base' | 'border' | 'theme';

/**
 * Metadata entry describing how a color name should be used.
 *
 * @category Theme
 */
export interface ColorRegistryEntry {
    /** Usage type assigned to the color name. */
    type: ColorType;
    /** Paired contrast color name (e.g. `primary` -> `onPrimary`). */
    onColor?: string;
}

/**
 * Global color registry keyed by theme color names.
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
