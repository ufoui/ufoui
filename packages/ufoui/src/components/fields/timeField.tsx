import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '../base/fieldBase';

/**
 * Props for {@link TimeField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category TimeField
 */
export type TimeFieldProps = Omit<FieldBaseProps, 'elementClass' | 'type'>;

/**
 * Time field component used to enter time values.
 *
 * Use for selecting hours and minutes in forms.
 *
 * @category TimeField
 * @function
 * @param props - All field props inherited from {@link FieldBase}.
 *
 * @example
 * <TimeField label="Label" />
 *
 * @example
 * <TimeField required />
 */
export const TimeField = forwardRef<HTMLInputElement, TimeFieldProps>(
  (props: TimeFieldProps, ref) => {
    return (
      <FieldBase
        ref={ref}
        {...props}
        elementClass="uui-time-field"
        type="time"
      />
    );
  },
);

TimeField.displayName = 'TimeField';
