import { FocusEventHandler, useState } from 'react';

import { ensureInputMethod, getInputMethod } from '../utils';

/**
 * Tracks focus state and determines whether focus indicators
 * should be visibly rendered.
 *
 * Automatically merges external focus handlers.
 *
 * @function useFocusVisible
 * @param onFocus External onFocus handler
 * @param onBlur External onBlur handler
 * @returns Object containing focus flags and merged handlers
 *
 * @category Hooks
 */
export function useFocusVisible(onFocus?: FocusEventHandler<HTMLElement>, onBlur?: FocusEventHandler<HTMLElement>) {
    ensureInputMethod();

    const [isFocused, setIsFocused] = useState(false);
    const focusVisible = getInputMethod() === 'keyboard';

    const handleFocus: FocusEventHandler<HTMLElement> = e => {
        console.log('onFocus', e.currentTarget.className.slice(0, 10), e.relatedTarget?.className.slice(0, 10));
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur: FocusEventHandler<HTMLElement> = e => {
        console.log('onBlur', e.currentTarget.className.slice(0, 10), e.relatedTarget?.className.slice(0, 10));
        setIsFocused(false);
        onBlur?.(e);
    };

    return {
        focusVisible,
        isFocused,
        focusHandlers: {
            onFocus: handleFocus,
            onBlur: handleBlur,
        },
    };
}
