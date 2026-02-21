import React, { useEffect, useState } from 'react';

import { ToastState, toastStore } from '../../utils/toasts/toastStore';
import { BoxBase } from '../base';
import { Toast } from './toast';
import { TOAST_VIEWPORT_ID } from '../../utils/toasts/ensureViewport';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

export interface ToastViewportProps {
  position?: ToastPosition;
  gap?: number;
}

export const ToastViewport = ({
  position = 'bottom-right',
  gap = 12,
}: ToastViewportProps) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  useEffect(() => {
    return toastStore.subscribe(setToasts);
  }, []);

  const positionStyles = getPositionStyle(position);

  return (
    <BoxBase
      className="uui-toast-viewport"
      id={TOAST_VIEWPORT_ID}
      position="fixed"
      style={{
        ...positionStyles,
        flexDirection: 'column',
        gap,
        zIndex: 1000,
      }}
    >
      {toasts.map((t) => {
        const action =
          typeof t.action === 'function' ? t.action(t.id) : t.action;

        return <Toast key={t.id} {...t} action={action} />;
      })}
    </BoxBase>
  );
};

function getPositionStyle(position: ToastPosition) {
  switch (position) {
    case 'top-right':
      return { top: 16, right: 16 };
    case 'top-left':
      return { top: 16, left: 16 };
    case 'bottom-right':
      return { bottom: 16, right: 16 };
    case 'bottom-left':
      return { bottom: 16, left: 16 };
  }
}
