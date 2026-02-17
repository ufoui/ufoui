import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '../base/fieldBase/fieldBase';

export const NumberInput = forwardRef<HTMLInputElement, FieldBaseProps>(
  (props: FieldBaseProps, ref) => {
    return (
      <FieldBase
        ref={ref}
        {...{ ...props, type: 'number', className: 'UINumberInput' }}
      />
    );
  },
);
