import { HTMLAttributes } from 'react';

import {
    BorderColor,
    cn,
    ControlStyle,
    ElementBorder,
    ElementElevation,
    ElementInset,
    ElementOrientation,
    ElementShape,
    getElevationClass,
    getShapeClass,
    getWrapperStyle,
    WrapperProps,
} from '../../utils';
import { IS_DIVIDER } from './divider.guards';

/**
 * Props for the {@link Divider} component.
 *
 * @remarks
 * Supports wrapper-level spacing and positioning props from {@link WrapperProps}
 * such as `m`, `mx`, `my`, `top`, `left`, `position`, and `zIndex`.
 *
 * @category Divider
 */
export interface DividerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>, WrapperProps {
    /** Line color token used for the divider. @default 'outlineVariant' */
    color?: BorderColor;

    /** Divider thickness (0–4). @default 1 */
    border?: ElementBorder;

    /** Line orientation. @default 'horizontal' */
    orientation?: ElementOrientation;

    /** Shortens the line at its start, end or both ends by `offset`. */
    inset?: ElementInset;

    /** Inset length in px, used with `inset`. @default 16 */
    offset?: number;

    /** Elevation level applied to the divider. */
    elevation?: ElementElevation;

    /** Corner shape applied to the divider. */
    shape?: ElementShape;

    /** Explicit height of a vertical divider. */
    height?: number | string;
}

/**
 * **Divider** - thin line used to separate content.
 *
 * Supports horizontal and vertical orientation, thickness,
 * inset offsets, color tokens, elevation and corner shapes.
 *
 * @remarks
 * Renders `role="separator"`; pass `aria-hidden` for a purely decorative line.
 *
 * @param props Component properties.
 * @function
 * @example
 * ```tsx
 * <Divider my={12} />
 * ```
 *
 * @example
 * ```tsx
 * <Divider inset="both" offset={12} orientation="vertical" />
 * ```
 *
 * @category Divider
 */
export const Divider = (props: DividerProps) => {
    const { className, color, border, inset, offset, orientation, elevation, shape, style, height, ...rawProps } =
        props;
    const vertical = orientation === 'vertical';
    const dividerClass = cn(
        'uui-divider',
        inset && `uui-divider-${inset}`,
        className,
        getElevationClass(elevation),
        shape && getShapeClass(shape)
    );
    const { wrapperStyle, otherProps } = getWrapperStyle(rawProps);
    const controlStyle = ControlStyle(wrapperStyle);
    controlStyle.merge(style);
    controlStyle.border(color);

    if (border !== undefined) {
        controlStyle.set('--uui-divider-width', `${border}px`);
    }

    if (offset !== undefined) {
        controlStyle.set('--uui-divider-offset', `${offset}px`);
    }

    if (vertical && height) {
        controlStyle.merge({ height, alignSelf: 'auto' });
    }

    return (
        <span
            aria-orientation={vertical ? 'vertical' : undefined}
            className={dividerClass}
            role="separator"
            style={controlStyle.get()}
            {...otherProps}
        />
    );
};

/**
 * Marks this component as a Divider for runtime type guards.
 *
 * Used internally to identify Divider elements via a shared Symbol.
 * Not part of the public API.
 *
 * @internal
 */
Divider[IS_DIVIDER] = true;
/**
 * Display name used by React DevTools.
 *
 * @internal
 */
Divider.displayName = 'Divider';
