import React, { useEffect, useState } from 'react';

import { ToastState, toastStore } from '../../utils/toasts/toastStore';
import { Toast } from './toast';

export type ToastPosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';

export interface ToastViewportProps {
    position?: ToastPosition;
    timeout?: number;
    limit?: number;
}

type ToastPresence = ToastState & {
    leaving?: boolean;
};

const POSITION: Record<ToastPosition, React.CSSProperties> = {
    topLeft: { top: 16, left: 16 },
    topCenter: { top: 16, left: '50%', transform: 'translateX(-50%)' },
    topRight: { top: 16, right: 16 },

    bottomLeft: { bottom: 16, left: 16 },
    bottomCenter: { bottom: 16, left: '50%', transform: 'translateX(-50%)' },
    bottomRight: { bottom: 16, right: 16 },
};

export const ToastViewport = ({ position = 'bottomRight', timeout = 4000, limit = 8 }: ToastViewportProps) => {
    const [items, setItems] = useState<ToastPresence[]>([]);

    useEffect(() => {
        return toastStore.subscribe(next => {
            setItems(prev => {
                const prevMap = new Map(prev.map(t => [t.id, t]));
                const nextIds = new Set(next.map(t => t.id));

                const staying: ToastPresence[] = next.map(t => {
                    const old = prevMap.get(t.id);
                    return old ? { ...old, ...t, leaving: false } : { ...t, leaving: false };
                });

                const leaving: ToastPresence[] = [];

                for (const t of prev) {
                    if (!nextIds.has(t.id)) {
                        leaving.push({ ...t, leaving: true });
                    }
                }

                return [...staying, ...leaving];
            });
        });
    }, []);

    const handleExitComplete = (id: string) => {
        setItems(prev => prev.filter(t => t.id !== id));
    };

    const visible = (() => {
        if (limit <= 0) {
            return items;
        }

        const active: ToastPresence[] = [];
        const overflow: ToastPresence[] = [];
        const leaving: ToastPresence[] = [];

        for (const t of items) {
            if (t.leaving) {
                leaving.push(t);
                continue;
            }

            if (active.length < limit) {
                active.push(t);
            } else {
                overflow.push({ ...t, leaving: true });
            }
        }

        return [...active, ...overflow, ...leaving];
    })();

    return (
        <div className="uui-toast-viewport" style={POSITION[position]}>
            {visible.map(t => {
                const { priority, leaving, ...toastProps } = t;

                const action =
                    typeof toastProps.action === 'function' ? toastProps.action(toastProps.id) : toastProps.action;

                return (
                    <Toast
                        key={toastProps.id}
                        {...toastProps}
                        action={action}
                        leaving={leaving}
                        onExitComplete={handleExitComplete}
                        timeout={toastProps.timeout ?? timeout}
                    />
                );
            })}
        </div>
    );
};
