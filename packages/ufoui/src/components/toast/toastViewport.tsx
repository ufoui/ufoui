import React, { useEffect, useState } from 'react';

import { ToastState, toastStore } from '../../utils/toasts/toastStore';
import { Toast } from './toast';

export type ToastPosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';

/**
 * Props for ToastViewport component.
 *
 * @category Toast
 */
export interface ToastViewportProps {
    /** Position of the toast stack. Default: bottomRight */
    position?: ToastPosition;

    /** Default auto-dismiss duration in milliseconds. Default: 4000 */
    duration?: number;

    /** Maximum number of visible toasts. Default: 3 */
    limit?: number;
}

const POSITION: Record<ToastPosition, React.CSSProperties> = {
    topLeft: { top: 16, left: 16 },
    topCenter: { top: 16, left: '50%', transform: 'translateX(-50%)' },
    topRight: { top: 16, right: 16 },

    bottomLeft: { bottom: 16, left: 16 },
    bottomCenter: { bottom: 16, left: '50%', transform: 'translateX(-50%)' },
    bottomRight: { bottom: 16, right: 16 },
};

/**
 * Global container responsible for rendering and managing toast notifications.
 *
 * @function
 * @param props Component props.
 *
 * @category Toast
 */
export const ToastViewport = ({ position = 'bottomRight', duration = 4000, limit = 3 }: ToastViewportProps) => {
    const [toasts, setToasts] = useState<ToastState[]>([]);

    useEffect(() => toastStore.subscribe(setToasts), []);

    const positionStyles = POSITION[position];
    const visibleToasts = limit > 0 ? toasts.slice(0, limit) : toasts;

    return (
        <div className="uui-toast-viewport" style={positionStyles}>
            {visibleToasts.map(t => {
                const { priority, ...toastProps } = t;

                const action =
                    typeof toastProps.action === 'function' ? toastProps.action(toastProps.id) : toastProps.action;

                return (
                    <Toast
                        key={toastProps.id}
                        {...toastProps}
                        action={action}
                        duration={toastProps.duration ?? duration}
                    />
                );
            })}
        </div>
    );
};
