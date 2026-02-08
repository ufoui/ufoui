/**
 * Subscribes to the global `Escape` key press and triggers a callback.
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
import { useEffect } from 'react';

export function useEscapeHandler(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) {
      return;
    }

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape();
      }
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [active, onEscape]);
}
