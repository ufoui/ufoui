import React, { RefObject, useEffect } from 'react';

type ClickOutsideTargets = Array<React.RefObject<HTMLElement>> | string;

/**
 * Registers a global click listener and fires a callback when the user
 * clicks *outside* the specified targets.
 *
 * Supported modes:
 * - **Ref array:** multiple elements treated as “inside”
 * - **CSS selector:** e.g. `[data-menu-group="menu_123"]`
 *
 * Additional option:
 * - **extraRef:** a single additional element treated as inside
 *   (useful for anchor buttons that open menus)
 *
 * @param active - Enables or disables the listener
 * @param targets - Array of refs **or** a CSS selector string
 * @param onOutside - Called when the click occurs outside all targets
 * @param extraRef - Optional extra element treated as inside
 *
 * @example
 * // Mode A: array of refs
 * useClickOutside(open, [menuRef, contentRef], onClose);
 *
 * @example
 * // Mode B: CSS selector
 * useClickOutside(open, `[data-menu-group="${groupId}"]`, onClose);
 *
 * @example
 * // With extraRef (e.g., anchor button)
 * useClickOutside(open, `[data-menu-group="${groupId}"]`, onClose, anchorRef);
 *
 * @category Hooks
 *
 */
export function useClickOutside(
    active: boolean,
    targets: ClickOutsideTargets,
    onOutside: () => void,
    extraRef?: RefObject<HTMLElement> | null
): void {
    useEffect(() => {
        if (!active) {
            return;
        }

        const handler = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            // Mode A: array of refs
            if (Array.isArray(targets)) {
                const insideTargets = targets.some(ref => ref.current?.contains(el));
                const insideExtra = extraRef?.current?.contains(el) ?? false;
                if (!insideTargets && !insideExtra) {
                    onOutside();
                }
                return;
            }

            // Mode B: CSS selector
            const insideSelector = !!el.closest(targets);
            const insideExtra = extraRef?.current?.contains(el) ?? false;

            if (!insideSelector && !insideExtra) {
                onOutside();
            }
        };

        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [active, targets, onOutside, extraRef]);
}
