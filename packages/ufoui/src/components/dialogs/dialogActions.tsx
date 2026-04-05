import { ReactNode } from 'react';

import { cn, ControlStyle, flatChildren } from '../../utils';
import { isDialogAction } from './dialogActions.guards';

/** Slot contract for components that can act as dialog actions. */
export interface DialogActionProps {
    label?: string;
    'aria-label'?: string;
    icon?: ReactNode;
    leading?: ReactNode;
    trailing?: ReactNode;
    disabled?: boolean;
}

export interface DialogActionsProps {
    actions?: ReactNode;
    slot?: 'top' | 'subtitle' | 'bottom' | 'inline';
    align?: 'start' | 'center' | 'end';
    stack?: boolean;
    className?: string;
    /** Maximum number of visible actions before the rest collapse into an overflow menu. */
    maxActions?: number;

    /** Accessible label for the overflow actions button. Default: "More actions" */
    moreLabel?: string;
    moreIcon?: ReactNode;
}

export const DialogActions = ({
    actions,
    className,
    slot,
    align,
    stack,
    maxActions,
    moreLabel,
}: DialogActionsProps) => {
    const actionItems = flatChildren(actions).filter(isDialogAction);
    const style = ControlStyle();
    const classes = cn(
        'uui-dialog-actions',
        slot && `uui-actions-${slot}`,
        align && align !== 'end' && `uui-actions-${align}`,
        stack && 'uui-actions-stack',
        className
    );
    return actionItems.length ? (
        <div className={classes} style={style.get()}>
            {actionItems}
        </div>
    ) : null;
};

DialogActions.displayName = 'DialogActions';
