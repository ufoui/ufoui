import { ReactNode } from 'react';

import { cn } from '../../utils';
import { DialogIconSlot } from '../../types';
import { DialogTitle } from './dialogTitle';
import { Leading, Trailing } from '../../internal';
import { ArrowBackIcon, CloseIcon } from '../../assets';
import { IconButton } from '../iconButton/iconButton';
import { Icon } from '../../internal/icon/icon';
import { DialogActions } from './dialogActions';

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
    backIcon?: ReactNode;

    /** Resolved icon wrapper for leading/top slots; omit when no dialog icon. */
    icon?: ReactNode | null;

    /** Where the icon is placed inside the header vs content (see {@link DialogIconSlot}). */
    iconSlot: DialogIconSlot;

    /** Title alignment passed to {@link DialogTitle}. */
    titleAlign?: 'start' | 'center' | 'end';

    /** Title text. */
    label?: string;

    /** Action button row ({@link DialogActions} output). */
    actions: ReactNode;

    /** Optional content after actions / before close in the header row. */
    trailing?: ReactNode;

    /** When true, renders the close control with {@link closeIcon}. */
    showClose?: boolean;

    /** Invoked when the close control is activated. */
    onClose?: () => void;

    /** Icon element for the close control (already resolved to default or override). */
    closeIcon: ReactNode;
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
    iconSlot,
    titleAlign,
    label,
    actions,
    trailing,
    showClose,
    onClose,
    closeIcon,
}: DialogHeaderProps) => {
    const handleBack = onBack ?? onClose;
    const finalBackIcon = backIcon ?? ArrowBackIcon;
    const finalCloseIcon = closeIcon ?? CloseIcon;
    const backButton = showBack && <IconButton icon={finalBackIcon} onClick={handleBack} />;
    const closeButton = showClose && <IconButton icon={finalCloseIcon} onClick={onClose} />;
    const mainIcon = icon != null ? <Icon className={`uui-icon-${iconSlot}`} icon={icon} /> : null;
    const leadingIcons = (
        <>
            {backButton}
            {iconSlot === 'leading' && mainIcon}
        </>
    );

    const leadingContent = <Leading content={leading} start={leadingIcons} />;
    const trailingContent = <Trailing content={trailing} end={closeButton} />;
    return (
        <div className={cn('uui-dialog-header')}>
            {iconSlot === 'top' && mainIcon}
            {leadingContent}
            <DialogTitle align={titleAlign} label={label} />
            <DialogActions actions={actions} />
            {trailingContent}
        </div>
    );
};

DialogHeader.displayName = 'DialogHeader';
