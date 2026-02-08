import { forwardRef, HTMLProps } from 'react';

import {
  ElementBorder,
  ElementElevation,
  ElementShape,
  ElementSize,
  getBorderClass,
  getElevationClass,
  getShapeClass,
  getSizeClass,
} from '@ufoui/utils';

import {
  BorderColor,
  getBorderColor,
  getBorderColorClass,
  getSemanticColorClasses,
  SemanticColor,
} from '../../utils/color';

/**
 * Props for the {@link Badge} component.
 *
 * @remarks
 * Badge displays a status or value in a small decorative label.
 * Supports customization of color, border, elevation, shape, size, and position.
 *
 * @category Component properties
 */
export interface AvatarProps
  extends Omit<HTMLProps<HTMLDivElement>, 'ref' | 'size'> {
  /** The value displayed inside the badge (e.g. a number or label). */
  label: string;

  /** Semantic color of the badge background (e.g. `'error'`, `'info'`). */
  color?: SemanticColor;

  /** Border width, e.g. `1` or `2`. Ignored if `outlined` is not set.
   * @default 1
   * */
  border?: ElementBorder;

  /** Color of the border when `outlined` is true. */
  borderColor?: BorderColor;

  /** Elevation depth if `raised` is true. */
  elevation?: ElementElevation;

  /** Size of the badge (`small`, `medium`, `large`). */
  size?: ElementSize;

  /** Shape of the badge, e.g. `'round'`, `'square'`. */
  shape?: ElementShape;

  /** If true, adds elevation shadow. */
  raised?: boolean;

  /** If true, renders the badge as outlined. */
  outlined?: boolean;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      children,
      className = '',
      border = 1,
      borderColor,
      color = 'primary',
      shape = 'round',
      size = 'medium',
      elevation = 1,
      outlined,
      raised,
      ...props
    }: AvatarProps,
    ref,
  ) => {
    const { bgColor, textOnColor } = getSemanticColorClasses(color);
    const classes = [
      'uui-avatar',
      'uui-wrapper',
      className,
      getSizeClass(size),
      bgColor,
      textOnColor,
      getShapeClass(shape),
      ...(outlined
        ? [
            getBorderColorClass(getBorderColor(borderColor)),
            getBorderClass(border),
          ]
        : []),
      ...(raised ? [getElevationClass(elevation)] : []),
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';
