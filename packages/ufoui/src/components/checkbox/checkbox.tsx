import { forwardRef } from 'react';

import { BorderColor } from '../../utils';
import { CheckboxBase, CheckboxBaseProps } from '../base';
import { CheckmarkIcon, IndeterminateIcon } from '../../assets';

/**
 * Props for the Checkbox component.
 *
 * Extends {@link CheckboxBaseProps} with preset defaults
 * for checkbox-specific behavior.
 *
 * @category Checkbox
 */
export type CheckboxProps = Omit<CheckboxBaseProps, 'type' | 'elementClass'>;

/**
 * Checkbox component built on top of {@link CheckboxBase}.
 *
 * Provides default checkbox icons, filled style,
 * and sensible border defaults.
 *
 * @param props Component properties.
 * @function
 *
 * @example
 * <Checkbox label="Accept terms" />
 *
 * @example
 * <Checkbox
 *   label="Select all"
 *   indeterminate
 * />
 *
 * @category Checkbox
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      shape = 'smooth',
      border,
      uncheckedBorder,
      color,
      borderColor,
      animation,
      uncheckedBorderColor,
      uncheckedIcon,
      indeterminateIcon,
      indeterminate,
      icon,
      size = 'small',
      filled = true,
      ...props
    }: CheckboxProps,
    ref,
  ) => {
    const finalColor = color ?? 'primary';
    const finalBorder = !icon && border === undefined ? undefined : border;
    let finalUncheckedBorder;
    if (indeterminate) {
      finalUncheckedBorder = border;
    } else {
      finalUncheckedBorder =
        !uncheckedIcon && uncheckedBorder === undefined
          ? (border ?? 2)
          : uncheckedBorder;
    }
    const finalBorderColor = borderColor ?? finalColor;
    const finalUncheckedBorderColor =
      uncheckedBorderColor ??
      borderColor ??
      ('onSurfaceVariant' as BorderColor);
    return (
      <CheckboxBase
        animation={animation ?? 'scale'}
        border={finalBorder}
        borderColor={finalBorderColor}
        color={finalColor}
        elementClass="uui-checkbox"
        filled={filled}
        icon={icon ?? CheckmarkIcon}
        indeterminate={indeterminate}
        indeterminateIcon={indeterminateIcon ?? IndeterminateIcon}
        ref={ref}
        shape={shape}
        size={size}
        type="checkbox"
        uncheckedBorder={finalUncheckedBorder}
        uncheckedBorderColor={finalUncheckedBorderColor}
        uncheckedIcon={uncheckedIcon}
        {...props}
      />
    );
  },
);

Checkbox.displayName = 'Checkbox';
