import { ToastOptions } from './toast';

export type ToastState = Required<Pick<ToastOptions, 'id'>> &
  Omit<ToastOptions, 'id'>;

export type ToastStoreSubscriber = (toasts: ToastState[]) => void;

let toasts: ToastState[] = [];
let subscribers: ToastStoreSubscriber[] = [];

function notify() {
  const snapshot = [...toasts];
  subscribers.forEach((s) => {
    s(snapshot);
  });
}

export const toastStore = {
  subscribe(subscriber: ToastStoreSubscriber) {
    subscribers.push(subscriber);
    subscriber([...toasts]);

    return () => {
      subscribers = subscribers.filter((s) => s !== subscriber);
    };
  },

  add(toast: ToastState) {
    if (toasts.some((t) => t.id === toast.id)) {
      return;
    }
    toasts = [...toasts, toast];
    notify();
  },

  update(id: string, partial: Partial<ToastOptions>) {
    toasts = toasts.map((t) => (t.id === id ? { ...t, ...partial } : t));
    notify();
  },

  remove(id: string) {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  },

  clear() {
    toasts = [];
    notify();
  },

  getState() {
    return [...toasts];
  },
};
