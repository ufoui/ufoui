/**
 * Subscribes to the global `Escape` key press and triggers a callback.
 *
 * Maintains an internal priority stack so that only the most recently
 * registered (topmost) handler fires — nested dialogs or menus won't
 * accidentally close their parents when Escape is pressed.
 *
 * Use when a component (Menu, Dialog, etc.) should close
 * or perform an action when the user presses ESC.
 *
 * @param active - Enables or disables the listener.
 *                 If false, no events are handled.
 * @param onEscape - Callback fired when the Escape key is pressed.
 *
 * @example
 * useEscapeHandler(open, () => onClose());
 *
 * @category Hooks
 */
import { useEffect, useRef } from 'react';

const stack: Array<() => void> = [];

const globalKeyHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && stack.length > 0) {
        e.preventDefault();
        stack[stack.length - 1]();
    }
};

export function useEscapeHandler(active: boolean, onEscape: () => void) {
    const onEscapeRef = useRef(onEscape);
    onEscapeRef.current = onEscape;

    useEffect(() => {
        if (!active) {
            return;
        }

        const handler = () => {
            onEscapeRef.current();
        };

        stack.push(handler);
        if (stack.length === 1) {
            document.addEventListener('keydown', globalKeyHandler);
        }

        return () => {
            const idx = stack.lastIndexOf(handler);
            if (idx !== -1) {
                stack.splice(idx, 1);
            }
            if (stack.length === 0) {
                document.removeEventListener('keydown', globalKeyHandler);
            }
        };
    }, [active]);
}
