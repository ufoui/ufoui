import React, { forwardRef, ReactNode, useEffect, useState } from 'react';

import { cn, ControlStyle, ElementElevation, ElementShape, SurfaceColor, ToastStatus } from '../../utils';
import { BoxBase, BoxBaseProps } from '../base';
import { toastStore } from '../../utils/toasts/toastStore';
import { MotionAnimation, MotionStyle } from '../../types';
import { Collapse } from '../collapse/collapse';

/**
 * Props for Toast component.
 *
 * @category Toast
 */
export interface ToastProps extends Omit<BoxBaseProps, 'children'> {
    /** Toast identifier used for lifecycle control. */
    id: string;

    /** Primary heading text. */
    title?: string;

    /** Secondary supporting text. */
    description?: string;

    /** Surface color token overriding default background and text. */
    color?: SurfaceColor;

    /** Leading visual element. */
    icon?: ReactNode;

    /** Action element rendered below content. */
    action?: ReactNode;

    /** Full content override replacing internal layout. */
    content?: ReactNode;

    /** Time in milliseconds before the toast is automatically dismissed. */
    timeout?: number;

    /** Elevation token. Default: 3 */
    elevation?: ElementElevation;

    /** Status variant applied as CSS modifier class. */
    status?: ToastStatus;

    /** Shape token. Default: smooth */
    shape?: ElementShape;

    /** Animation preset used by internal motion elements. */
    animation?: MotionAnimation;

    /** Animation duration in milliseconds. */
    duration?: number;

    /** Motion style applied to animated elements. */
    motionStyle?: MotionStyle;

    leaving?: boolean;
    onExitComplete?: (id: string) => void;
}

/**
 * Toast notification container.
 *
 * Handles auto-dismiss lifecycle using the timeout property.
 *
 * @function
 * @param props Component properties.
 *
 * @category Toast
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(
    (
        {
            id,
            title,
            description,
            color,
            icon,
            action,
            content,
            duration = 400,
            animation = 'flipY',
            motionStyle,
            timeout,
            elevation = 3,
            shape = 'smooth',
            status,
            leaving,
            onExitComplete,
            className,
            ...rest
        },
        ref
    ) => {
        const [open, setOpen] = useState(false);

        useEffect(() => {
            if (!timeout || timeout === 0) {
                return;
            }

            const timer = setTimeout(() => {
                setOpen(false);

                setTimeout(() => {
                    toastStore.remove(id);
                    onExitComplete?.(id);
                }, duration);
            }, timeout);

            return () => {
                clearTimeout(timer);
            };
        }, [id, timeout, duration]);

        const style = ControlStyle();
        style.bg(color);
        style.text.on(color);

        const statusClass = status ? `uui-toast-${status}` : undefined;

        useEffect(() => {
            setOpen(true);
        }, []);

        const toast = (
            <BoxBase
                className={cn('uui-toast', statusClass, className)}
                elevation={elevation}
                font="bodyMedium"
                ref={ref}
                shape={shape}
                style={style.get()}
                {...rest}>
                {content ?? (
                    <>
                        {icon && <div className="uui-icon">{icon}</div>}

                        <div className="uui-toast-content">
                            {title && <div className="uui-toast-title">{title}</div>}
                            {description && <div className="uui-toast-description">{description}</div>}
                            {action}
                        </div>
                    </>
                )}
            </BoxBase>
        );

        return (
            <Collapse animation={animation} duration={duration} motionStyle={motionStyle} open={open}>
                <div aria-labelledby={`${id}-trigger`} id={`${id}-content`} role="region">
                    {toast}
                </div>
            </Collapse>
        );
    }
);

Toast.displayName = 'Toast';
