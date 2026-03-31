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

/**
 * Layout mode for the DialogBase component.
 *
 * @remarks
 * Determines dialog placement and sizing:
 * - `'basic'` - centered dialog
 * - `'fullscreen'` - full viewport
 * - `'dockLeft'` / `'dockRight'` / `'dockTop'` / `'dockBottom'` -  edge-docked panels
 *
 * @category Base components
 */
export type DialogType = 'basic' | 'fullscreen' | 'dockRight' | 'dockLeft' | 'dockTop' | 'dockBottom';

/**
 * Animation preset for open and close transitions.
 *
 * @remarks
 * Use `'none'` to disable motion. Otherwise uses a {@link MotionAnimation} value.
 * When omitted, a default animation is chosen for the current layout mode.
 *
 * @category Base components
 */
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

/**
 * Props for the DialogBase component.
 *
 * Supports backdrop and portal rendering, transitions, Escape and backdrop
 * dismiss, and optional modal focus trap and scroll locking.
 *
 * @category Base components
 */
export interface DialogBaseProps {
    /** Semantic UUI element class for the dialog panel. */
    elementClass?: string;

    /** Whether the dialog is open. */
    open: boolean;

    /** Handler invoked when the dialog should close. */
    onClose?: () => void;

    /** Layout mode. Default: basic */
    type?: DialogType;

    /** Surface background token. */
    color?: SurfaceColor;

    /** Elevation level. Default: 3 for non-fullscreen layouts. */
    elevation?: ElementElevation;

    /** Predefined panel size. Default: small for horizontal docks, medium otherwise. */
    size?: ElementSize;

    /** Shape of the dialog panel. */
    shape?: ElementShape;

    /** Outline thickness when outlined. */
    border?: ElementOutline;

    /** Outline color when outlined. */
    borderColor?: BorderColor;

    /** Expands panel to full width. */
    wf?: boolean;

    /** Expands panel to full height. */
    hf?: boolean;

    /** Fits content to the panel. */
    fit?: boolean;

    /** Renders the panel in detached layout style. */
    detached?: boolean;

    /** Animation preset; `'none'` disables motion. */
    animation?: DialogAnimation;

    /** Duration in milliseconds for open and close animations. Default: 500 */
    duration?: number;

    /** Whether the dialog closes when the backdrop is clicked. Default: true */
    closeOnBackdrop?: boolean;

    /** Whether the dialog closes when Escape is pressed. Default: true */
    closeOnEsc?: boolean;

    /** Dialog content. */
    children?: ReactNode;

    /** Additional class names for the dialog panel. */
    className?: string;

    /** Motion style helper classes for the panel. */
    motionStyle?: MotionStyle;

    /** Enables modal behaviour, focus trap, aria-modal, and body scroll lock when applicable. */
    modal?: boolean;

    /** Focuses the dialog when opened (with modal focus trap). */
    autoFocus?: boolean;

    /** Removes default panel padding. */
    flush?: boolean;

    /** Renders inline without portaling (e.g. docked regions). */
    docked?: boolean;

    /** Skips portaling and modal body scroll lock; for anchored overlays. */
    anchored?: boolean;
}

const portalTarget = typeof document !== 'undefined' ? (document.getElementById('dialog-root') ?? document.body) : null;

/**
 * Low-level base component for modal and docked dialogs.
 *
 * Renders a backdrop and panel (via BoxBase), portaled to `#dialog-root` or
 * `document.body` unless `docked` or `anchored`.
 *
 *
 * @param props Component properties.
 * @function
 *
 * @example
 * <DialogBase open={open} onClose={() => setOpen(false)} modal>
 * {children}
 * </DialogBase>
 *
 * @example
 * <DialogBase open type="dockRight" anchored >
 * {children}
 * </DialogBase>
 *
 * @category Base components
 */
