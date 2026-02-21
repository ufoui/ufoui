import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '../base/fieldBase';

/**
 * Props for {@link DateTimeField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category DateTimeField
 */
export type DateTimeFieldProps = Omit<FieldBaseProps, 'elementClass' | 'type'>;

/**
 * Date and time field component used to enter combined date and time values.
 *
 * Use for scheduling and time-based form input.
 *
 * @category DateTimeField
 * @function
 * @param props - All field props inherited from {@link FieldBase}.
 *
 * @example
 * <DateTimeField label="Label" />
 *
 * @example
 * <DateTimeField required />
 */
export const DateTimeField = forwardRef<HTMLInputElement, DateTimeFieldProps>(
  (props: DateTimeFieldProps, ref) => {
    return (
      <FieldBase
        ref={ref}
        {...props}
        elementClass="uui-datetime-field"
        type="datetime-local"
      />
    );
  },
);

DateTimeField.displayName = 'DateTimeField';
