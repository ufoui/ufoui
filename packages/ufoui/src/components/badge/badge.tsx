import { HTMLAttributes } from 'react';

import {
  ElementAlign,
  ElementBorder,
  ElementElevation,
  ElementFont,
  ElementShape,
  ElementSize,
  getAlignClass,
  getBorderClass,
  getElevationClass,
  getFontClass,
  getShapeClass,
  getSizeClass,
} from '../../utils/utils';
import {
  BorderColor,
  ControlStyle,
  getBorderColor,
  SemanticColor,
} from '../../utils/color';

/**
 * Props for the Badge component.
 *
 * Small visual indicator used to display a value or status.
 *
 * @category Badge
 */
export interface BadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'ref' | 'size'> {
  /** Position relative to the parent element. */
  align?: ElementAlign;

  /** Accessible label for screen readers when badge conveys information. */
  ariaLabel?: string;

  /** Border width when outlined. */
  border?: ElementBorder;

  /** Border color when outlined. */
  borderColor?: BorderColor;

  /** Semantic background color. */
  color?: SemanticColor;

  /** Elevation level for raised appearance. */
  elevation?: ElementElevation;

  /** Font token applied to the badge text. */
  font?: ElementFont;

  /** Visual offset applied to the badge position. */
  offset?: number;

  /** Shape of the badge. */
  shape?: ElementShape;

  /** Visual size of the badge. */
  size?: ElementSize;

  /** Value displayed inside the badge. */
  value: string | number;
}

/**
 * Displays a small badge with a value or indicator.
 *
 * Can be rendered standalone or attached to a child element.
 * When size is small or extraSmall, the value is hidden.
 *
 * @function Badge
 * @param props Component properties.
 *
 * @example
 * <Badge value={3} color="info" />
 *
 * @example
 * <Badge value={5} color="warning">
 *   <Button />
 * </Badge>
 *
 * @category Badge
 */
export const Badge = (props: BadgeProps) => {
  const {
    children,
    className,
    border,
    borderColor,
    color = 'error',
    align = 'topRight',
    shape = 'round',
    size = 'medium',
    elevation,
    ariaLabel,
    value,
    font,
    offset,
    ...rest
  } = props;
  const containerClass = 'uui-badge';
  const finalFont =
    font ??
    (size === 'extraLarge' || size === 'large' ? 'labelMedium' : 'labelSmall');
  const controlClasses = [
    'uui-badge-control',
    className,
    getShapeClass(shape),
    getSizeClass(size),
    getFontClass(finalFont),
  ];
  const slotClass: string = ['uui-badge-slot', getAlignClass(align)]
    .filter(Boolean)
    .join(' ');

  const controlStyle = ControlStyle();
  controlStyle.bg(color);
  controlStyle.text.on(color);

  if (offset !== undefined) {
    controlStyle.set('--uui-badge-offset', `${offset}px`);
  }

  if (elevation !== undefined) {
    controlClasses.push(getElevationClass(elevation));
  }

  if (border !== undefined) {
    controlClasses.push(getBorderClass(border));
    controlStyle.border(getBorderColor(borderColor));
  }

  const controlClass = controlClasses.filter(Boolean).join(' ');
  const control = (
    <span
      aria-label={ariaLabel}
      className={controlClass}
      style={controlStyle.get()}
    >
      {size !== 'small' && size !== 'extraSmall' && value}
    </span>
  );
  return children ? (
    <span className={containerClass} {...rest}>
      {children}
      <span className={slotClass}>{control}</span>
    </span>
  ) : (
    control
  );
};

Badge.displayName = 'Badge';
