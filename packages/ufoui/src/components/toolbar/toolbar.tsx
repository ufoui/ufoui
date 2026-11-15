import React, { forwardRef } from 'react';

import {
    cn,
    ControlStyle,
    ElementDensity,
    ElementElevation,
    ElementOrientation,
    ElementShape,
    ElementSize,
    getDensityClass,
    getElevationClass,
    getOnColorName,
    getShapeClass,
    getSizeClass,
    SurfaceColor,
} from '../../utils';
import { BoxBase, BoxBaseProps } from '../base';
import { useSelection } from '../../hooks';

/**
 * Props for {@link Toolbar}.
 * Extends {@link BoxBaseProps} except for `as` and `elementClass`.
 *
 * @category Toolbar
 */
export interface ToolbarProps extends Omit<BoxBaseProps, 'as' | 'elementClass' | 'direction'> {
    /** Visual variant of the toolbar. */
    variant?: 'docked' | 'floating';

    /** Surface color token applied to container. */
    color?: SurfaceColor;

    /** Elevation token. */
    elevation?: ElementElevation;

    /** Shape token. */
    shape?: ElementShape;

    /** Size token controlling bar height (width when vertical). @default 'medium' */
    size?: ElementSize;

    /** Density token. */
    density?: ElementDensity;

    /** Keeps default control colors instead of deriving them from the toolbar color. */
    keepChildColors?: boolean;

    /** Makes toolbar full width. */
    fullWidth?: boolean;

    /** Positions floating toolbar. */
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';

    /** Makes floating toolbar fixed. */
    fixed?: boolean;

    /** Main content area. */
    children?: React.ReactNode;

    /** Adds divider line below toolbar. */
    divider?: boolean;

    orientation?: ElementOrientation;

    /** Additional root class name. */
    className?: string;
}

/**
 * Expressive contextual action container based on MD3 Toolbar.
 *
 * Supports docked and floating variants.
 *
 * @function
 * @example
 * <Toolbar
 *   variant="floating"
 * >
 *   <IconButton />
 *   <IconButton />
 * </Toolbar>
 *
 * @category Toolbar
 */
export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
    (
        {
            variant = 'docked',
            color,
            elevation,
            shape,
            size = 'medium',
            density,
            keepChildColors,
            fullWidth,
            placement = 'bottom',
            fixed,
            divider,
            children,
            className,
            style,
            disabled,
            orientation = 'horizontal',
            ...props
        },
        ref
    ) => {
        const finalDisabled = useSelection()?.disabled || disabled;
        const isFloating = variant === 'floating';
        const finalElevation = elevation ?? (isFloating ? 3 : 0);
        const finalShape = shape ?? (isFloating ? 'round' : undefined);
        const finalColor = color ?? (variant === 'floating' ? 'surfaceContainerHigh' : 'surfaceContainer');
        const controlStyle = ControlStyle(style);
        controlStyle.token('--uui-control-color', keepChildColors ? undefined : getOnColorName(finalColor, true));

        const classes = cn(
            'uui-toolbar',
            `uui-toolbar-${variant}`,
            finalDisabled && 'uui-disabled',
            className,
            fullWidth && 'uui-toolbar-full',
            fixed && 'uui-toolbar-fixed',
            divider && 'uui-toolbar-divider',
            !!finalElevation && getElevationClass(finalElevation),
            finalShape && getShapeClass(finalShape),
            getSizeClass(size),
            density && getDensityClass(density),
            orientation === 'horizontal' ? 'uui-horizontal' : 'uui-vertical'
        );

        return (
            <BoxBase
                ref={ref}
                {...props}
                as="div"
                className={classes}
                color={finalColor}
                data-position={placement}
                direction={orientation === 'horizontal' ? 'row' : 'col'}
                disabled={finalDisabled}
                style={controlStyle.get()}>
                {children}
            </BoxBase>
        );
    }
);

Toolbar.displayName = 'Toolbar';
