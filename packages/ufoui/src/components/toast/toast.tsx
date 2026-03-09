import React, { forwardRef, ReactNode, useEffect } from 'react';

import { cn, ControlStyle, ElementElevation, ElementShape, SurfaceColor, ToastStatus } from '../../utils';
import { BoxBase, BoxBaseProps } from '../base';
import { toastStore } from '../../utils/toasts/toastStore';

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

    /** Display duration in milliseconds. */
    duration?: number;

    /** Elevation token. Default: 3 */
    elevation?: ElementElevation;

    /** Status variant applied as CSS modifier class. */
    status?: ToastStatus;

    /** Shape token. Default: smooth */
    shape?: ElementShape;
}

/**
 * Toast notification container.
 *
 * Handles auto-dismiss lifecycle when duration is provided.
 *
 * @function
 * @param props Component props.
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
            duration,
            elevation = 3,
            shape = 'smooth',
            status,
            className,
            ...rest
        },
        ref
    ) => {
        useEffect(() => {
            if (!duration || duration === 0) {
                return;
            }

            const timer = setTimeout(() => {
                toastStore.remove(id);
            }, duration);

            return () => {
                clearTimeout(timer);
            };
        }, [id, duration]);

        const style = ControlStyle();
        style.bg(color);
        style.text.on(color);

        const statusClass = status ? `uui-toast-${status}` : undefined;

        return (
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
    }
);

Toast.displayName = 'Toast';
