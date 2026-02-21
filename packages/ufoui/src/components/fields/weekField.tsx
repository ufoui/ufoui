import { forwardRef } from 'react';
import { FieldBase, FieldBaseProps } from '../base/fieldBase';

/**
 * Props for {@link WeekField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category WeekField
 */
export type WeekFieldProps = Omit<FieldBaseProps, 'elementClass' | 'type'>;

/**
 * Week field component used to enter week and year values.
 *
 * Use for selecting calendar weeks in forms.
 *
 * @category WeekField
 * @function
 * @param props - All field props inherited from {@link FieldBase}.
 *
 * @example
 * <WeekField label="Label" />
 *
 * @example
 * <WeekField required />
 */
export const WeekField = forwardRef<HTMLInputElement, WeekFieldProps>(
  (props: WeekFieldProps, ref) => {
    return (
      <FieldBase
        ref={ref}
        {...props}
        type="week"
        elementClass="uui-week-field"
      />
    );
  },
);

WeekField.displayName = 'WeekField';
