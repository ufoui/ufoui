import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

import {
  ElementBorder,
  ElementElevation,
  ElementFont,
  ElementShape,
  getBorderClass,
  getElevationClass,
  getFontClass,
  getShapeClass,
} from '../../../utils/utils';
import {
  BorderColor,
  ControlStyle,
  getBorderColor,
  SurfaceColor,
} from '../../../utils/color';

/**
 * Props for {@link TextBase}.
 *
 * Defines typography and visual styling for text-level elements
 * without introducing layout behaviour.
 *
 * @category Text
 */
export interface TextBaseProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  /** Custom HTML element/component. Default: span. */
  component?: React.ElementType;

  /** Font token controlling typography (size, weight, line-height). */
  font?: ElementFont;

  /** Surface background token. */
  color?: SurfaceColor;

  /** Elevation level (0–5). */
  elevation?: ElementElevation;

  /** Shape/border-radius token. */
  shape?: ElementShape;

  /** Border width (0–5). */
  border?: ElementBorder;

  /** Border color token. */
  borderColor?: BorderColor;

  /** Semantic UUI element class (e.g. uui-text, uui-heading). */
  elementClass?: string;

  /** Text content. */
  children?: ReactNode;
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
    component,
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

  const Tag: React.ElementType = component ?? 'span';
  const controlStyle = ControlStyle(style);

  if (border && +border > 0) {
    controlStyle.border(getBorderColor(borderColor));
  }

  controlStyle.bg(color);
  controlStyle.text.on(color);

  const classes = [
    'uui-inline',
    elementClass,
    ...(font ? [getFontClass(font)] : []),
    ...(shape ? [getShapeClass(shape)] : []),
    ...(elevation !== undefined ? [getElevationClass(elevation)] : []),
    ...(border !== undefined ? [getBorderClass(border)] : []),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} ref={ref} style={controlStyle.get()} {...other}>
      {children}
    </Tag>
  );
});

TextBase.displayName = 'TextBase';
