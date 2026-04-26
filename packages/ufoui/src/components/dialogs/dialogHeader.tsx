import React, { ReactElement, ReactNode } from 'react';

import type { DialogActionsProps } from '../actions/actions';
import { cn, ElementFont, SurfaceColor } from '../../utils';
import { DialogIconSlot } from '../../types';
import { DialogTitle } from './dialogTitle';
import { Leading, Trailing } from '../../internal';
import { ArrowBackIcon, CloseIcon } from '../../assets';
import { IconButton } from '../iconButton/iconButton';
import { DialogActions } from '../actions/actions';

/**
 * Props for {@link DialogHeader}.
 *
 * @category Dialog
 */
export interface DialogHeaderProps {
    /** Optional content before the back button and title row. */
    leading?: ReactNode;

    /** When true, renders the back affordance with {@link backIcon}. */
    showBack?: boolean;

    /** Invoked when the back control is activated. */
    onBack?: () => void;

    /** Icon element for the back control. */
    backIcon?: ReactElement;

    /** Resolved icon wrapper for leading/top slots; omit when no dialog icon. */
    icon?: ReactElement;

    showIcon?: boolean;
    iconColor?: SurfaceColor;

    /** Where the icon is placed inside the header vs content (see {@link DialogIconSlot}). */
    iconSlot: DialogIconSlot;

    /** Title alignment passed to {@link DialogTitle}. */
    titleAlign?: 'start' | 'center' | 'end';

    /** Title text. */
    label?: string;

    /** Action buttons (see {@link DialogActions}). */
    actions?: DialogActionsProps['actions'];
    actionsAlign?: DialogActionsProps['align'];
    actionsStack?: DialogActionsProps['stack'];
    maxActions?: DialogActionsProps['maxActions'];
    moreLabel?: DialogActionsProps['moreLabel'];
    moreIcon?: DialogActionsProps['moreIcon'];

    /** Optional content after actions / before close in the header row. */
    trailing?: ReactNode;

    /** When true, renders the close control with {@link closeIcon}. */
    showClose?: boolean;

    /** Invoked when the close control is activated. */
    onClose?: () => void;

    /** Icon element for the close control (already resolved to default or override). */
    closeIcon?: ReactElement;

    font?: ElementFont;
}

/**
 * Dialog title row: leading/back/icon, title, inline actions, trailing, and close.
 *
 * @remarks
 * Non-inline actions are omitted here and rendered below the content by the parent.
 *
 * @function
 * @param props Component properties.
 *
 * @category Dialog
 */
export const DialogHeader = ({
    leading,
    showBack,
    onBack,
    backIcon,
    icon,
    showIcon,
    iconColor,
    iconSlot,
    titleAlign,
    label,
    actions,
    actionsAlign,
    actionsStack,
    maxActions,
    moreLabel,
    moreIcon,
    trailing,
    showClose,
    onClose,
    closeIcon,
    font,
}: DialogHeaderProps) => {
    const handleBack = onBack ?? onClose;
    const finalBackIcon = backIcon ?? ArrowBackIcon;
    const finalCloseIcon = closeIcon ?? CloseIcon;
    const backButton = showBack && <IconButton icon={finalBackIcon} onClick={handleBack} />;
    const closeButton = showClose && <IconButton icon={finalCloseIcon} onClick={onClose} />;

    return (
        <div className={cn('uui-dialog-header')}>
            <Leading content={leading} start={backButton} />
            <DialogTitle
                align={titleAlign}
                font={font}
                icon={icon}
                iconColor={iconColor}
                iconSlot={iconSlot}
                label={label}
                showIcon={showIcon}
            />
            <DialogActions
                actions={actions}
                align={actionsAlign}
                className={cn('uui-dialog-actions', 'uui-actions-inline')}
                maxActions={maxActions}
                moreIcon={moreIcon}
                moreLabel={moreLabel}
                stack={actionsStack}
            />
            <Trailing content={trailing} end={closeButton} />
        </div>
    );
};

DialogHeader.displayName = 'DialogHeader';
