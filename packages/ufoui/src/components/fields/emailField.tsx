import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '../base/fieldBase';

/**
 * Props for {@link EmailField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category EmailField
 */
export type EmailFieldProps = Omit<FieldBaseProps, 'elementClass' | 'type'>;

/**
 * Email field component used to enter email addresses.
 *
 * Use for collecting email contact information in forms.
 *
 * @category EmailField
 * @function
 * @param props - All field props inherited from {@link FieldBase}.
 *
 * @example
 * <EmailField label="Label" />
 *
 * @example
 * <EmailField required />
 */
export const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
  (props: EmailFieldProps, ref) => {
    return (
      <FieldBase
        ref={ref}
        {...props}
        elementClass="uui-email-field"
        type="email"
      />
    );
  },
);

EmailField.displayName = 'EmailField';
