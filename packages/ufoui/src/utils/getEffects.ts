import {
    ElementFocusEffect,
    ElementHoverEffect,
    ElementPressedEffect,
    ElementSelectedEffect,
    ElementTouchEffect,
} from './utils';

/**
 * Visual effect configuration.
 *
 * Groups all interaction effects of an element by state.
 * Each axis is optional and overrides the component default independently.
 *
 * @category Utils
 */
export interface EffectConfig {
    /** Effects applied while the element is focused. */
    focus?: ElementFocusEffect[];

    /** Effects applied while the element is hovered. */
    hover?: ElementHoverEffect[];

    /** Effects applied while the element is pressed. */
    pressed?: ElementPressedEffect[];

    /** Effects applied while the element is selected. */
    selected?: ElementSelectedEffect[];

    /** Effects applied on touch and click. */
    touch?: ElementTouchEffect[];
}

/**
 * Effect value.
 *
 * Can be provided as a full {@link EffectConfig} object
 * or as `'none'` to disable all interaction effects.
 *
 * @category Utils
 */
export type ElementEffects = 'none' | EffectConfig;

/**
 * Merges an effect value with component defaults.
 *
 * Merge is per axis: axes left out of the input keep their default.
 * `'none'` disables every effect.
 *
 * @function
 * @param effects Effect value as config object or `'none'`.
 * @param defaults Default effect configuration.
 * @returns Resolved effect configuration.
 *
 * @category Utils
 */
export function getEffects(effects?: ElementEffects, defaults: EffectConfig = {}): EffectConfig {
    return effects === 'none' ? {} : { ...defaults, ...effects };
}
