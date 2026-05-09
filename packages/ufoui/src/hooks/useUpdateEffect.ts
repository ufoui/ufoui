import { DependencyList, useEffect, useRef } from 'react';

/**
 * Like `useEffect`, but skips the callback until the component is considered initialized.
 *
 * On every run the effect checks `initialized`:
 * - If not yet initialized and `active` is `true`, marks as initialized and returns without calling the callback.
 * - If already initialized, calls the callback normally.
 *
 * @param effect Callback to run after initialization when deps change.
 * @param deps Dependency list — same semantics as `useEffect`.
 * @param active When `true` the hook considers itself initialized on the next run. Defaults to `true`,
 *               which means initialization happens after the first React render (equivalent to skipping mount).
 *               Pass a derived boolean (e.g. `size !== undefined`) to delay initialization until
 *               an external condition is met.
 *
 * @example
 * // Skip on React mount only
 * useUpdateEffect(() => { animate(open ? 'open' : 'closed'); }, [open]);
 *
 * @example
 * // Skip until ResizeObserver has measured
 * useUpdateEffect(() => { animate(open ? 'open' : 'closed'); }, [open], size !== undefined);
 *
 * @category Hooks
 */
export function useUpdateEffect(
    effect: () => void | (() => void),
    deps: DependencyList,
    active = true
) {
    const initialized = useRef(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!initialized.current) {
            if (active) {
                initialized.current = true;
            }
            return;
        }
        return effect();
    }, [...deps, active]);
}
