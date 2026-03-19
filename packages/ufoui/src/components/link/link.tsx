import React, { ElementType, ReactNode } from 'react';

import {
    cn,
    ControlStyle,
    ElementFocusEffect,
    ElementFont,
    ElementHoverEffect,
    ElementPressedEffect,
    getFontClass,
    SurfaceColor,
} from '../../utils';
import { Leading, Trailing } from '../../internal';

export type LinkProps<T extends ElementType = 'a'> = {
    /** Underlying element or router component. */
    as?: T;

    /** Link content. */
    children?: ReactNode;

    label?: string;

    /** Leading visual element. */
    leading?: ReactNode;

    /** Trailing visual element. */
    trailing?: ReactNode;

    /** Surface color token. */
    color?: SurfaceColor;

    /** Underline behavior. */
    underline?: 'none' | 'hover' | 'always';

    /** Font token. */
    font?: ElementFont;

    /** Opens link in new tab with security attributes. */
    isExternal?: boolean;

    /** Accessibility label override. */
    'aria-label'?: string;

    /** Custom class name. */
    className?: string;
    disabled?: boolean;
    /** Hover visual effects. */
    hoverEffects?: ElementHoverEffect[];
    /** Focus visual effects. */
    focusEffects?: ElementFocusEffect[];
    /** Pressed visual effects. */
    pressedEffects?: ElementPressedEffect[];
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'color' | 'children' | 'className'>;

export const Link = <T extends ElementType = 'a'>({
    as,
    children,
    leading,
    trailing,
    color,
    underline = 'hover',
    font = 'labelLarge',
    isExternal,
    label,
    className,
    disabled,
    hoverEffects = ['overlay'],
    focusEffects = ['ring', 'overlay'],
    pressedEffects = ['overlay'],
    'aria-label': ariaLabel,
    ...props
}: LinkProps<T>) => {
    const Component = as ?? 'a';
    const { onClick, ...rest } = props;

    const stateClasses = cn(
        ...(focusEffects.includes('overlay') ? ['uui-focus-overlay'] : []),
        ...(hoverEffects.includes('overlay') ? ['uui-hover-overlay'] : []),
        ...(pressedEffects.includes('overlay') ? ['uui-pressed-overlay'] : [])
    );

    const classes = cn(
        'uui-link',
        'uui-text-trigger',
        getFontClass(font),
        `uui-link-underline-${underline}`,
        className,
        stateClasses,
        ...(focusEffects.includes('ring') ? ['uui-focus-ring'] : [])
    );
    const finalAriaLabel = ariaLabel ?? label ?? (typeof children === 'string' ? children : undefined);
    const style = ControlStyle();
    style.text(color);
    const content = (
        <span className="uui-link-content">
            {leading && <Leading content={leading} />}
            <span className="uui-link-text">{children ?? label}</span>
            {trailing && <Trailing content={trailing} />}
        </span>
    );

    return (
        <Component
            aria-disabled={disabled ?? undefined}
            aria-label={finalAriaLabel}
            className={classes}
            onClick={e => {
                if (disabled) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                onClick?.(e);
            }}
            style={style.get()}
            tabIndex={disabled ? -1 : undefined}
            {...(isExternal && !disabled && { target: '_blank', rel: 'noopener noreferrer' })}
            {...rest}>
            {content}
        </Component>
    );
};
