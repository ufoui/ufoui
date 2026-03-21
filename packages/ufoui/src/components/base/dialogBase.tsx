import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
    BorderColor,
    cn,
    ControlStyle,
    ElementElevation,
    ElementOutline,
    ElementShape,
    ElementSize,
    getSizeClass,
    mergeRefs,
    SurfaceColor,
} from '../../utils';
import { getAnimationClass, getMotionStyleClass, MotionAnimation, MotionStyle } from '../../types';
import { useAnimate, useEscapeHandler, useFocusTrap } from '../../hooks';
import { BoxBase } from './boxBase';

export type DialogType = 'basic' | 'fullscreen' | 'dockRight' | 'dockLeft' | 'dockTop' | 'dockBottom';

export type DialogAnimation = 'none' | MotionAnimation;

const defaultAnimation: Record<DialogType, MotionAnimation> = {
    basic: 'scale',
    fullscreen: 'fade',
    dockBottom: 'slideUp',
    dockTop: 'slideDown',
    dockRight: 'slideRight',
    dockLeft: 'slideLeft',
};

const resolveAnimation = (type: DialogType, animation?: DialogAnimation) => {
    return animation === 'none' ? undefined : (animation ?? defaultAnimation[type]);
};

export interface DialogBaseProps {
    elementClass?: string;
    open: boolean;
    onClose?: () => void;
    type?: DialogType;

    color?: SurfaceColor;
    elevation?: ElementElevation;
    size?: ElementSize;
    shape?: ElementShape;
    border?: ElementOutline;
    borderColor?: BorderColor;
    animation?: DialogAnimation;
    duration?: number;
    disableBackdropClose?: boolean;
    disableEscapeKey?: boolean;
    children?: ReactNode;
    className?: string;
    motionStyle?: MotionStyle;
    modal?: boolean;
    autoFocus?: boolean;
}

const portalTarget = typeof document !== 'undefined' ? (document.getElementById('dialog-root') ?? document.body) : null;

export const DialogBase = forwardRef<HTMLDivElement, DialogBaseProps>(
    (
        {
            open,
            onClose,
            type = 'basic',
            color = 'surfaceContainerHigh',
            elevation = 3,
            shape = 'rounded',
            border,
            borderColor,
            size = 'small',
            animation,
            duration = 250,
            disableBackdropClose,
            disableEscapeKey,
            children,
            className,
            motionStyle,
            modal = false,
            autoFocus,
        }: DialogBaseProps,
        ref
    ) => {
        const dialogRef = useRef<HTMLDivElement>(null);
        const [visible, setVisible] = useState(false);

        const as = useAnimate({
            t1: duration,
        });

        const { animationVars, animate, animating, idle, active } = as;

        const [backdropVisible, setBackdropVisible] = useState(false);

        useEscapeHandler(!disableEscapeKey && visible, () => onClose?.());

        useFocusTrap({
            ref: dialogRef,
            enabled: modal && visible,
            autoFocus: autoFocus && !active,
        });

        useEffect(() => {
            if (open) {
                animate('open');
                setVisible(true);
            } else if (!idle) {
                animate('closed');
                setVisible(false);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [open]);

        useEffect(() => {
            if (open) {
                setBackdropVisible(true);
            } else {
                setBackdropVisible(false);
            }
        }, [open]);

        // click outside the dialog to close
        const handleBackdropClick = (e: React.MouseEvent) => {
            if (disableBackdropClose) {
                return;
            }
            if (e.target === e.currentTarget) {
                onClose?.();
            }
        };

        useEffect(() => {
            if (visible) {
                const prev = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
                return () => {
                    document.body.style.overflow = prev;
                };
            }
        }, [visible]);

        const animationClass = getAnimationClass(resolveAnimation(type, animation));
        const wrapperStyle = {
            '--uui-duration': String(duration * 0.65) + 'ms',
        } as React.CSSProperties;

        const controlStyle = ControlStyle();
        controlStyle.merge(animationVars);

        const wrapperClasses = ['uui-dialog-backdrop', backdropVisible && 'uui-open'].filter(Boolean).join(' ');

        const dialogClasses = cn(
            'uui-db',
            `uui-dialog-${type}`,
            getSizeClass(size),
            animating && animationClass,
            getMotionStyleClass(motionStyle),
            className
        );

        if (!portalTarget || !(visible || active)) {
            return null;
        }

        return createPortal(
            <div className={wrapperClasses} onClick={handleBackdropClick} style={wrapperStyle}>
                <BoxBase
                    aria-modal={modal ? true : undefined}
                    border={border}
                    borderColor={borderColor}
                    className={dialogClasses}
                    color={color}
                    elevation={elevation}
                    ref={mergeRefs(ref, dialogRef)}
                    role="dialog"
                    shape={shape}
                    style={controlStyle.get()}>
                    {children}
                </BoxBase>
            </div>,
            portalTarget
        );
    }
);

DialogBase.displayName = 'Dialog';
