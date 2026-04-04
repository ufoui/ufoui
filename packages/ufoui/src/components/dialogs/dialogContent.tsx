import { ReactNode } from 'react';

import { cn } from '../../utils';
import { Icon } from '../../internal/icon/icon';
import { DialogIconSlot } from '../../types';

export interface DialogContentProps {
    children?: ReactNode;
    icon?: ReactNode;
    iconSlot?: DialogIconSlot;
    className?: string;
}

export const DialogContent = ({ children, iconSlot, icon, className }: DialogContentProps) => {
    const wrapperClasses = cn('uui-dialog-content', className);
    const showIcon = icon && (iconSlot === 'contentLeft' || iconSlot === 'contentRight');
    return children ? (
        <div className={wrapperClasses}>
            {showIcon && <Icon className={`uui-icon-${iconSlot}`} icon={icon} />}
            <div className="uui-content">{children}</div>
        </div>
    ) : null;
};

DialogContent.displayName = 'DialogContent';
