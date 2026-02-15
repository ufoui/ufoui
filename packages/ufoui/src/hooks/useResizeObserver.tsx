import { RefObject, useEffect } from 'react';

/**
 * Size information reported by ResizeObserver.
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
 * and invokes a callback when its content box size changes.
 *
 * Does not trigger component re-render.
 *
 * @function
 * @param ref Reference to the observed HTMLElement.
 * @param onResize Called when size changes.
 * @param enabled Enables or disables observation. Default: true.
 *
 * @category Hooks
 */
export function useResizeObserver<T extends HTMLElement>(
  ref: RefObject<T>,
  onResize: (size: ObservedElementSize) => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const el = ref.current;
    if (!el) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      onResize({ width, height });
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [ref, onResize, enabled]);
}
