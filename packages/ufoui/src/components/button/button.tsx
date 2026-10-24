import { forwardRef } from 'react';

import { ButtonBase, ButtonBaseProps } from '../base';
import { IS_ACTION } from '../actions/actions.guards';

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
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ size = 'small', ...props }: ButtonProps, ref) => {
    return <ButtonBase ref={ref} size={size} {...props} elementClass="uui-button" />;
});

Button.displayName = 'Button';
Object.assign(Button, { [IS_ACTION]: true });
