import { ReactNode } from 'react';

import { cn, ControlStyle, flatChildren } from '../../utils';
import { isAction } from './actions.guards';

/**
 * Slot contract for components that can act as actions.
 *
 * @category Actions
 */
export interface ActionProps {
    /** Text label for the action. */
    label?: string;
    /** Accessible label for actions without visible text. */
    'aria-label'?: string;
    /** Leading icon for the action. */
    icon?: ReactNode;
    /** Custom leading slot content. */
    leading?: ReactNode;
    /** Custom trailing slot content. */
    trailing?: ReactNode;
    /** Disables the action. */
    disabled?: boolean;
}

/**
 * Props for action groups used by surface components such as cards and dialogs.
 *
 * @category Actions
 */
export interface ActionsProps {
    /** Action elements rendered inside the group. */
    actions?: ReactNode;
    /** Alignment of the action group. */
    align?: 'start' | 'center' | 'end';
    /** Stacks actions vertically instead of horizontally. */
    stack?: boolean;
    /** Additional class names for the action wrapper. */
    className?: string;
    /** Maximum number of visible actions before the rest collapse into an overflow menu. */
    maxActions?: number;
    /** Accessible label for the overflow actions button. Default: "More actions" */
    moreLabel?: string;
    /** Custom icon for the overflow actions button. */
    moreIcon?: ReactNode;
}

/**
 * Shared action group renderer used by components that expose footer or inline actions.
 *
 * Filters children to known action elements and applies placement, alignment,
 * and stacking styles.
 *
 * @category Actions
 */
const Actions = ({ actions, className, align, stack, maxActions, moreLabel }: ActionsProps) => {
    const actionItems = flatChildren(actions).filter(isAction);
    const style = ControlStyle();
    const classes = cn(
        'uui-actions',
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

Actions.displayName = 'Actions';
export { Actions as DialogActions, Actions as CardActions };
export type { ActionsProps as DialogActionsProps, ActionsProps as CardActionsProps };
