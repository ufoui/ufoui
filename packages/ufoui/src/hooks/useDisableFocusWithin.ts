import { RefObject, useEffect } from 'react';

const focusableSelector =
    'a[href], button, input, select, textarea, iframe, [tabindex], [contenteditable]:not([contenteditable="false"])';

/**
 * Removes every focusable descendant of the given element from the tab order.
 *
 * Blocks keyboard entry only - the subtree stays visible and readable by
 * assistive technology. Elements added later are handled as well. Original
 * `tabindex` values are kept on the nodes and restored on cleanup.
 *
 * @function useDisableFocusWithin
 * @param ref Root element whose descendants are taken out of the tab order
 * @param disabled Enables the behavior
 *
 * @category Hooks
 */
export function useDisableFocusWithin(ref: RefObject<HTMLElement | null>, disabled?: boolean) {
    useEffect(() => {
        if (!disabled || !ref.current) {
            return;
        }

        const root = ref.current;

        const disableFocus = () => {
            root.querySelectorAll<HTMLElement>(focusableSelector).forEach(el => {
                if (!el.hasAttribute('data-uui-tabindex')) {
                    el.setAttribute('data-uui-tabindex', el.getAttribute('tabindex') ?? '');
                    el.setAttribute('tabindex', '-1');
                }
            });
        };

        disableFocus();

        const observer = new MutationObserver(disableFocus);
        observer.observe(root, { childList: true, subtree: true });

        return () => {
            observer.disconnect();

            root.querySelectorAll<HTMLElement>('[data-uui-tabindex]').forEach(el => {
                const prev = el.getAttribute('data-uui-tabindex');
                if (prev) {
                    el.setAttribute('tabindex', prev);
                } else {
                    el.removeAttribute('tabindex');
                }
                el.removeAttribute('data-uui-tabindex');
            });
        };
    }, [ref, disabled]);
}
