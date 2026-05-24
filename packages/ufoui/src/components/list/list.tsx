import React, { ReactNode } from 'react';

import { BoxBase } from '../base/boxBase';
import { BoxBaseProps } from '../base/boxBase';

export interface ListProps extends Omit<BoxBaseProps, 'type'> {
    children: ReactNode;
}

export const List = ({ children, className, ...props }: ListProps) => {
    return (
        <BoxBase
            {...props}
            as="div"
            aria-orientation="vertical"
            className={['uui-list uui-flex uui-flex-col', className].filter(Boolean).join(' ')}
            role="list">
            {children}
        </BoxBase>
    );
};
