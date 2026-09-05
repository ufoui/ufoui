import React, { ElementType, forwardRef, ReactNode } from 'react';

import {
    BaseColor,
    cn,
    ControlStyle,
    ElementEffects,
    ElementFont,
    getEffects,
    getFontClass,
    getWrapperStyle,
    PolymorphicComponent,
    PolymorphicProps,
    WrapperProps,
} from '../../utils';
import { Leading, Trailing } from '../../internal';

/**
 * Underline visibility behavior.
 *
 * @category Link
 */
export type UnderlineVisibility = 'none' | 'hover' | 'always';

/**
 * Underline configuration.
 *
 * Groups the underline axes of a link. Each axis is optional and overrides the default independently.
 *
 * @category Link
 */
export interface UnderlineConfig {
    /** When the underline is visible. @default 'hover' */
    visibility?: UnderlineVisibility;

    /** Underline animation type. @default 'fade' */
    animation?: 'fade' | 'scale';

    /** Transform origin of the `'scale'` animation. Ignored for `'fade'`. @default 'left' */
    origin?: 'left' | 'center';
}

/**
 * Underline value.
 *
 * Can be provided as a {@link UnderlineVisibility} shorthand or as a full {@link UnderlineConfig} object.
 *
 * @category Link
 */
export type ElementUnderline = UnderlineVisibility | UnderlineConfig;

/**
 * Own props for {@link Link}.
 *
 * Polymorphic inline link that can render as a native anchor or custom navigation component.
 * Supports optional leading/trailing visuals, underline behavior, and interaction effects.
 *
 * @category Link
 */
interface LinkOwnProps extends WrapperProps {
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

    /** Underline behavior - visibility shorthand or full configuration. @default 'hover' */
    underline?: ElementUnderline;

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

    /** Interaction visual effects, or `'none'` to disable them all. */
    effects?: ElementEffects;
}

/**
 * Props for {@link Link}.
 *
 * @typeParam T - Element type rendered by the component.
 *
 * @category Link
 */
export type LinkProps<T extends ElementType = 'a'> = PolymorphicProps<T, LinkOwnProps>;

/**
 * Call signature of {@link Link}.
 *
 * @category Link
 */
export type LinkComponent = PolymorphicComponent<LinkOwnProps, 'a'>;

/**
 * Interactive text link with optional leading/trailing content and configurable underline animation.
 *
 * The component is polymorphic via the `as` prop and forwards remaining props to the rendered element.
 * When `external` is enabled, secure external-link attributes are applied to the rendered element.
 * When `disabled` is enabled, click handling is blocked and the element is removed from tab order.
 *
 * @remarks
 * Supported effects:
 * - `hover`, `pressed` - `'overlay'`
 * - `focus` - `'ring'`, `'overlay'`
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
 * <Link href="/docs" label="Documentation" underline={{ animation: 'scale', origin: 'center' }} />
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
        underline,
        font = 'labelLarge',
        external,
        label,
        className,
        style,
        disabled,
        onClick,
        effects,
        'aria-label': ariaLabel,
        ...props
    } = rawProps;

    const { wrapperStyle, otherProps } = getWrapperStyle(props);
    const cs = ControlStyle(wrapperStyle);
    cs.merge(style);
    cs.text(color);

    const finalEffects = getEffects(effects, {
        hover: ['overlay'],
        pressed: ['overlay'],
        focus: ['ring', 'overlay'],
    });

    const finalUnderline: UnderlineConfig =
        typeof underline === 'string' ? { visibility: underline } : (underline ?? {});

    if (finalUnderline.origin) {
        cs.set('--uui-underline-origin', finalUnderline.origin);
    }

    const Component = as ?? 'a';

    const stateClasses = cn(
        ...(finalEffects.focus?.includes('overlay') ? ['uui-focus-overlay'] : []),
        ...(finalEffects.hover?.includes('overlay') ? ['uui-hover-overlay'] : []),
        ...(finalEffects.pressed?.includes('overlay') ? ['uui-pressed-overlay'] : [])
    );

    const classes = cn(
        'uui-link',
        'uui-text-trigger',
        getFontClass(font),
        `uui-link-underline-${finalUnderline.visibility ?? 'hover'}`,
        finalUnderline.animation === 'scale' && 'uui-link-anim-scale',
        className,
        stateClasses,
        ...(finalEffects.focus?.includes('ring') ? ['uui-focus-ring'] : [])
    );

    const finalAriaLabel = ariaLabel ?? label ?? (typeof children === 'string' ? children : undefined);

    const content = (
        <span className="uui-link-content">
            <Leading content={leading} />
            <span className="uui-link-text">{children ?? label}</span>
            <Trailing content={trailing} />
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
            style={cs.get()}
            tabIndex={disabled ? -1 : undefined}
            {...(external && !disabled
                ? {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                  }
                : {})}
            {...otherProps}>
            {content}
        </Component>
    );
};

export const Link = forwardRef(LinkInner) as LinkComponent;

Link.displayName = 'Link';
