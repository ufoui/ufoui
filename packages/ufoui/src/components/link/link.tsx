import React, { ElementType, forwardRef, ReactNode } from 'react';

import {
    cn,
    ControlStyle,
    ElementEffects,
    ElementFont,
    getEffects,
    getFontClass,
    getWrapperStyle,
    PolymorphicComponent,
    PolymorphicProps,
    TextColor,
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
    color?: TextColor;

    /** When the underline is visible. @default 'hover' */
    underline?: UnderlineVisibility;

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
        `uui-link-underline-${underline ?? 'hover'}`,
        className,
        stateClasses,
        ...(finalEffects.focus?.includes('ring') ? ['uui-focus-ring-inline'] : [])
    );

    // eslint-disable-next-line eqeqeq
    const finalAriaLabel = ariaLabel ?? (children != null ? label : undefined);

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

/**
 * Interactive text link with optional leading/trailing content and configurable underline behavior.
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
 * @category Link
 * @function
 * @param props - Link content, color, underline behavior and interaction effects.
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
export const Link = forwardRef(LinkInner) as LinkComponent;

Link.displayName = 'Link';
