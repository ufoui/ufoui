import React, { useCallback, useRef } from 'react';

/**
 * Defines the directional axis used for keyboard focus navigation.
 *
 * @category Hooks
 */
export type FocusOrientation = 'vertical' | 'horizontal';

/**
 * Options for the useFocusNavigation hook.
 *
 * @category Hooks
 */
export interface UseFocusNavigationOptions {
    /** Whether focus should wrap around. Default: true. */
    loop?: boolean;

    /** Keeps a single item in the Tab order and moves it with focus. Default: false. */
    roving?: boolean;
}

// Registered items in real DOM order (reorder-safe), without disabled and collapsed (`inert`) ones
const getEnabled = (items: HTMLElement[]) =>
    [...items]
        .sort((a, b) => {
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
        })
        .filter(el => !el.matches(':disabled, [aria-disabled="true"], [inert], [inert] *'));

/**
 * Moves DOM focus between registered elements of a group.
 *
 * Enables Arrow, Home, and End key navigation across registered items
 * using vertical or horizontal orientation. Skips disabled items and items
 * inside a collapsed (`inert`) region, and follows the real DOM order.
 *
 * @remarks
 * Manages `tabIndex` only with `roving` - the item in the Tab order is the last focused one,
 * else the selected one, else the first. Otherwise the consuming component owns it.
 *
 * @param orientation Navigation direction. Default: 'vertical'.
 * @param options Navigation options.
 *
 * @returns Object containing register, unregister, onKeyDown, and onFocus handlers.
 *
 * @example
 * const nav = useFocusNavigation('vertical');
 *
 * <button ref={nav.register} onKeyDown={nav.onKeyDown} />
 *
 * @category Hooks
 */
export function useFocusNavigation(
    orientation: FocusOrientation = 'vertical',
    { loop = true, roving = false }: UseFocusNavigationOptions = {}
) {
    const itemsRef = useRef<HTMLElement[]>([]);
    const syncPendingRef = useRef(false);

    // Batches all (re)registrations of one commit into a single Tab stop update
    const syncTabStop = useCallback(() => {
        if (syncPendingRef.current) {
            return;
        }
        syncPendingRef.current = true;
        queueMicrotask(() => {
            syncPendingRef.current = false;
            const enabled = getEnabled(itemsRef.current);
            const target =
                enabled.find(el => el.tabIndex === 0) ??
                enabled.find(el => el.getAttribute('aria-selected') === 'true') ??
                enabled[0];
            for (const el of itemsRef.current) {
                el.tabIndex = el === target ? 0 : -1;
            }
        });
    }, []);

    const register = useCallback(
        (el: HTMLElement | null) => {
            if (!el) {
                return;
            }
            if (!itemsRef.current.includes(el)) {
                itemsRef.current.push(el);
            }
            if (roving) {
                syncTabStop();
            }
        },
        [roving, syncTabStop]
    );

    const unregister = useCallback(
        (el: HTMLElement | null) => {
            if (!el) {
                return;
            }
            itemsRef.current = itemsRef.current.filter(i => i !== el);
            if (roving) {
                syncTabStop();
            }
        },
        [roving, syncTabStop]
    );

    const onFocus = useCallback(
        (e: React.FocusEvent<HTMLElement>) => {
            if (!roving) {
                return;
            }
            for (const el of itemsRef.current) {
                el.tabIndex = el === e.currentTarget ? 0 : -1;
            }
        },
        [roving]
    );

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLElement>) => {
            const isVertical = orientation === 'vertical';
            const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
            const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

            if (![nextKey, prevKey, 'Home', 'End'].includes(e.key)) {
                return;
            }

            e.preventDefault();

            const enabled = getEnabled(itemsRef.current);

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

            const nextIndex = loop
                ? (index + delta + enabled.length) % enabled.length
                : Math.min(Math.max(index + delta, 0), enabled.length - 1);

            const target = enabled[nextIndex];
            target.focus({ preventScroll: true });
            target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        },
        [orientation, loop]
    );

    return { register, unregister, onKeyDown, onFocus };
}
