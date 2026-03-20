import { CSSProperties } from 'react';

/**
 * Props for wrapper-level behavior.
 *
 * Applies outer layout such as margin, positioning and stacking.
 * Does not affect internal layout or content.
 *
 * @category Utils
 */
export type WrapperProps = {
    /** Margin on all sides. */
    m?: number | string;

    /** Horizontal margin (left + right). */
    mx?: number | string;

    /** Vertical margin (top + bottom). */
    my?: number | string;

    /** Margin top. */
    mt?: number | string;

    /** Margin bottom. */
    mb?: number | string;

    /** Margin left. */
    ml?: number | string;

    /** Margin right. */
    mr?: number | string;

    /** Top offset. */
    top?: number | string;

    /** Right offset. */
    right?: number | string;

    /** Bottom offset. */
    bottom?: number | string;

    /** Left offset. */
    left?: number | string;

    /** Stacking order. */
    zIndex?: number;

    /** CSS position value. */
    position?: CSSProperties['position'];
};

/**
 * Resolves wrapper props into style and remaining props.
 *
 * Margin shorthands priority:
 * mt/ml/... overrides mx/my, which overrides m.
 *
 * @function
 * @param props Wrapper configuration.
 * @returns Object containing wrapperStyle and otherProps.
 *
 * @category Utils
 */
export function getWrapperStyle(props: WrapperProps) {
    const { m, mx, my, mt, mb, ml, mr, top, right, bottom, left, zIndex, position, ...otherProps } = props;

    const style = {
        top,
        right,
        bottom,
        left,
        zIndex,
        position,
        margin: m,
        marginTop: mt ?? my,
        marginBottom: mb ?? my,
        marginLeft: ml ?? mx,
        marginRight: mr ?? mx,
    };

    // eslint-disable-next-line eqeqeq
    const wrapperStyle = Object.fromEntries(Object.entries(style).filter(([_, v]) => v != null)) as CSSProperties;

    return {
        wrapperStyle,
        otherProps,
    };
}
