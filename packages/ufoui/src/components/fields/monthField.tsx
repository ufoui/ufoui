import { forwardRef } from 'react';
import { FieldBase, FieldBaseProps } from '../base/fieldBase';

/**
 * Props for {@link MonthField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category MonthField
 */
export type MonthFieldProps = Omit<FieldBaseProps, 'elementClass' | 'type'>;

/**
 * Month field component used to enter month and year values.
 *
 * Use for selecting calendar months in forms.
 *
 * @category MonthField
 * @function
 * @param props - All field props inherited from {@link FieldBase}.
 *
 * @example
 * <MonthField label="Label" />
 *
 * @example
 * <MonthField required />
 */
export const MonthField = forwardRef<HTMLInputElement, MonthFieldProps>(
  (props: MonthFieldProps, ref) => {
    return (
      <FieldBase
        ref={ref}
        {...props}
        type="month"
        elementClass="uui-month-field"
      />
    );
  },
);

MonthField.displayName = 'MonthField';
