import React, { useCallback, useRef } from 'react';

/**
 * Defines the directional axis used for keyboard focus navigation.
 *
 * @category Hooks
 */
export type FocusOrientation = 'vertical' | 'horizontal';

/**
 * Moves DOM focus between registered elements of a group.
 *
 * Enables Arrow, Home, and End key navigation across registered items
 * using vertical or horizontal orientation. Skips disabled items and
 * follows the real DOM order.
 *
 * @remarks
 * Does not manage `tabIndex` — the consuming component owns it.
 *
 * @param orientation Navigation direction. Default: 'vertical'.
 * @param loop Whether focus should wrap around. Default: true.
 *
 * @returns Object containing register, unregister, and onKeyDown handlers.
 *
 * @example
 * const nav = useFocusNavigation('vertical');
 *
 * <button ref={nav.register} onKeyDown={nav.onKeyDown} />
 *
 * @category Hooks
 */
export function useFocusNavigation(orientation: FocusOrientation = 'vertical', loop = true) {
    const itemsRef = useRef<HTMLElement[]>([]);

    const register = useCallback((el: HTMLElement | null) => {
        if (!el) {
            return;
        }
        if (!itemsRef.current.includes(el)) {
            itemsRef.current.push(el);
        }
    }, []);

    const unregister = useCallback((el: HTMLElement | null) => {
        if (!el) {
            return;
        }
        itemsRef.current = itemsRef.current.filter(i => i !== el);
    }, []);

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLElement>) => {
            const isVertical = orientation === 'vertical';
            const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
            const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

            if (![nextKey, prevKey, 'Home', 'End'].includes(e.key)) {
                return;
            }

            e.preventDefault();

            // Always compute real DOM order (reorder-safe)
            const ordered = [...itemsRef.current].sort((a, b) => {
                if (a === b) {
                    return 0;
                }

                const pos = a.compareDocumentPosition(b);

                if (pos & Node.DOCUMENT_POSITION_FOLLOWING) {
                    return -1;
                }
                if (pos & Node.DOCUMENT_POSITION_PRECEDING) {
                    return 1;
                }

                return 0;
            });

            const enabled = ordered.filter(el => {
                const isDisabled =
                    ('disabled' in el && (el as HTMLButtonElement).disabled) ||
                    el.getAttribute('aria-disabled') === 'true';

                return !isDisabled;
            });

            if (enabled.length === 0) {
                return;
            }

            const index = enabled.indexOf(e.currentTarget);
            if (index === -1) {
                return;
            }

            if (e.key === 'Home') {
                enabled[0].focus();
                return;
            }

            if (e.key === 'End') {
                enabled[enabled.length - 1].focus();
                return;
            }

            const delta = e.key === nextKey ? 1 : -1;

            const nextIndex = loop ? (index + delta + enabled.length) % enabled.length : index + delta;

            const target = enabled.at(nextIndex);
            if (target) {
                target.focus();
            }
        },
        [orientation, loop]
    );

    return { register, unregister, onKeyDown };
}
