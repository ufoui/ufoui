import React, { useCallback } from 'react';

/**
 * Configuration for slider keyboard navigation.
 *
 * @category Hooks
 */
export interface UseSliderKeysOptions {
    /** Current value. */
    value: number;
    /** Minimum value. */
    min: number;
    /** Maximum value. */
    max: number;
    /** Step applied by arrow keys. */
    step: number;
    /** Disables interaction. */
    disabled?: boolean;
    /** Prevents value changes. */
    readOnly?: boolean;
    /** Called when value changes. */
    onChange: (value: number) => void;
}

/**
 * Provides keyboard navigation for slider-like controls.
 *
 * Supports Arrow, Home and End keys to change the value.
 *
 * @param options Slider keyboard configuration.
 *
 * @returns Object containing onKeyDown handler.
 *
 * @example
 * const keys = useSliderKeys({ value, min: 0, max: 5, step: 0.5, onChange });
 *
 * <div role="slider" onKeyDown={keys.onKeyDown} />
 *
 * @category Hooks
 */
export function useSliderKeys({ value, min, max, step, disabled, readOnly, onChange }: UseSliderKeysOptions) {
    const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLElement>) => {
            if (disabled || readOnly) {
                return;
            }
            let next;
            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowUp':
                    e.preventDefault();
                    next = Math.min(value + step, max);
                    break;

                case 'ArrowLeft':
                case 'ArrowDown':
                    e.preventDefault();
                    next = Math.max(value - step, min);
                    break;

                case 'Home':
                    e.preventDefault();
                    next = min;
                    break;

                case 'End':
                    e.preventDefault();
                    next = max;
                    break;

                default:
                    return;
            }

            onChange(next);
        },
        [value, min, max, step, disabled, readOnly, onChange]
    );

    return { onKeyDown };
}
