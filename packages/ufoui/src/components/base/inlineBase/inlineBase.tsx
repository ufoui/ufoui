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
} from '@ufoui/utils';

import {
  BorderColor,
  ControlStyle,
  getBorderColor,
  SurfaceColor,
} from '../../../utils/color';

/**
 * Props for {@link InlineBase}.
 *
 * @remarks
 * Defines visual and typographic styling for inline-level elements
 * without imposing any layout behaviour.
 *
 * @category Inline
 */
export interface InlineBaseProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  /** Custom HTML element/component. Default: `span`. */
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

  /** Renders as `inline-block` instead of `inline`. */
  inlineBlock?: boolean;

  /** Semantic UUI element class (e.g. 'uui-text', 'uui-heading'). */
  elementClass?: string;

  /** Inline content. */
  children?: ReactNode;
}

/**
 * `InlineBase` — core primitive for inline semantic components.
 *
 * Provides typography, color, border, shape and elevation styling
 * for inline-level elements without introducing layout semantics.
 *
 * Intended as a foundation for components such as `Text`, `Heading`,
 * `Label`, `Code`, or inline UI tokens.
 *
 * @category Inline
 * @function
 * @param props - Inline styling and typography props.
 *
 * @example
 * ```tsx
 * <InlineBase font="bodyMedium">
 *   Inline text
 * </InlineBase>
 * ```
 *
 * @example
 * ```tsx
 * <InlineBase component="h2" font="headlineSmall">
 *   Section title
 * </InlineBase>
 * ```
 */
export const InlineBase = forwardRef<HTMLElement, InlineBaseProps>(
  (props, ref) => {
    const {
      component,
      font,
      color,
      elevation,
      shape,
      border,
      borderColor,
      inlineBlock,
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
      inlineBlock ? 'uui-inline-block' : 'uui-inline',
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
  },
);

InlineBase.displayName = 'InlineBase';
