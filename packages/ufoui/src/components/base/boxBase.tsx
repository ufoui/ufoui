import { CSSProperties, ElementType, forwardRef, HTMLAttributes, ReactNode } from 'react';

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
    getWrapperStyle,
    SurfaceColor,
    WrapperProps,
} from '../../utils';

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
export interface BoxBaseProps extends Omit<HTMLAttributes<HTMLElement>, 'color' | 'content'>, WrapperProps {
    /** Maps to `align-content` (grid/flex-wrap content alignment). */
    alignContent?: CSSProperties['alignContent'];

    /** Maps to `align-items` (cross-axis alignment). */
    alignItems?: CSSProperties['alignItems'];

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
    component?: ElementType;

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

    /** Font token controlling typography (size, weight, line-height). */
    font?: ElementFont;

    /** Forces full height (100%). */
    fullHeight?: boolean;

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
    justifyContent?: CSSProperties['justifyContent'];

    /** Padding (all sides). */
    p?: number | string;

    /** Padding bottom. */
    pb?: number | string;

    /** Padding left. */
    pl?: number | string;

    /** Maps to `place-items` (grid shortcut for align+justify items). */
    placeItems?: CSSProperties['placeItems'];

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

    /** Width. */
    w?: number | string;
    /** Height. */
    h?: number | string;
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
        font,
        fullHeight,
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
        w,
        h,
        ...other
    } = props;
    const Tag: ElementType = component ?? 'div';
    const { wrapperStyle, otherProps } = getWrapperStyle(other);
    const controlStyle = ControlStyle(wrapperStyle);
    controlStyle.merge(style);

    const layoutProps: CSSProperties = {
        width: w ?? (fullWidth ? '100%' : undefined),
        height: h ?? (fullHeight ? '100%' : undefined),
        padding: p,
        paddingTop: pt ?? py,
        paddingBottom: pb ?? py,
        paddingLeft: pl ?? px,
        paddingRight: pr ?? px,
        gap: gap,
        columnGap: gapX,
        rowGap: gapY,
        justifyContent,
        alignItems,
        placeItems,
        alignContent,
        flexWrap: wrap && type === 'flex' ? 'wrap' : undefined,
        gridTemplateColumns: type === 'grid' ? (typeof cols === 'number' ? `repeat(${cols}, 1fr)` : cols) : undefined,
        gridTemplateRows: type === 'grid' ? (typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows) : undefined,
    };

    controlStyle.merge(layoutProps);
    controlStyle.border(borderColor);

    controlStyle.bg(color);
    controlStyle.text.on(color);

    const resDir = row ? 'row' : col ? 'col' : direction;
    const classes = cn(
        className,
        'uui-box',
        elementClass,
        font && getFontClass(font),
        shape && getShapeClass(shape),
        elevation !== undefined && getElevationClass(elevation),
        border !== undefined && getBorderClass(border),
        grow && 'uui-grow',
        type === 'flex'
            ? inline
                ? 'uui-flex-inline'
                : 'uui-flex'
            : type === 'grid'
              ? inline
                  ? 'uui-grid-inline'
                  : 'uui-grid'
              : inline
                ? 'uui-inline-block'
                : 'uui-block',
        resDir && type === 'flex' && `uui-flex-${resDir}`,
        flow && type === 'grid' && `uui-grid-flow-${flow === 'col' ? 'col' : 'row'}`
    );

    return (
        <Tag className={classes} ref={ref} {...otherProps} style={controlStyle.get()}>
            {children}
        </Tag>
    );
});

BoxBase.displayName = 'BoxBase';
