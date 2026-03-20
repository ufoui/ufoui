import React, { ElementType, forwardRef, ReactNode } from 'react';

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

/**
 * Props for the Link component.
 *
 * Inline link element with optional leading and trailing content and animated underline.
 *
 * @category Link
 */
export type LinkProps<T extends ElementType = 'a'> = {
    /** Underlying element or router component. */
    as?: T;

    /** Link content. */
    children?: ReactNode;

    /** Fallback text when children is not provided. */
    label?: string;

    /** Leading visual element. */
    leading?: ReactNode;

    /** Trailing visual element. */
    trailing?: ReactNode;

    /** Surface color token applied to text. */
    color?: SurfaceColor;

    /** Underline visibility behavior. */
    underline?: 'none' | 'hover' | 'always';

    /** Font token applied to content. */
    font?: ElementFont;

    /** Opens link in new tab with security attributes. */
    isExternal?: boolean;

    /** Accessibility label override. */
    'aria-label'?: string;

    /** Additional class applied to the root element. */
    className?: string;

    /** Disables interaction and focus. */
    disabled?: boolean;

    /** Hover visual effects. */
    hoverEffects?: ElementHoverEffect[];

    /** Focus visual effects. */
    focusEffects?: ElementFocusEffect[];

    /** Pressed visual effects. */
    pressedEffects?: ElementPressedEffect[];

    /** Underline animation origin. */
    underlineOrigin?: 'left' | 'center';

    /** Underline animation type. */
    underlineAnimation?: 'scale' | 'fade';
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'color' | 'children' | 'className'>;

export interface LinkComponent {
    <T extends ElementType = 'a'>(props: LinkProps<T>): ReactNode;
    displayName?: string;
}

/**
 * Inline link component with optional leading and trailing content and animated underline.
 *
 * @function
 * @param props Component properties.
 *
 * @category Link
 */

// eslint-disable-next-line react/display-name
export const Link = forwardRef(
    <T extends ElementType = 'a'>(
        {
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
            underlineAnimation,
            underlineOrigin,
            'aria-label': ariaLabel,
            ...props
        }: LinkProps<T>,
        ref: React.Ref<Element>
    ) => {
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
            underlineAnimation && `uui-link-anim-${underlineAnimation}`,
            className,
            stateClasses,
            ...(focusEffects.includes('ring') ? ['uui-focus-ring'] : [])
        );

        const finalAriaLabel = ariaLabel ?? label ?? (typeof children === 'string' ? children : undefined);

        const style = ControlStyle();
        style.text(color);

        if (underlineOrigin) {
            style.set('--uui-underline-origin', underlineOrigin);
        }

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
                ref={ref as React.Ref<never>}
                style={style.get()}
                tabIndex={disabled ? -1 : undefined}
                {...(isExternal &&
                    !disabled && {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                    })}
                {...rest}>
                {content}
            </Component>
        );
    }
) as unknown as LinkComponent;

Link.displayName = 'Link';
