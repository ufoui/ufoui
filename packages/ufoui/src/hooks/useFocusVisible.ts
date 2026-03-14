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
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur: FocusEventHandler<HTMLElement> = e => {
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
