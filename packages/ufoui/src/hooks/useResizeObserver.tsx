import { RefObject, useEffect } from 'react';

/**
 * Size information reported by ResizeObserver (CSS pixels).
 *
 * @category Hooks
 */
export interface ObservedElementSize {
    /** Element width in pixels. */
    width: number;

    /** Element height in pixels. */
    height: number;
}

/**
 * Observes a single DOM element using ResizeObserver
 * and invokes a callback when its size changes.
 *
 * Uses the content box by default, or the border box when `borderBox` is true
 * (includes padding and border; excludes margin).
 *
 * Does not trigger component re-render.
 *
 * @function
 * @param ref Reference to the observed HTMLElement.
 * @param onResize Called when size changes.
 * @param enabled Enables or disables observation. Default: true.
 * @param borderBox When true, report border box size; when false, content box. Default: false.
 *
 * @category Hooks
 */
export function useResizeObserver<T extends HTMLElement>(
    ref: RefObject<T>,
    onResize: (size: ObservedElementSize) => void,
    enabled = true,
    borderBox = false
): void {
    useEffect(() => {
        if (!enabled) {
            return;
        }

        const el = ref.current;
        if (!el) {
            return;
        }

        const box: ResizeObserverBoxOptions = borderBox ? 'border-box' : 'content-box';

        const observer = new ResizeObserver(([entry]) => {
            let width: number;
            let height: number;

            if (borderBox) {
                if (entry.borderBoxSize.length > 0) {
                    [{ inlineSize: width, blockSize: height }] = entry.borderBoxSize;
                } else {
                    ({ width, height } = entry.target.getBoundingClientRect());
                }
            } else if (entry.contentBoxSize.length > 0) {
                [{ inlineSize: width, blockSize: height }] = entry.contentBoxSize;
            } else {
                ({ width, height } = entry.contentRect);
            }

            onResize({ width, height });
        });

        observer.observe(el, { box });

        return () => {
            observer.disconnect();
        };
    }, [ref, onResize, enabled, borderBox]);
}
