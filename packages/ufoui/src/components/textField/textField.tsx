import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '@ufoui/core';

/**
 * Props for {@link TextField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category Field
 */
export type FieldProps = Omit<FieldBaseProps, 'elementClass'>;

export const TextField = forwardRef<HTMLInputElement, FieldProps>(
  ({ ...props }: FieldProps, ref) => {
    return <FieldBase ref={ref} {...props} elementClass="uui-field" />;
  },
);

TextField.displayName = 'Field';
