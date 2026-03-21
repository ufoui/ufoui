import { ReactNode } from 'react';

import { cn } from '../../utils';

export interface DialogContentProps {
    children?: ReactNode;
    className?: string;
}

export const DialogContent = ({ children, className }: DialogContentProps) => {
    const wrapperClasses = cn('uui-dialog-content', className);

    return children ? (
        <div className={wrapperClasses}>
            <div className="uui-content">{children}</div>
        </div>
    ) : null;
};

DialogContent.displayName = 'DialogContent';
