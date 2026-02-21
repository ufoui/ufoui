import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '../base/fieldBase';

/**
 * Props for {@link NumberField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category NumberField
 */
export type NumberFieldProps = Omit<FieldBaseProps, 'elementClass' | 'type'>;

/**
 * Number field component used to enter numeric values.
 *
 * Use for quantities, amounts, and other number-based input.
 *
 * @category NumberField
 * @function
 * @param props - All field props inherited from {@link FieldBase}.
 *
 * @example
 * <NumberField label="Label" />
 *
 * @example
 * <NumberField required />
 */
export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  (props: NumberFieldProps, ref) => {
    return (
      <FieldBase
        ref={ref}
        {...props}
        elementClass="uui-number-field"
        type="number"
      />
    );
  },
);

NumberField.displayName = 'NumberField';
