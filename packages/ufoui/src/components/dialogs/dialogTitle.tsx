import { ReactNode } from 'react';

import { cn, ElementFont, getFontClass } from '../../utils';

export interface DialogTitleProps {
    label?: string;
    children?: ReactNode;
    className?: string;
    font?: ElementFont;
    align?: 'start' | 'center' | 'end';
}

export const DialogTitle = ({ label, children, className, font = 'headlineSmall' }: DialogTitleProps) => {
    const content = label ?? children ?? null;

    return content ? (
        <div className={cn('uui-dialog-title', className, getFontClass(font))}>
            {content && <div className="uui-content">{content}</div>}
        </div>
    ) : null;
};

DialogTitle.displayName = 'DialogTitle';
