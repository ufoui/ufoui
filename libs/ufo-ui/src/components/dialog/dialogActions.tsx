import { ReactNode } from 'react';

import { ElementOutline, getBorderClass } from '@ufoui/utils';

import {
    BorderColor,
    getBorderColor,
    getBorderColorClass,
    getSurfaceColorClasses,
    SurfaceColor,
} from '../../utils/color';

export interface DialogActionsProps {
    children?: ReactNode;
    className?: string;

    color?: SurfaceColor;

    borderTop?: boolean;
    borderTopWidth?: ElementOutline;
    borderColor?: BorderColor;
}

export const DialogActions = ({
    children,
    className,

    color,
    borderTop = false,
    borderTopWidth = 1,
    borderColor,
}: DialogActionsProps) => {
    if (!children) {
        return null;
    }

    const colorClasses = color ? getSurfaceColorClasses(color) : null;
    const borderWidthClass = borderTop ? getBorderClass(borderTopWidth) : '';
    const borderColorClass = borderTop && color ? getBorderColorClass(getBorderColor(borderColor)) : '';

    const classes = [
        'uui-dialog-actions',
        colorClasses?.bgColor,
        colorClasses?.textOnColor,
        borderTop ? 'uui-dialog-actions-border-top' : '',
        borderWidthClass,
        borderColorClass,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return <div className={classes}>{children}</div>;
};

DialogActions.displayName = 'DialogActions';
