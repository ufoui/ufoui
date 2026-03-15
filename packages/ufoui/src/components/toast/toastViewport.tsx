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
    topLeft: { top: 16, left: 16, flexDirection: 'column-reverse' },
    topCenter: { top: 16, left: '50%', transform: 'translateX(-50%)', flexDirection: 'column-reverse' },
    topRight: { top: 16, right: 16, flexDirection: 'column-reverse' },

    bottomLeft: { bottom: 16, left: 16 },
    bottomCenter: { bottom: 16, left: '50%', transform: 'translateX(-50%)' },
    bottomRight: { bottom: 16, right: 16 },
};

export const ToastViewport = ({ position = 'bottomRight', timeout = 4000, limit = 3 }: ToastViewportProps) => {
    const [items, setItems] = useState<ToastPresence[]>([]);
    useEffect(() => {
        return toastStore.subscribe(next => {
            setItems(prev => {
                const nextMap = new Map(next.map(t => [t.id, t]));
                const prevIds = new Set(prev.map(t => t.id));

                // 1. Aktualizujemy stare + wykrywamy te do usunięcia (leaving)
                const updatedPrev = prev.map(t => {
                    const found = nextMap.get(t.id);

                    if (!found) {
                        // Nie ma w Store? Jeśli jeszcze nie "wychodzi", to odpalamy leaving
                        return t.leaving ? t : { ...t, leaving: true };
                    }

                    // Jest w Store? Nadpisujemy dane (ważne dla Promise!), zostawiamy flagę leaving
                    return { ...found, leaving: t.leaving };
                });

                // 2. Nowe toasty (VIP idą na koniec listy items, ale slice/visible je obsłuży)
                const newItems = next.filter(t => !prevIds.has(t.id)).map(t => ({ ...t, leaving: false }));

                return [...updatedPrev, ...newItems];
            });
        });
    }, [limit]);

    const handleExitComplete = (id: string) => {
        setItems(prev => prev.filter(t => t.id !== id));
    };

    const visible = (() => {
        return limit <= 0 ? items : items.slice(0, limit);
    })();

    return (
        <div
            aria-live="polite"
            aria-relevant="additions text"
            className="uui-toast-viewport uui-menu-scroll"
            style={POSITION[position]}>
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
