import React, { forwardRef } from 'react';

import {
  ElementDensity,
  ElementElevation,
  ElementOrientation,
  ElementShape,
  getDensityClass,
  getElevationClass,
  getShapeClass,
  SurfaceColor,
} from '../../utils';
import { BoxBase, BoxBaseProps } from '../base/boxBase/boxBase';

/**
 * Props for {@link Toolbar}.
 * Extends {@link BoxBaseProps} except for `component` and `elementClass`.
 *
 * @category Toolbar
 */
export interface ToolbarProps
  extends Omit<
    BoxBaseProps,
    'component' | 'elementClass' | 'direction' | 'row' | 'col'
  > {
  /** Visual variant of the toolbar. */
  variant?: 'docked' | 'floating';

  /** Surface color token applied to container. */
  color?: SurfaceColor;

  /** Elevation token. */
  elevation?: ElementElevation;

  /** Shape token. */
  shape?: ElementShape;

  /** Density token. */
  density?: ElementDensity;

  /** Makes toolbar full width. */
  fullWidth?: boolean;

  /** Positions floating toolbar. */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';

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
      density,
      fullWidth,
      position = 'bottom',
      fixed,
      divider,
      children,
      className,
      disabled,
      orientation = 'horizontal',
      ...props
    },
    ref,
  ) => {
    const isFloating = variant === 'floating';
    const finalElevation = elevation ?? (isFloating ? 3 : 0);
    const finalShape = shape ?? (isFloating ? 'round' : undefined);
    const finalColor =
      color ??
      (variant === 'floating' ? 'surfaceContainerHigh' : 'surfaceContainer');

    const classes = [
      'uui-toolbar',
      `uui-toolbar-${variant}`,
      disabled && 'uui-disabled',
      className,
      fullWidth && 'uui-toolbar-full',
      fixed && 'uui-toolbar-fixed',
      divider && 'uui-toolbar-divider',
      finalElevation && getElevationClass(finalElevation),
      finalShape && getShapeClass(finalShape),
      density && getDensityClass(density),
      orientation === 'horizontal' ? 'uui-horizontal' : 'uui-vertical',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <BoxBase
        ref={ref}
        {...props}
        className={classes}
        color={finalColor}
        component="div"
        data-position={position}
        direction={orientation === 'horizontal' ? 'row' : 'col'}
        disabled={disabled}
      >
        {children}
      </BoxBase>
    );
  },
);

Toolbar.displayName = 'Toolbar';
