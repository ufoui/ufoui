import React, { ElementType, forwardRef, ReactElement, ReactNode, useEffect, useState } from 'react';

import { BorderColor, cn, ControlStyle, ElementElevation, ElementFont, ElementShape, SurfaceColor } from '../../utils';
import { DialogAnimation, DialogIconSlot, getAnimationClass, getMotionStyleClass, MotionStyle } from '../../types';
import { useAnimate } from '../../hooks';
import { BoxBase, BoxBaseProps } from '../base';
import { DialogActions, DialogContent, DialogHeader } from '../dialogs';

export type CardVariant = 'elevated' | 'filled' | 'outlined';

/**
 * Props for {@link Card}.
 *
 * Card surface built on top of {@link BoxBase}.
 *
 * @category Card
 */
export interface CardProps extends Omit<BoxBaseProps, 'type' | 'elementClass' | 'color' | 'elevation' | 'borderColor'> {
    /** Underlying element/component. Default: `article`. */
    component?: ElementType;

    /** Card content. */
    children?: ReactNode;

    /** Card variant. Default: `elevated`. */
    variant?: CardVariant;

    /** Whether the card is visible. */
    open?: boolean;

    /** Entry/exit animation preset. Use `none` to disable. */
    animation?: DialogAnimation;

    /** Animation duration in ms. */
    duration?: number;

    /** Motion style helper classes. */
    motionStyle?: MotionStyle;

    /** Surface color token override. */
    color?: SurfaceColor;

    /** Elevation override. */
    elevation?: ElementElevation;

    /** Shape token. Default: `rounded` (MD3 medium corner). */
    shape?: ElementShape;

    /** Border color override (used by outlined cards). */
    borderColor?: BorderColor;

    /** Visual title text. */
    label?: string;

    /** Accessible label for cards without visible title. */
    'aria-label'?: string;

    /** Card icon. */
    icon?: ReactElement;

    showIcon?: boolean;
    iconColor?: SurfaceColor;
    iconSlot?: DialogIconSlot;

    /** Title alignment. */
    titleAlign?: 'start' | 'center' | 'end';

    /** Header leading slot content. */
    leading?: ReactNode;

    /** Header trailing slot content. */
    trailing?: ReactNode;

    /** Header/content actions. */
    actions?: ReactNode;

    /** Actions placement. Default: `bottom`. */
    actionsPlacement?: 'top' | 'subtitle' | 'bottom' | 'inline';

    /** Actions alignment. */
    actionsAlign?: 'start' | 'center' | 'end';

    /** Stack actions vertically. */
    actionsStack?: boolean;

    /** Maximum number of visible actions before overflow. */
    maxActions?: number;

    /** Overflow button label. */
    moreLabel?: string;

    /** Overflow button icon. */
    moreIcon?: ReactElement;

    /** Shows close button in header. */
    showClose?: boolean;

    /** Close button icon override. */
    closeIcon?: ReactElement;

    /** Shows back button in header. */
    showBack?: boolean;

    /** Back button icon override. */
    backIcon?: ReactElement;

    /** Back button handler. Defaults to onClose. */
    onBack?: () => void;

    /** Close button handler. */
    onClose?: () => void;

    /** Header title font token. */
    titleFont?: ElementFont;
}

export const Card = forwardRef<HTMLElement, CardProps>(
    (
        {
            component = 'article',
            children,
            className,
            variant = 'elevated',
            open = true,
            animation = 'fade',
            duration = 240,
            motionStyle,
            color,
            elevation,
            border,
            borderColor,
            shape = 'rounded',
            label,
            icon,
            showIcon,
            iconColor,
            iconSlot = 'leading',
            titleAlign,
            leading,
            trailing,
            actions,
            actionsPlacement = 'bottom',
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
            onClose,
            titleFont,
            style,
            ...rest
        },
        ref
    ) => {
        const [visible, setVisible] = useState(open);
        const { animationVars, animate, animating, idle, active } = useAnimate({ t1: duration });

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

        if (!(visible || active)) {
            return null;
        }

        const resolvedColor =
            color ??
            (variant === 'filled'
                ? 'surfaceContainerHighest'
                : variant === 'outlined'
                  ? 'surface'
                  : 'surfaceContainerLow');

        const resolvedElevation = elevation ?? (variant === 'elevated' ? 1 : 0);
        const resolvedBorder = border ?? (variant === 'outlined' ? 1 : undefined);
        const resolvedBorderColor = borderColor ?? (variant === 'outlined' ? 'outlineVariant' : undefined);
        const controlStyle = ControlStyle();
        controlStyle.merge(style);
        controlStyle.merge(animationVars);
        const cardActions =
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

        const hasHeader = Boolean(
            label ||
                leading ||
                trailing ||
                showBack ||
                showClose ||
                icon ||
                showIcon ||
                (actionsPlacement === 'inline' && actions)
        );

        return (
            <BoxBase
                border={resolvedBorder}
                borderColor={resolvedBorderColor}
                className={cn(
                    `uui-card-${variant}`,
                    animating && getAnimationClass(animation),
                    getMotionStyleClass(motionStyle),
                    className
                )}
                color={resolvedColor}
                component={component}
                elementClass="uui-card"
                elevation={resolvedElevation}
                ref={ref}
                shape={shape}
                style={controlStyle.get()}
                type="block"
                {...rest}>
                {hasHeader && (
                    <DialogHeader
                        actions={actionsPlacement === 'inline' ? actions : undefined}
                        actionsAlign={actionsAlign}
                        actionsStack={actionsStack}
                        backIcon={backIcon}
                        closeIcon={closeIcon}
                        font={titleFont}
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
                )}
                <DialogContent
                    className="uui-card-content"
                    icon={icon}
                    iconColor={iconColor}
                    iconSlot={iconSlot}
                    showIcon={showIcon}>
                    {children}
                </DialogContent>
                {cardActions}
            </BoxBase>
        );
    }
);

Card.displayName = 'Card';
