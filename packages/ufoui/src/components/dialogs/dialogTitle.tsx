import { ReactNode } from 'react';

import { cn, ElementFont, getFontClass, SurfaceColor } from '../../utils';
import { Icon } from '../../internal';
import { DialogIconSlot } from '../../types';

export interface DialogTitleProps {
    label?: string;
    className?: string;
    font?: ElementFont;
    /** Resolved icon wrapper for leading/top slots; omit when no dialog icon. */
    icon?: ReactNode | null;
    /** Where the icon is placed inside the header vs content (see {@link DialogIconSlot}). */
    iconSlot?: DialogIconSlot;
    showIcon?: boolean;
    iconColor?: SurfaceColor;
    align?: 'start' | 'center' | 'end';
}

export const DialogTitle = ({
    label,
    icon,
    iconSlot,
    className,
    iconColor,
    showIcon,
    align = 'start',
    font = 'headlineSmall',
}: DialogTitleProps) => {
    const iconVisible = showIcon !== false && icon && (iconSlot === 'top' || iconSlot === 'leading');
    return label || iconVisible ? (
        <div className={cn('uui-dialog-title', `uui-title-${iconSlot}`, className, getFontClass(font))}>
            {iconVisible && <Icon className={`uui-icon-${iconSlot}`} color={iconColor} icon={icon} />}
            {label && <div className={`uui-title uui-title-${align}`}>{label}</div>}
        </div>
    ) : null;
};

DialogTitle.displayName = 'DialogTitle';
