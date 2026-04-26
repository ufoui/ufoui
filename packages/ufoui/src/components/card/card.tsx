import React, { ElementType, forwardRef, ReactNode, useEffect, useState } from 'react';

import { BorderColor, cn, ControlStyle, ElementElevation, ElementShape, SurfaceColor } from '../../utils';
import { DialogAnimation, getAnimationClass, getMotionStyleClass, MotionStyle } from '../../types';
import { useAnimate } from '../../hooks';
import { BoxBase, BoxBaseProps } from '../base';

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
    as?: ElementType;

    /** Card content. */
    children?: ReactNode;

    /** Removes default inner spacing from the card content area. */
    flush?: boolean;

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

    /** Accessible label for cards without visible title. */
    'aria-label'?: string;
}

export const Card = forwardRef<HTMLElement, CardProps>(
    (
        {
            as = 'article',
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
            flush,
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

        return (
            <BoxBase
                as={as}
                border={resolvedBorder}
                borderColor={resolvedBorderColor}
                className={cn(
                    `uui-card-${variant}`,
                    animating && getAnimationClass(animation),
                    getMotionStyleClass(motionStyle),
                    className
                )}
                color={resolvedColor}
                elementClass="uui-card"
                elevation={resolvedElevation}
                ref={ref}
                shape={shape}
                style={controlStyle.get()}
                type="block"
                {...rest}>
                <div className={cn('uui-card-content', flush && 'uui-flush')}>{children}</div>
            </BoxBase>
        );
    }
);

Card.displayName = 'Card';
