import React, { forwardRef, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';

import {
    BorderColor,
    cn,
    ControlStyle,
    ElementElevation,
    ElementFont,
    ElementOutline,
    ElementShape,
    ElementSize,
    getSizeClass,
    mergeRefs,
    renderPortal,
    SurfaceColor,
    toKebabCase,
} from '../../utils';
import {
    DialogAnimation,
    DialogIconSlot,
    DialogType,
    getAnimationClass,
    getMotionStyleClass,
    MotionAnimation,
    MotionStyle,
} from '../../types';
import { ObservedElementSize, useAnimate, useEscapeHandler, useFocusTrap, useResizeObserver } from '../../hooks';
import { BoxBase } from './boxBase';
import { DialogActions, DialogContent, DialogHeader } from '../dialogs';

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
    fullWidth?: boolean;

    /** Expands panel to full height. */
    fullHeight?: boolean;

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

    /** Visual title text. Referenced via aria-labelledby on the dialog element. */
    label?: string;

    /** Accessible label for dialogs without a visible title. */
    'aria-label'?: string;

    /** Icon rendered in the dialog. Position controlled by iconSlot. */
    icon?: ReactElement;

    showIcon?: boolean;

    iconColor?: SurfaceColor;

    /** Where the icon is placed. Default: leading */
    iconSlot?: DialogIconSlot;

    /** Alignment of the title text. Default: start */
    titleAlign?: 'start' | 'center' | 'end';

    /** Full leading slot content for the title area. */
    leading?: ReactNode;

    /** Trailing slot content for the title area. */
    trailing?: ReactNode;

    /** Action buttons rendered in the dialog. */
    actions?: ReactNode;

    /** Where actions are placed. Default: inline for fullscreen, bottom otherwise (MD3) */
    actionsPlacement?: 'top' | 'subtitle' | 'bottom' | 'inline';

    /** Alignment of action buttons. Default: end (MD3) */
    actionsAlign?: 'start' | 'center' | 'end';

    /** Stack actions vertically instead of horizontally. Default: false (MD3) */
    actionsStack?: boolean;

    /** Maximum number of visible actions before the rest collapse into an overflow menu. Only applies when actionsPosition is inline. */
    maxActions?: number;

    /** Accessible label for the overflow actions button. Default: "More actions" */
    moreLabel?: string;

    /** Custom icon for the overflow actions button. */
    moreIcon?: ReactElement;

    /** Renders a close button in the trailing slot. */
    showClose?: boolean;

    /** Custom icon for the close button. */
    closeIcon?: ReactElement;

    /** Renders a back button in the leading slot. */
    showBack?: boolean;

    /** Custom icon for the back button. */
    backIcon?: ReactElement;

    /** Handler for the back button. Defaults to onClose. */
    onBack?: () => void;

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

    /** Renders inline without a portal (e.g. docked regions). */
    docked?: boolean;

    /** Skips portaling and modal body scroll lock; for anchored overlays. */
    anchored?: boolean;

    font?: ElementFont;
    titleFont?: ElementFont;
}

/**
 * Low-level base component for modal and docked dialogs.
 *
 * Renders a backdrop and panel (via BoxBase), portaled to `#dialog-root` (created if
 * missing; see {@link renderPortal}) unless `docked` or `anchored`.
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
            fullWidth,
            fullHeight,
            size,
            animation,
            fit,
            detached,
            duration = 500,
            closeOnBackdrop = true,
            closeOnEsc = true,
            children,
            label,
            icon,
            showIcon,
            iconColor,
            iconSlot = 'leading',
            titleAlign,
            leading,
            trailing,
            actions,
            actionsPlacement,
            actionsAlign,
            actionsStack,
            maxActions,
            moreLabel,
            moreIcon,
            showClose,
            closeIcon,
            showBack,
            backIcon,
            onBack,
            className,
            motionStyle,
            modal,
            autoFocus,
            flush,
            docked,
            anchored,
            titleFont,
            ...rest
        }: DialogBaseProps,
        ref
        // eslint-disable-next-line sonarjs/cognitive-complexity
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

        const vdock = type === 'dockLeft' || type === 'dockRight';
        const finalTitleFont = titleFont ?? (vdock ? 'titleLarge' : undefined);

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
            fullWidth && 'uui-w-full',
            fullHeight && 'uui-h-full',
            (maxW || maxH) && 'uui-maximized',
            fit && 'uui-fit',
            flush && 'uui-flush',
            detached && 'uui-detached',
            getSizeClass(finalSize),
            animating && getAnimationClass(resolveAnimation(type, animation)),
            getMotionStyleClass(motionStyle),
            className
        );

        if (!(visible || active)) {
            return null;
        }

        const dialogActions =
            actionsPlacement !== 'inline' ? (
                <DialogActions
                    actions={actions}
                    align={actionsAlign}
                    maxActions={maxActions}
                    moreIcon={moreIcon}
                    moreLabel={moreLabel}
                    placement={actionsPlacement}
                    stack={actionsStack}
                />
            ) : null;

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
                    <DialogHeader
                        actions={actionsPlacement === 'inline' && actions}
                        actionsAlign={actionsAlign}
                        actionsStack={actionsStack}
                        backIcon={backIcon}
                        closeIcon={closeIcon}
                        font={finalTitleFont}
                        icon={icon}
                        iconColor={iconColor}
                        iconSlot={iconSlot}
                        label={label}
                        leading={leading}
                        maxActions={maxActions}
                        moreIcon={moreIcon}
                        moreLabel={moreLabel}
                        onBack={onBack}
                        onClose={onClose}
                        showBack={showBack}
                        showClose={showClose}
                        showIcon={showIcon}
                        titleAlign={titleAlign}
                        trailing={trailing}
                    />

                    <DialogContent icon={icon} iconColor={iconColor} iconSlot={iconSlot} showIcon={showIcon}>
                        {children}
                    </DialogContent>

                    {dialogActions}
                </BoxBase>
            </div>
        );

        return docked || anchored ? dialog : renderPortal('uui-dialog-root', dialog);
    }
);

DialogBase.displayName = 'Dialog';
