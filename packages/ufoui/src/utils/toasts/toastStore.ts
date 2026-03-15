import { ToastOptions } from './toast';

/**
 * Internal toast state stored in the toast store.
 *
 * @category Toast
 */
export type ToastState = Required<Pick<ToastOptions, 'id'>> & Omit<ToastOptions, 'id'>;

/**
 * Partial update object used when modifying a toast.
 *
 * @category Toast
 */
export type ToastUpdate = Partial<Omit<ToastOptions, 'id'>>;

/**
 * Subscriber function receiving current toast list.
 *
 * @category Toast
 */
export type ToastStoreSubscriber = (toasts: ToastState[]) => void;

let toasts: ToastState[] = [];
let subscribers: ToastStoreSubscriber[] = [];

/**
 * Notifies all subscribers about toast state change.
 *
 * @function
 */
function notify() {
    const snapshot = [...toasts];
    [...subscribers].forEach(s => {
        s(snapshot);
    });
}

/**
 * Internal store managing toast lifecycle and subscriptions.
 *
 * @category Toast
 */
export const toastStore = {
    /**
     * Subscribes to toast state updates.
     *
     * @function
     */
    subscribe(subscriber: ToastStoreSubscriber) {
        subscribers.push(subscriber);
        subscriber([...toasts]);

        return () => {
            subscribers = subscribers.filter(s => s !== subscriber);
        };
    },

    /**
     * Adds a new toast to the store.
     *
     * Priority toasts are inserted at the beginning
     * so they appear before normal queued toasts.
     *
     * @function
     */
    add(toast: ToastState) {
        if (toasts.some(t => t.id === toast.id)) {
            return;
        }

        // toasts = toast.priority ? [toast, ...toasts] : [...toasts, toast];
        toasts = [...toasts, toast];
        notify();
    },

    /**
     * Updates an existing toast.
     *
     * @function
     */
    update(id: string, partial: ToastUpdate) {
        const index = toasts.findIndex(t => t.id === id);
        if (index === -1) {
            return;
        }

        const next = [...toasts];
        next[index] = { ...next[index], ...partial };

        toasts = next;
        notify();
    },

    /**
     * Removes a toast from the store.
     *
     * @function
     */
    remove(id: string) {
        const next = toasts.filter(t => t.id !== id);

        if (next.length === toasts.length) {
            return;
        }

        toasts = next;
        notify();
    },

    /**
     * Removes all toasts.
     *
     * @function
     */
    clear() {
        if (toasts.length === 0) {
            return;
        }

        toasts = [];
        notify();
    },

    /**
     * Returns current toast list snapshot.
     *
     * @function
     */
    getState() {
        return [...toasts];
    },
};
