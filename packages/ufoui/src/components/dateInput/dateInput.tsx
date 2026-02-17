import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '../base/fieldBase/fieldBase';

export const DateInput = forwardRef<HTMLInputElement, FieldBaseProps>(
  (props: FieldBaseProps, ref) => {
    return (
      <FieldBase
        ref={ref}
        {...{ ...props, type: 'date', className: 'UIDateInput' }}
      />
    );
  },
);
