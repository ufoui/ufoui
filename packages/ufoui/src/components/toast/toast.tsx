import React, { forwardRef, ReactNode, useEffect } from 'react';

import { cn, ControlStyle, ElementElevation, ElementShape, SurfaceColor, ToastStatus } from '../../utils';
import { BoxBase, BoxBaseProps } from '../base';
import { toastStore } from '../../utils/toasts/toastStore';
import { getAnimationClass, getMotionStyleClass, MotionAnimation, MotionStyle } from '../../types';
import { useAnimate } from '../../hooks';

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
            duration = 3000,
            animation = 'flipX',
            motionStyle,
            timeout,
            elevation = 3,
            shape = 'smooth',
            status,
            onExitComplete,
            className,
            ...rest
        },
        ref
    ) => {
        const { animationVars, animate, animating } = useAnimate({ t1: duration });
        useEffect(() => {
            if (!timeout || timeout === 0) {
                return;
            }

            const timer = setTimeout(() => {
                toastStore.remove(id);
                onExitComplete?.(id);
            }, timeout);

            return () => {
                clearTimeout(timer);
            };
        }, [id, timeout]);

        const style = ControlStyle(animationVars);
        style.bg(color);
        style.text.on(color);

        const statusClass = status ? `uui-toast-${status}` : undefined;

        useEffect(() => {
            animate('open');
        }, []);

        return (
            <BoxBase
                className={cn(
                    'uui-toast',
                    statusClass,
                    className,
                    animating && getAnimationClass(animation),
                    getMotionStyleClass(motionStyle)
                )}
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
