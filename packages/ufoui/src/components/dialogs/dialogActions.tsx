import { ReactNode } from 'react';

import { BorderColor, cn, ControlStyle, ElementOutline, getBorderClass, SurfaceColor } from '../../utils';

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

    const borderWidthClass = borderTop ? getBorderClass(borderTopWidth) : '';

    const style = ControlStyle();
    style.border(borderColor);
    style.text.on(color);
    style.bg(color);

    const classes = cn(
        'uui-dialog-actions',
        borderTop ? 'uui-dialog-actions-border-top' : '',
        borderWidthClass,
        className
    );

    return (
        <div className={classes} style={style.get()}>
            {children}
        </div>
    );
};

DialogActions.displayName = 'DialogActions';
