import { MouseEventHandler, ReactNode, useRef, useState } from 'react';

import { MoreVertIcon } from '../../assets';
import { cn, ControlStyle, flatChildren } from '../../utils';
import { IconButton } from '../iconButton/iconButton';
import { Menu } from '../menu/menu';
import { MenuItem } from '../menuItem/menuItem';
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
const Actions = ({ actions, className, align, stack, maxActions, moreLabel, moreIcon }: ActionsProps) => {
    const actionItems = flatChildren(actions).filter(isAction);
    const overflowButtonRef = useRef<HTMLButtonElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const style = ControlStyle();
    const classes = cn(
        'uui-actions',
        align && align !== 'end' && `uui-actions-${align}`,
        stack && 'uui-actions-stack',
        className
    );

    const hasOverflow = maxActions !== undefined && maxActions >= 0 && actionItems.length > maxActions;
    const visibleActions = hasOverflow ? actionItems.slice(0, maxActions) : actionItems;
    const overflowActions = hasOverflow ? actionItems.slice(maxActions) : [];

    return actionItems.length ? (
        <div className={classes} style={style.get()}>
            {visibleActions}
            {hasOverflow && (
                <>
                    <IconButton
                        aria-label={moreLabel ?? 'More actions'}
                        icon={moreIcon ?? MoreVertIcon}
                        onClick={() => {
                            setMenuOpen(v => !v);
                        }}
                        ref={overflowButtonRef}
                    />
                    <Menu
                        anchorRef={overflowButtonRef}
                        onClose={() => {
                            setMenuOpen(false);
                        }}
                        open={menuOpen}>
                        {overflowActions.map((action, index) => {
                            const {
                                ['aria-label']: ariaLabel,
                                disabled,
                                icon,
                                label,
                                leading,
                                onClick,
                                trailing,
                            } = action.props as {
                                'aria-label'?: string;
                                disabled?: boolean;
                                icon?: ReactNode;
                                label?: string;
                                leading?: ReactNode;
                                onClick?: MouseEventHandler<HTMLButtonElement>;
                                trailing?: ReactNode;
                            };

                            return (
                                <MenuItem
                                    disabled={disabled}
                                    icon={icon}
                                    key={action.key ?? index}
                                    label={label ?? ariaLabel}
                                    leading={leading}
                                    onClick={e => {
                                        setMenuOpen(false);
                                        onClick?.(e as unknown as Parameters<MouseEventHandler<HTMLButtonElement>>[0]);
                                    }}
                                    trailing={trailing}
                                />
                            );
                        })}
                    </Menu>
                </>
            )}
        </div>
    ) : null;
};

Actions.displayName = 'Actions';
export { Actions as DialogActions, Actions as CardActions };
export type { ActionsProps as DialogActionsProps, ActionsProps as CardActionsProps };
