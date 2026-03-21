import { ReactNode } from 'react';

import { cn, ElementFont, getFontClass, SurfaceColor } from '../../utils';

export interface DialogTitleProps {
    icon?: ReactNode;
    label?: string;
    children?: ReactNode;
    className?: string;
    font?: ElementFont;
    color?: SurfaceColor;
    textColor?: SurfaceColor;
}

export const DialogTitle = ({ icon, label, children, className, font = 'headlineSmall' }: DialogTitleProps) => {
    const content = label ?? children ?? null;

    return content ? (
        <div className={cn('uui-dialog-title', className, getFontClass(font))}>
            {icon && <div className="uui-icon">{icon}</div>}
            {content && <div className="uui-content">{content}</div>}
        </div>
    ) : null;
};

DialogTitle.displayName = 'DialogTitle';
