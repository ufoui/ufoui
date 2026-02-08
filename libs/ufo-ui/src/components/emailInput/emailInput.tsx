import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '@ufoui/core';

export const EmailInput = forwardRef<HTMLInputElement, FieldBaseProps>((props: FieldBaseProps, ref) => {
    return <FieldBase ref={ref} {...{ ...props, type: 'email', className: 'UIFormEmailInput' }} />;
});
