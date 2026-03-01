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
        console.log('onFocus');
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur: FocusEventHandler<HTMLElement> = e => {
        console.log('onBlur');
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
// import { useSyncExternalStore } from 'react';
//
// import { ensureInputMethod, getInputMethod } from '../utils';
//
// /**
//  * Determines whether focus indicators (focus rings) should be visible.
//  *
//  * Returns `true` when the user is navigating with the keyboard and `false`
//  * for pointer-based interactions (mouse, touch, pen).
//  *
//  * Internally tracks global interaction modality and mirrors the behavior
//  * of the `:focus-visible` specification.
//  *
//  * @returns `true` if focus should be visibly rendered
//  *
//  * @example
//  * const focusVisible = useFocusVisible();
//  *
//  * @example
//  * <button className={focusVisible ? 'uui-focus-visible' : undefined} />
//  *
//  * @category Hooks
//  */
//
// export function useFocusVisible(): boolean {
//     ensureInputMethod();
//
//     return useSyncExternalStore(
//         () => () => undefined,
//         () => getInputMethod() === 'keyboard',
//         () => false
//     );
// }
