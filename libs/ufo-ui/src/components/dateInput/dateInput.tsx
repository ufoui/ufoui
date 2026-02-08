import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '@ufoui/core';

export const DateInput = forwardRef<HTMLInputElement, FieldBaseProps>((props: FieldBaseProps, ref) => {
    return <FieldBase ref={ref} {...{ ...props, type: 'date', className: 'UIDateInput' }} />;
});
