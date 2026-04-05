import { ReactNode } from 'react';

import { cn, SurfaceColor } from '../../utils';
import { Icon } from '../../internal';
import { DialogIconSlot } from '../../types';

export interface DialogContentProps {
    children?: ReactNode;
    icon?: ReactNode;
    showIcon?: boolean;
    iconColor?: SurfaceColor;
    iconSlot?: DialogIconSlot;
    className?: string;
}

export const DialogContent = ({ children, iconSlot, icon, showIcon, iconColor, className }: DialogContentProps) => {
    const wrapperClasses = cn('uui-dialog-content', className);
    const iconVisible = showIcon !== false && icon && (iconSlot === 'contentLeft' || iconSlot === 'contentRight');
    return children ? (
        <div className={wrapperClasses}>
            {iconVisible && <Icon className={`uui-icon-${iconSlot}`} color={iconColor} icon={icon} />}
            <div className="uui-content">{children}</div>
        </div>
    ) : null;
};

DialogContent.displayName = 'DialogContent';
