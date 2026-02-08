import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '@ufoui/core';

export const TimeInput = forwardRef<HTMLInputElement, FieldBaseProps>(
  (props: FieldBaseProps, ref) => {
    return (
      <FieldBase
        ref={ref}
        {...{ ...props, type: 'time', className: 'UITimeInput' }}
      />
    );
  },
);
