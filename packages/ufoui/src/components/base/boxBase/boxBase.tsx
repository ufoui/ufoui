import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

import {
  ElementBorder,
  ElementElevation,
  ElementShape,
  getBorderClass,
  getElevationClass,
  getShapeClass,
} from '@ufoui/utils';

import {
  BorderColor,
  ControlStyle,
  getBorderColor,
  SurfaceColor,
} from '../../../utils/color';

/**
 * Layout mode for {@link BoxBase}.
 *
 * @remarks
 * Determines how children are arranged:
 * - `'flex'` — flex container
 * - `'grid'` — grid container
 * - `'block'` — block or inline-block element
 *
 * @category Box
 */
export type BoxType = 'flex' | 'grid' | 'block';

/**
 * Direction value used by layout-related props.
 *
 * @category Box
 */
export type BoxDirection = 'row' | 'col';

/**
 * Props for {@link BoxBase}.
 *
 * @remarks
 * Provides full control over layout, spacing, shape, elevation,
 * borders and flex/grid behaviour. All props are optional.
 *
 * @category Box
 */
export interface BoxBaseProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  /** Maps to `align-content` (grid/flex-wrap content alignment). */
  alignContent?: React.CSSProperties['alignContent'];

  /** Maps to `align-items` (cross-axis alignment). */
  alignItems?: React.CSSProperties['alignItems'];

  /** Border width (0–5). */
  border?: ElementBorder;

  /** Border color token. */
  borderColor?: BorderColor;

  /** React children inside the box. */
  children?: ReactNode;

  /** Layout direction shortcut. Same as `direction="col"`. */
  col?: boolean;

  /** Surface background token. Default: `'surface'`. */
  color?: SurfaceColor;

  /** Grid template columns (`3` → `repeat(3, 1fr)`). */
  cols?: number | string;

  /** Custom HTML element/component. Default: `div`. */
  component?: React.ElementType;

  /** Layout direction (`row` or `col`) for flex. Ignored if `row` or `col` is set. */
  direction?: BoxDirection;

  /** Native disabled attribute. Applied when supported by the rendered element. */
  disabled?: boolean;

  /** Semantic UUI element class (e.g. 'uui-section', 'uui-footer'). */
  elementClass?: string;

  /** Elevation level (0–5). */
  elevation?: ElementElevation;

  /** Auto-placement flow direction for grid layouts. */
  flow?: BoxDirection;

  /** Forces full width (100%). */
  fullWidth?: boolean;

  /** Gap between children (flex/grid). */
  gap?: number | string;

  /** Horizontal gap (`column-gap`). */
  gapX?: number | string;

  /** Vertical gap (`row-gap`). */
  gapY?: number | string;

  /** Enables flex-grow (fills remaining space). */
  grow?: boolean;

  /** Renders as `inline-flex`, `inline-grid` or `inline-block`. */
  inline?: boolean;

  /** Maps to `justify-content` (main-axis alignment). */
  justifyContent?: React.CSSProperties['justifyContent'];

  /** Padding (all sides). */
  p?: number | string;

  /** Padding bottom. */
  pb?: number | string;

  /** Padding left. */
  pl?: number | string;

  /** Maps to `place-items` (grid shortcut for align+justify items). */
  placeItems?: React.CSSProperties['placeItems'];

  /** Padding right. */
  pr?: number | string;

  /** Padding top. */
  pt?: number | string;

  /** Horizontal padding (`padding-left` + `padding-right`). */
  px?: number | string;

  /** Vertical padding (`padding-top` + `padding-bottom`). */
  py?: number | string;

  /** Layout direction shortcut. Same as `direction="row"`. */
  row?: boolean;

  /** Grid template rows (`2` → `repeat(2, 1fr)`). */
  rows?: number | string;

  /** Shape/border-radius token (round, rounded, smooth, square). */
  shape?: ElementShape;

  /** Layout mode (`flex`, `grid`, `block`). Default: `flex`. */
  type?: BoxType;

  /** Enables wrapping (`flex-wrap: wrap`). */
  wrap?: boolean;
}

