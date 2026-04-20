import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

import {
    BorderColor,
    cn,
    ControlStyle,
    ElementBorder,
    ElementElevation,
    ElementFont,
    ElementShape,
    getBorderClass,
    getElevationClass,
    getFontClass,
    getShapeClass,
    SurfaceColor,
} from '../../utils';

/**
 * Props for {@link TextBase}.
 *
 * Defines typography and visual styling for text-level elements
 * without introducing layout behaviour.
 *
 * @category Text
 */
export interface TextBaseProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
    /** Custom HTML element/component. Default: span. */
    as?: React.ElementType;

    /** Border width (0–5). */
    border?: ElementBorder;

    /** Border color token. */
    borderColor?: BorderColor;

    /** Text content. */
    children?: ReactNode;

    /** Surface background token. */
    color?: SurfaceColor;

    /** Semantic UUI element class (e.g. uui-text, uui-heading). */
    elementClass?: string;

    /** Elevation level (0–5). */
    elevation?: ElementElevation;

    /** Font token controlling typography (size, weight, line-height). */
    font?: ElementFont;

    /** Shape/border-radius token. */
    shape?: ElementShape;
}

/**
 * TextBase — core typography primitive powering semantic text components.
 *
 * Provides font tokens, color, border, shape and elevation styling
 * for inline-level and text semantic elements.
 *
 * Intended as a foundation for components such as Text, Heading,
 * Label or other typography-driven UI elements.
 *
 * @category Text
 * @function
 * @param props - Typography and visual styling props.
 */
export const TextBase = forwardRef<HTMLElement, TextBaseProps>((props, ref) => {
    const {
        as,
        font,
        color,
        elevation,
        shape,
        border,
        borderColor,
        elementClass,
        children,
        className,
        style,
        ...other
    } = props;

    const Tag: React.ElementType = as ?? 'span';
    const controlStyle = ControlStyle(style);

    controlStyle.border(borderColor);
    controlStyle.bg(color);
    controlStyle.text.on(color);

    const classes = cn(
        'uui-inline',
        elementClass,
        ...(font ? [getFontClass(font)] : []),
        ...(shape ? [getShapeClass(shape)] : []),
        ...(elevation !== undefined ? [getElevationClass(elevation)] : []),
        ...(border !== undefined ? [getBorderClass(border)] : []),
        className
    );

    return (
        <Tag className={classes} ref={ref} style={controlStyle.get()} {...other}>
            {children}
        </Tag>
    );
});

TextBase.displayName = 'TextBase';
