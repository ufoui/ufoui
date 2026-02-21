import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '../base/fieldBase';

/**
 * Props for {@link PhoneField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category PhoneField
 */
export type PhoneFieldProps = Omit<FieldBaseProps, 'elementClass' | 'type'>;

/**
 * Phone field component used to enter telephone numbers.
 *
 * Use for collecting contact phone information in forms.
 *
 * @category PhoneField
 * @function
 * @param props - All field props inherited from {@link FieldBase}.
 *
 * @example
 * <PhoneField label="Label" />
 *
 * @example
 * <PhoneField required />
 */
export const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(
  (props: PhoneFieldProps, ref) => {
    return (
      <FieldBase
        ref={ref}
        {...props}
        elementClass="uui-phone-field"
        type="tel"
      />
    );
  },
);

PhoneField.displayName = 'PhoneField';