/**
 * `BoxBase` — core layout primitive powering all semantic containers
 * (`Box`, `Section`, `Article`, `Aside`, `Header`, `Footer`, `Nav`).
 *
 * Provides low-level control over layout (flex, grid, block),
 * spacing, alignment, wrapping, elevation, borders, shape, and surface color.
 * This component does **not** impose visual design — higher-level
 * components add semantics, but rely on `BoxBase` for structure.
 *
 * Accepts both semantic styling props (color, shape, elevation)
 * and layout utilities (padding, gap, direction, wrap, justify, align).
 *
 * @function
 * @param props - Component properties.
 *
 * @example
 * ```tsx
 * <BoxBase p={16} gap={8} direction="col" elevation={2}>
 *   <Item />
 *   <Item />
 * </BoxBase>
 * ```
 *
 * @category Box
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export const BoxBase = forwardRef<HTMLElement, BoxBaseProps>((props, ref) => {
  const {
    type = 'flex',
    inline = false,
    color,
    elevation,
    shape,
    border,
    direction,
    flow,
    borderColor,
    elementClass,
    children,
    className,
    style,
    fullWidth,
    grow,
    p,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    gap,
    gapX,
    gapY,
    justifyContent,
    alignItems,
    placeItems,
    alignContent,
    wrap,
    cols,
    rows,
    component,
    row,
    col,
    ...other
  } = props;

  const Tag: React.ElementType = component ?? 'div';
  const controlStyle = ControlStyle(style);

  if (border && +border > 0) {
    controlStyle.border(getBorderColor(borderColor));
  }
  controlStyle.bg(color);
  controlStyle.text.on(color);

  const layoutClasses: string[] = [];
  if (type === 'flex') {
    layoutClasses.push(inline ? 'uui-flex-inline' : 'uui-flex');
  } else if (type === 'grid') {
    layoutClasses.push(inline ? 'uui-grid-inline' : 'uui-grid');
  } else {
    layoutClasses.push(inline ? 'uui-inline-block' : 'uui-block');
  }

  if (fullWidth) {
    layoutClasses.push('uui-full');
  }

  if (grow) {
    layoutClasses.push('uui-grow');
  }

  if (p !== undefined) {
    controlStyle.set('padding', p);
  }
  if (px !== undefined) {
    controlStyle.set('paddingLeft', px);
    controlStyle.set('paddingRight', px);
  }
  if (py !== undefined) {
    controlStyle.set('paddingTop', py);
    controlStyle.set('paddingBottom', py);
  }
  if (pt !== undefined) {
    controlStyle.set('paddingTop', pt);
  }
  if (pb !== undefined) {
    controlStyle.set('paddingBottom', pb);
  }
  if (pl !== undefined) {
    controlStyle.set('paddingLeft', pl);
  }
  if (pr !== undefined) {
    controlStyle.set('paddingRight', pr);
  }

  if (gap !== undefined) {
    controlStyle.set('gap', gap);
  }
  if (gapX !== undefined) {
    controlStyle.set('columnGap', gapX);
  }
  if (gapY !== undefined) {
    controlStyle.set('rowGap', gapY);
  }

  if (justifyContent !== undefined) {
    controlStyle.set('justifyContent', justifyContent);
  }
  if (alignItems !== undefined) {
    controlStyle.set('alignItems', alignItems);
  }
  if (placeItems !== undefined) {
    controlStyle.set('placeItems', placeItems);
  }

  if (alignContent !== undefined) {
    controlStyle.set('alignContent', alignContent);
  }

  if (wrap) {
    controlStyle.set('flexWrap', 'wrap');
  }

  if (type === 'grid') {
    if (cols !== undefined) {
      controlStyle.set(
        'gridTemplateColumns',
        typeof cols === 'number' ? `repeat(${cols}, 1fr)` : cols,
      );
    }
    if (rows !== undefined) {
      controlStyle.set(
        'gridTemplateRows',
        typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows,
      );
    }
  }

  const resolvedDirection: BoxDirection | undefined =
    (row ? 'row' : undefined) ?? (col ? 'col' : undefined) ?? direction;
  let directionClass = '';
  if (resolvedDirection && type === 'flex') {
    directionClass =
      resolvedDirection === 'col' ? 'uui-flex-col' : 'uui-flex-row';
  }

  let flowClass = '';
  if (flow && type === 'grid') {
    flowClass = flow === 'col' ? 'uui-grid-flow-col' : 'uui-grid-flow-row';
  }

  const classes = [
    'uui-box',
    elementClass,
    ...layoutClasses,
    ...(shape ? [getShapeClass(shape)] : []),
    ...(elevation !== undefined ? [getElevationClass(elevation)] : []),
    ...(border !== undefined ? [getBorderClass(border)] : []),
    directionClass,
    flowClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} ref={ref} {...other} style={controlStyle.get()}>
      {children}
    </Tag>
  );
});

BoxBase.displayName = 'BoxBase';
