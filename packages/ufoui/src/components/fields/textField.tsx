import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '../base';

/**
 * Props for {@link TextField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category TextField
 */
export type TextFieldProps = Omit<FieldBaseProps, 'elementClass'>;

/**
 * Text field component used to collect user input.
 *
 * Use for forms, search, and general data entry.
 *
 * @category TextField
 * @function
 * @param props - All field props inherited from {@link FieldBase}.
 *
 * @example
 * <TextField label="Label" />
 *
 * @example
 * <TextField placeholder="Enter value" />
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props: TextFieldProps, ref) => {
    return <FieldBase ref={ref} {...props} elementClass="uui-text-field" />;
  },
);

TextField.displayName = 'TextField';
