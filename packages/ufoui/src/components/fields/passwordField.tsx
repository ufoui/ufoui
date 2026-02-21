import { forwardRef } from 'react';
import { FieldBase, FieldBaseProps } from '../base/fieldBase';

/**
 * Props for {@link PasswordField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category PasswordField
 */
export type PasswordFieldProps = Omit<FieldBaseProps, 'elementClass' | 'type'>;

/**
 * Password field component used to enter secure text input.
 *
 * Use for authentication and protected form data.
 *
 * @category PasswordField
 * @function
 * @param props - All field props inherited from {@link FieldBase}.
 *
 * @example
 * <PasswordField label="Label" />
 *
 * @example
 * <PasswordField required />
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (props: PasswordFieldProps, ref) => {
    return (
      <FieldBase
        ref={ref}
        {...props}
        type="password"
        elementClass="uui-password-field"
      />
    );
  },
);

PasswordField.displayName = 'PasswordField';