export const DialogBase = forwardRef<HTMLDivElement, DialogBaseProps>(
    (
        {
            open,
            onClose,
            type = 'basic',
            color,
            elevation,
            shape,
            wf,
            hf,
            size,
            animation,
            fit,
            detached,
            duration = 500,
            closeOnBackdrop = true,
            closeOnEsc = true,
            children,
            className,
            motionStyle,
            modal = false,
            autoFocus,
            flush,
            docked,
            anchored,
            ...rest
        }: DialogBaseProps,
        ref
    ) => {
        const finalElevation = elevation ?? (type !== 'fullscreen' ? 3 : undefined);
        const dialogRef = useRef<HTMLDivElement>(null);
        const backdropRef = useRef<HTMLDivElement>(null);
        const [visible, setVisible] = useState(false);
        const [maxW, setMaxW] = useState(false);
        const [maxH, setMaxH] = useState(false);

        const { animationVars, animate, animating, idle, active } = useAnimate({
            t1: duration,
        });

        const handleResize = (_next: ObservedElementSize) => {
            if (backdropRef.current && dialogRef.current) {
                const { width: bw, height: bh } = backdropRef.current.getBoundingClientRect();
                const { width: dw, height: dh } = dialogRef.current.getBoundingClientRect();
                const eps = 1;
                setMaxW((type === 'dockLeft' || type === 'dockRight') && dw >= bw - eps);
                setMaxH((type === 'dockTop' || type === 'dockBottom') && dh >= bh - eps);
            }
        };

        const observeDialogResize = type !== 'basic' && type !== 'fullscreen' && !detached;
        useResizeObserver(dialogRef, handleResize, observeDialogResize && !animating, true);
        useResizeObserver(backdropRef, handleResize, observeDialogResize && !animating, true);
        useEscapeHandler(closeOnEsc && visible, () => onClose?.());
        useFocusTrap({
            ref: dialogRef,
            enabled: modal && visible,
            autoFocus: autoFocus && !active,
        });

        useEffect(() => {
            if (open) {
                animate('open');
                setVisible(true);
                setMaxH(false);
                setMaxW(false);
            } else if (!idle) {
                animate('closed');
                setVisible(false);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [open]);

        // click outside the dialog to close
        const handleBackdropClick = (e: React.MouseEvent) => {
            if (closeOnBackdrop && e.target === e.currentTarget) {
                onClose?.();
            }
        };

        useEffect(() => {
            if (visible && modal && !anchored && !docked) {
                const prev = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
                return () => {
                    document.body.style.overflow = prev;
                };
            }
        }, [anchored, docked, modal, visible]);

        useEffect(() => {
            setMaxW(false);
            setMaxH(false);
        }, [type]);

        const animationClass = getAnimationClass(resolveAnimation(type, animation));
        const controlStyle = ControlStyle();
        controlStyle.merge(animationVars);

        const finalSize = size ?? (type === 'dockLeft' || type === 'dockRight' ? 'small' : 'medium');
        const backdropClasses = cn(
            'uui-dlg-backdrop',
            modal && 'uui-modal',
            visible && 'uui-open',
            docked && 'uui-docked',
            anchored && 'uui-anchored'
        );
        const dialogClasses = cn(
            'uui-dlg',
            `uui-dlg-${toKebabCase(type)}`,
            wf && 'uui-w-full',
            hf && 'uui-h-full',
            (maxW || maxH) && 'uui-maximized',
            fit && 'uui-fit',
            flush && 'uui-flush',
            detached && 'uui-detached',
            getSizeClass(finalSize),
            animating && animationClass,
            getMotionStyleClass(motionStyle),
            className
        );

        if (!portalTarget || !(visible || active)) {
            return null;
        }

        const dialog = (
            <div
                className={backdropClasses}
                onClick={handleBackdropClick}
                ref={backdropRef}
                role="presentation"
                style={animationVars}>
                <BoxBase
                    {...rest}
                    aria-modal={modal ? true : undefined}
                    className={dialogClasses}
                    color={color}
                    elevation={finalElevation}
                    ref={mergeRefs(ref, dialogRef)}
                    role="dialog"
                    shape={shape}
                    style={controlStyle.get()}>
                    {children}
                </BoxBase>
            </div>
        );
        return docked || anchored ? dialog : createPortal(dialog, portalTarget);
    }
);

DialogBase.displayName = 'Dialog';
