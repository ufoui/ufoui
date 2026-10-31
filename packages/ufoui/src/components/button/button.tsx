import { forwardRef } from 'react';

import { ButtonBase, ButtonBaseOwnProps, ButtonElement } from '../base';
import { IS_ACTION } from '../actions/actions.guards';
import { PolymorphicComponent, PolymorphicProps } from '../../utils';

type ButtonOwnProps = Omit<ButtonBaseOwnProps, 'animation' | 'elementClass' | 'open'>;

/**
 * Props for {@link Button}.
 * Extends {@link ButtonBaseProps}.
 *
 * @category Button
 */
export type ButtonProps<T extends ButtonElement = 'button'> = PolymorphicProps<T, ButtonOwnProps>;

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
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
    return <ButtonBase ref={ref} {...props} elementClass="uui-button" />;
}) as PolymorphicComponent<ButtonOwnProps, 'button', ButtonElement>;

Button.displayName = 'Button';
Object.assign(Button, { [IS_ACTION]: true });
