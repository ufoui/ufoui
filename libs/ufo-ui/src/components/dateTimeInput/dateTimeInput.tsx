import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '@ufoui/core';

export const DateTimeInput = forwardRef<HTMLInputElement, FieldBaseProps>((props: FieldBaseProps, ref) => {
    return <FieldBase ref={ref} {...{ ...props, type: 'datetime-local', className: 'UIDateTimeInput' }} />;
});
