import type { ReactNode, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

/**
 * Returns the portal host element `#id`, creating it when missing.
 *
 * @remarks
 * If the element is missing, a `div` with the given `id` is appended to `document.body`.
 * The portal mounts **into** that host — `document.body` itself is never used as the
 * direct portal container.
 *
 * @param rootId - `id` of the root node (e.g. `'dialog-root'`).
 *
 * @returns The host element, or `null` when `document` is unavailable (e.g. SSR).
 *
 * @category Utils
 */
export function ensurePortalRoot(rootId: string): HTMLElement | null {
    if (typeof document === 'undefined') {
        return null;
    }
    const existing = document.getElementById(rootId);
    if (existing) {
        return existing;
    }
    const host = document.createElement('div');
    host.id = rootId;
    document.body.appendChild(host);
    return host;
}

/**
 * Renders children into a dedicated portal root, creating that node when absent.
 *
 * @remarks
 * Uses {@link ensurePortalRoot}; returns `null` when the document is not available.
 *
 * @param rootId - `id` of the portal host (e.g. `'dialog-root'`).
 * @param children - Tree to render into the host.
 *
 * @returns A {@link https://react.dev/reference/react-dom/createPortal | React portal}, or `null`.
 *
 * @category Utils
 */
export function renderPortal(rootId: string, children: ReactNode): ReactPortal | null {
    const container = ensurePortalRoot(rootId);
    if (!container) {
        return null;
    }

    return createPortal(children, container);
}
