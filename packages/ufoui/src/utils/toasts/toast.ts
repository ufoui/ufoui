import { ReactNode } from 'react';

import { toastStore } from './toastStore';
import { ensureViewport } from './ensureViewport';
import { SurfaceColor } from '../index';

export type ToastStatus = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  color?: SurfaceColor;
  status?: ToastStatus;
  icon?: ReactNode;
  action?: ReactNode | ((id: string) => ReactNode);
  duration?: number;
}

const resolve = <V>(msg: string | ((v: V) => string), v: V) =>
  typeof msg === 'function' ? msg(v) : msg;

function show(input: string | ToastOptions) {
  ensureViewport();
  const options = typeof input === 'string' ? { description: input } : input;

  const id = options.id ?? crypto.randomUUID();
  toastStore.add({ ...options, id });
  return id;
}

export const toast = Object.assign(show, {
  update: toastStore.update,
  dismiss: toastStore.remove,
  clear: toastStore.clear,

  success: (description: string, o?: ToastOptions) =>
    show({ ...o, description, status: 'success' }),

  error: (description: string, o?: ToastOptions) =>
    show({ ...o, description, status: 'error' }),

  info: (description: string, o?: ToastOptions) =>
    show({ ...o, description, status: 'info' }),

  warning: (description: string, o?: ToastOptions) =>
    show({ ...o, description, status: 'warning' }),

  async promise<T>(
    p: Promise<T>,
    m: {
      loading: string;
      success: string | ((v: T) => string);
      error: string | ((e: unknown) => string);
    },
  ): Promise<T> {
    const id = show({ description: m.loading, duration: 0 });

    return p.then(
      (r) => {
        toastStore.update(id, {
          description: resolve(m.success, r),
        });
        return r;
      },
      (e: unknown) => {
        toastStore.update(id, {
          description: resolve(m.error, e),
        });
        throw e;
      },
    );
  },
});
