import { forwardRef, ReactElement } from 'react';

import { ElementFont, ElementSize } from '../../utils';
import { ButtonBase, ButtonBaseProps } from '../base/buttonBase/buttonBase';

/**
 * Props for {@link Fab}.
 * Extends {@link ButtonBaseProps}.
 *
 * @category Fab
 */
export interface FabButtonProps extends Omit<ButtonBaseProps, 'elementClass'> {
  /** Icon rendered inside the FAB. */
  icon: ReactElement;
}

/**
 * Floating action button used for primary contextual actions.
 *
 * Use to highlight the main action on a screen, such as create, add,
 * or compose. Supports regular and extended variants (with label).
 *
 * @category Fab
 * @function
 * @param props - All FAB props inherited from {@link ButtonBase}.
 *
 * @example
 * <Fab icon={<AddIcon />} />
 *
 * @example
 * <Fab icon={<AddIcon />} label="Create" />
 */
export const Fab = forwardRef<HTMLButtonElement, FabButtonProps>(
  (
    {
      elevation = 3,
      font,
      size = 'medium',
      shape = 'rounded',
      label,
      ...props
    }: FabButtonProps,
    ref,
  ) => {
    const elementClass = label ? 'uui-fab uui-fab-extended' : 'uui-fab';
    const fontMap: Record<ElementSize, ElementFont> = {
      extraSmall: 'labelLarge',
      small: 'titleMedium',
      medium: 'titleMedium',
      large: 'headlineSmall',
      extraLarge: 'headlineLarge',
    };
    return (
      <ButtonBase
        ref={ref}
        {...props}
        elementClass={elementClass}
        elevation={elevation}
        font={font ?? fontMap[size]}
        label={label}
        shape={shape}
        size={size}
      />
    );
  },
);

Fab.displayName = 'Fab';
