import React, { ElementType, forwardRef, ReactNode } from 'react';

import {
    BaseColor,
    cn,
    ControlStyle,
    ElementFocusEffect,
    ElementFont,
    ElementHoverEffect,
    ElementPressedEffect,
    getFontClass,
} from '../../utils';
import { Leading, Trailing } from '../../internal';

/**
 * Props for {@link Link}.
 *
 * Polymorphic inline link that can render as a native anchor or custom navigation component.
 * Supports optional leading/trailing visuals, underline behavior, and interaction effects.
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

    /** Color token applied to text. */
    color?: BaseColor;

    /** Underline visibility behavior. */
    underline?: 'none' | 'hover' | 'always';

    /** Font token applied to content. */
    font?: ElementFont;

    /** Opens link in new tab with security attributes. */
    external?: boolean;

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
    /**
     * Renders a polymorphic link element.
     *
     * @typeParam T - Element type rendered by the component.
     * @param props - Link configuration and props for the rendered element type.
     */
    <T extends ElementType = 'a'>(props: LinkProps<T>): ReactNode;
    displayName?: string;
}

/**
 * Interactive text link with optional leading/trailing content and configurable underline animation.
 *
 * The component is polymorphic via the `as` prop and forwards remaining props to the rendered element.
 * When `external` is enabled and a valid `href` is present, secure external-link attributes are applied.
 * When `disabled` is enabled, click handling is blocked and the element is removed from tab order.
 *
 * @function
 * @param rawProps - Component properties.
 * @param ref - Forwarded ref to the rendered element.
 *
 * @category Link
 *
 * @example
 * <Link href="/docs" label="Documentation" />
 *
 * @example
 * <Link href="https://example.com" external underline="always">
 *     External docs
 * </Link>
 *
 * @example
 * <Link as={RouterLink} to="/settings" leading={<IconSettings />} label="Settings" />
 */

const LinkInner = <T extends ElementType = 'a'>(rawProps: LinkProps<T>, ref: React.Ref<Element>) => {
    const {
        as,
        children,
        leading,
        trailing,
        color,
        underline = 'hover',
        font = 'labelLarge',
        external,
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
    } = rawProps;

    const Component = as ?? 'a';
    const { onClick, ...rest } = props;
    const { href } = rest as { href?: unknown };

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
            aria-disabled={disabled || undefined}
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
            {...(external && href && !disabled
                ? {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                  }
                : {})}
            {...rest}>
            {content}
        </Component>
    );
};

export const Link = forwardRef(LinkInner) as LinkComponent;

Link.displayName = 'Link';
