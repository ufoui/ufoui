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
    toKebabCase,
} from '../../utils';
import { getAnimationClass, getMotionStyleClass, MotionAnimation, MotionStyle } from '../../types';
import { ObservedElementSize, useAnimate, useEscapeHandler, useFocusTrap, useResizeObserver } from '../../hooks';
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
    wf?: boolean;
    hf?: boolean;
    fit?: boolean;
    detached?: boolean;
    animation?: DialogAnimation;
    duration?: number;
    disableBackdropClose?: boolean;
    disableEscapeKey?: boolean;
    children?: ReactNode;
    className?: string;
    motionStyle?: MotionStyle;
    modal?: boolean;
    autoFocus?: boolean;
    flush?: boolean;
}

const portalTarget = typeof document !== 'undefined' ? (document.getElementById('dialog-root') ?? document.body) : null;

export const DialogBase = forwardRef<HTMLDivElement, DialogBaseProps>(
    (
        {
            open,
            onClose,
            type = 'basic',
            color,
            elevation,
            shape,
            border,
            borderColor,
            wf,
            hf,
            size,
            animation,
            fit,
            detached,
            duration = 500,
            disableBackdropClose,
            disableEscapeKey,
            children,
            className,
            motionStyle,
            modal = false,
            autoFocus,
            flush,
        }: DialogBaseProps,
        ref
    ) => {
        const finalElevation = elevation ?? (type !== 'fullscreen' ? 3 : undefined);
        const dialogRef = useRef<HTMLDivElement>(null);
        const backdropRef = useRef<HTMLDivElement>(null);
        const [visible, setVisible] = useState(false);
        const [wFlush, setWFlush] = useState(false);
        const [hFlush, setHFlush] = useState(false);

        const { animationVars, animate, animating, idle, active } = useAnimate({
            t1: duration,
        });

        const handleResize = (_next: ObservedElementSize) => {
            const backdrop = backdropRef.current;
            const dialog = dialogRef.current;
            if (!backdrop || !dialog) {
                setWFlush(false);
                setHFlush(false);
                return;
            }
            const b = backdrop.getBoundingClientRect();
            const d = dialog.getBoundingClientRect();
            const eps = 1;
            if (type === 'dockLeft' || type === 'dockRight') {
                setWFlush(Math.abs(d.width - b.width) <= eps);
                setHFlush(false);
            } else if (type === 'dockTop' || type === 'dockBottom') {
                setHFlush(Math.abs(d.height - b.height) <= eps);
                setWFlush(false);
            } else {
                setWFlush(false);
                setHFlush(false);
            }
        };

        const observeDialogResize = type !== 'basic' && type !== 'fullscreen' && !detached;
        useResizeObserver(dialogRef, handleResize, observeDialogResize && !animating, true);
        useResizeObserver(backdropRef, handleResize, observeDialogResize && !animating, true);

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
                setHFlush(false);
                setWFlush(false);
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
        const controlStyle = ControlStyle();
        controlStyle.merge(animationVars);

        const finalSize = size ?? (type === 'dockLeft' || type === 'dockRight' ? 'small' : 'medium');
        const backdropClasses = cn(
            'uui-dialog-backdrop',
            modal && 'uui-modal',
            backdropVisible && 'uui-open',
            detached && 'uui-dialog-backdrop-detached'
        );
        const dialogClasses = cn(
            'uui-dlg',
            `uui-dialog-${toKebabCase(type)}`,
            wf && 'uui-w-full',
            hf && 'uui-h-full',
            (wFlush || hFlush) && 'uui-maximized',
            fit && 'uui-fit',
            flush && 'uui-flush',
            getSizeClass(finalSize),
            animating && animationClass,
            getMotionStyleClass(motionStyle),
            className
        );

        if (!portalTarget || !(visible || active)) {
            return null;
        }

        return createPortal(
            <div className={backdropClasses} onClick={handleBackdropClick} ref={backdropRef} style={animationVars}>
                <BoxBase
                    aria-modal={modal ? true : undefined}
                    border={border}
                    borderColor={borderColor}
                    className={dialogClasses}
                    color={color}
                    elevation={finalElevation}
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
