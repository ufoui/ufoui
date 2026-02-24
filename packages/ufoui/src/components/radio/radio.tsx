import { forwardRef } from 'react';

import { CheckboxBase, CheckboxBaseProps } from '../base/checkboxBase';
import { BorderColor } from '../../utils';
import { RadioIcon } from '../../assets';

/**
 * Props for the Radio component.
 *
 * Extends {@link CheckboxBaseProps} with radio-specific defaults
 * and removes indeterminate-related options.
 *
 * @category Radio
 */
export type RadioProps = Omit<
  CheckboxBaseProps,
  'type' | 'elementClass' | 'indeterminateIcon' | 'indeterminate'
>;

/**
 * Radio button component built on top of {@link CheckboxBase}.
 *
 * Provides radio-specific defaults, circular shape,
 * and checked icon rendering.
 *
 * @param props Component properties.
 * @function
 *
 * @example
 * <Radio label="Option A" />
 *
 * @example
 * <Radio
 *   label="Option B"
 *   checked
 * />
 *
 * @category Radio
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      uncheckedBorder,
      border,
      color,
      borderColor,
      uncheckedBorderColor,
      shape = 'round',
      size = 'small',
      filled = false,
      icon,
      uncheckedIcon,
      animation,
      ...props
    }: RadioProps,
    ref,
  ) => {
    const finalColor = color ?? 'primary';
    const finalBorder = !icon && border === undefined ? 2 : border;
    const finalUncheckedBorder =
      uncheckedBorder ?? border ?? (uncheckedIcon ? undefined : 2);
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
        elementClass="uui-radio"
        filled={filled}
        icon={icon ?? RadioIcon}
        indeterminateIcon={undefined}
        ref={ref}
        shape={shape}
        size={size}
        type="radio"
        uncheckedBorder={finalUncheckedBorder}
        uncheckedBorderColor={finalUncheckedBorderColor}
        uncheckedIcon={uncheckedIcon}
        {...props}
      />
    );
  },
);

Radio.displayName = 'Radio';
