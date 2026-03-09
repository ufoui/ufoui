import { ReactNode } from 'react';

import { toastStore } from './toastStore';
import { ensureViewport } from './ensureViewport';
import { SurfaceColor } from '../index';

/**
 * Status variant applied to a toast.
 *
 * @category Toast
 */
export type ToastStatus = 'success' | 'error' | 'warning' | 'info';

/**
 * Options used to create or update a toast.
 *
 * @category Toast
 */
export interface ToastOptions {
    /** Optional identifier. Generated automatically if not provided. */
    id?: string;

    /** Primary heading text. */
    title?: string;

    /** Supporting message text. */
    description?: string;

    /** Surface color token overriding background and text colors. */
    color?: SurfaceColor;

    /** Status variant applied as CSS modifier class. */
    status?: ToastStatus;

    /** Leading visual element such as an icon. */
    icon?: ReactNode;

    /** Action element rendered inside the toast. */
    action?: ReactNode | ((id: string) => ReactNode);

    /** Display duration in milliseconds. */
    duration?: number;

    /** Priority toasts appear before normal queued toasts. */
    priority?: boolean;
}

/**
 * Message descriptor used by promise helper.
 *
 * @category Toast
 */
type ToastPromiseMessage<T> = string | ToastOptions | ((v: T) => string | ToastOptions);

/**
 * Resolves toast message descriptor into ToastOptions.
 *
 * @function
 */
function resolveMessage<T>(msg: ToastPromiseMessage<T>, value: T): ToastOptions {
    const result = typeof msg === 'function' ? msg(value) : msg;
    return typeof result === 'string' ? { description: result } : result;
}

/**
 * Creates and displays a toast.
 *
 * @function
 */
function show(input: string | ToastOptions) {
    ensureViewport();

    const options: ToastOptions = typeof input === 'string' ? { description: input } : input;

    const id = options.id ?? crypto.randomUUID();

    toastStore.add({
        priority: false,
        ...options,
        id,
    });

    return id;
}

/**
 * Toast API used to create, update and manage notifications.
 *
 * @category Toast
 */
export const toast = Object.assign(show, {
    /** Updates an existing toast. */
    update: toastStore.update,

    /** Removes a toast by id. */
    dismiss: toastStore.remove,

    /** Removes all toasts. */
    clear: toastStore.clear,

    /** Creates a success toast. */
    success: (description: string, o?: ToastOptions) => show({ ...o, description, status: 'success' }),

    /** Creates an error toast. */
    error: (description: string, o?: ToastOptions) => show({ ...o, description, status: 'error' }),

    /** Creates an informational toast. */
    info: (description: string, o?: ToastOptions) => show({ ...o, description, status: 'info' }),

    /** Creates a warning toast. */
    warning: (description: string, o?: ToastOptions) => show({ ...o, description, status: 'warning' }),

    /**
     * Displays toast lifecycle bound to a promise.
     *
     * Promise toasts use priority so the user immediately
     * sees feedback for the triggered action.
     *
     * @function
     */
    async promise<T>(
        p: Promise<T>,
        m: {
            loading: ToastPromiseMessage<void>;
            success: ToastPromiseMessage<T>;
            error: ToastPromiseMessage<unknown>;
        }
    ): Promise<T> {
        const id = show({
            ...resolveMessage(m.loading, undefined),
            duration: 0,
            priority: true,
        });

        return p.then(
            result => {
                const next = resolveMessage(m.success, result);

                toastStore.update(id, {
                    duration: undefined,
                    ...next,
                });

                return result;
            },
            (error: unknown) => {
                const next = resolveMessage(m.error, error);

                toastStore.update(id, {
                    duration: undefined,
                    ...next,
                });

                throw error;
            }
        );
    },
});
