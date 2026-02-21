import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '../base/fieldBase';

/**
 * Props for {@link DateField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category DateField
 */
export type DateFieldProps = Omit<FieldBaseProps, 'elementClass' | 'type'>;

/**
 * Date field component used to enter date values.
 *
 * Use for selecting calendar dates in forms.
 *
 * @category DateField
 * @function
 * @param props - All field props inherited from {@link FieldBase}.
 *
 * @example
 * <DateField label="Label" />
 *
 * @example
 * <DateField required />
 */
export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  (props: DateFieldProps, ref) => {
    return (
      <FieldBase
        ref={ref}
        {...props}
        elementClass="uui-date-field"
        type="date"
      />
    );
  },
);

DateField.displayName = 'DateField';
