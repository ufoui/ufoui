import { useEffect, useState } from 'react';

import { useFocusVisible } from './useFocusVisible';

/**
 * Tracks focus state for a DOM element.
 *
 * Provides technical focus state and visual focus visibility.
 * Designed for components that need focus styling without
 * interfering with user-provided focus handlers.
 *
 * @param ref Reference to the target DOM element.
 * @returns Object containing focus state flags.
 *
 * @category Hooks
 */
export function useFocusState<T extends HTMLElement>(ref: React.RefObject<T>) {
    const focusVisible = useFocusVisible();
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        const onFocus = () => {
            setIsFocused(true);
        };
        const onBlur = () => {
            setIsFocused(false);
        };

        el.addEventListener('focus', onFocus, true);
        el.addEventListener('blur', onBlur, true);

        return () => {
            el.removeEventListener('focus', onFocus, true);
            el.removeEventListener('blur', onBlur, true);
        };
    }, [ref]);

    return {
        isFocused,
        focusVisible,
    };
}
