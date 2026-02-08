import { forwardRef } from 'react';

import {
  ButtonBase,
  ButtonBaseProps,
  ElementFont,
  ElementSize,
} from '@ufoui/core';

/**
 * Props for {@link Button}.
 * Extends {@link ButtonBaseProps}.
 *
 * @category Button
 */
export type ButtonProps = Omit<ButtonBaseProps, 'elementClass'>;

/**
 * Primary action button used to trigger user actions.
 *
 * Use for actions such as submit, confirm, save, or navigate within the application.
 *
 * @category Button
 * @function
 * @param props - All button props inherited from {@link ButtonBase}.
 *
 * @example
 * <Button label="Save" filled />
 *
 * @example
 * <Button label="Cancel" />
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ font, size = 'small', ...props }: ButtonProps, ref) => {
    const fontMap: Record<ElementSize, ElementFont> = {
      extraSmall: 'labelLarge',
      small: 'labelLarge',
      medium: 'titleMedium',
      large: 'headlineSmall',
      extraLarge: 'headlineLarge',
    };
    return (
      <ButtonBase
        font={font ?? fontMap[size]}
        ref={ref}
        size={size}
        {...props}
        elementClass="uui-button"
      />
    );
  },
);

Button.displayName = 'Button';
