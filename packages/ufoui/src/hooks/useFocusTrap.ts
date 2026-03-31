import { RefObject, useEffect, useRef } from 'react';

const trapStack: HTMLElement[] = [];

/**
 * Options for the useFocusTrap hook.
 *
 * @category Hooks
 */
export interface UseFocusTrapOptions {
    /** Root element used as focus boundary. */
    ref: RefObject<HTMLElement | null>;

    /** Enables or disables the focus trap. */
    enabled?: boolean;

    /** Moves focus inside on mount when not already inside. */
    autoFocus?: boolean;
}

/**
 * Focus trap for modal containers.
 *
 * Keeps keyboard focus inside the given element.
 * Handles Tab loop and restores focus on unmount.
 * Also redirects focus back when returning from outside the document.
 *
 * Behavior:
 * - traps Tab navigation within the root element
 * - moves focus to element with data-autofocus or first focusable on mount
 * - restores previous focus on cleanup
 *
 * @function
 * @param options
 *
 * @category Hooks
 */
export const useFocusTrap = ({ ref, enabled, autoFocus = true }: UseFocusTrapOptions) => {
    const lastFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!enabled || !ref.current) {
            return;
        }

        const root = ref.current;
        lastFocusedElement.current = document.activeElement as HTMLElement;
        trapStack.push(root);

        const getFocusable = () => {
            return Array.from(
                root.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
            ).filter(el => !el.hasAttribute('disabled') && el.getClientRects().length > 0);
        };

        if (autoFocus && !root.contains(document.activeElement)) {
            const focusables = getFocusable();
            const target =
                focusables.find(el => el.hasAttribute('data-autofocus')) ??
                (focusables[0] as HTMLElement | undefined) ??
                root;

            target.focus();
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || trapStack[trapStack.length - 1] !== root) {
                return;
            }

            const items = getFocusable();
            if (items.length === 0) {
                e.preventDefault();
                return;
            }

            // eslint-disable-next-line prefer-destructuring
            const first = items[0];
            const last = items[items.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        const handleFocusIn = (e: FocusEvent) => {
            const target = e.target as HTMLElement;

            if (!root.contains(target)) {
                if (trapStack[trapStack.length - 1] !== root) {
                    return;
                }

                const items = getFocusable();
                const next = items[0] ?? root;

                if (next !== target) {
                    next.focus({ preventScroll: true });
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('focusin', handleFocusIn);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('focusin', handleFocusIn);

            const idx = trapStack.lastIndexOf(root);
            if (idx !== -1) {
                trapStack.splice(idx, 1);
            }

            const prev = lastFocusedElement.current;
            if (prev && document.contains(prev)) {
                setTimeout(() => {
                    prev.focus({ preventScroll: true });
                }, 0);
            }
        };
    }, [enabled, ref, autoFocus]);
};
