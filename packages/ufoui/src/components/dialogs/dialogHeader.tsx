import { ReactNode } from 'react';

import { cn } from '../../utils';
import { DialogIconSlot } from '../../types';
import { DialogTitle } from './dialogTitle';

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
    iconEl?: ReactNode | null;

    /** Where the icon is placed inside the header vs content (see {@link DialogIconSlot}). */
    iconSlot: DialogIconSlot;

    /** Title alignment passed to {@link DialogTitle}. */
    titleAlign?: 'start' | 'center' | 'end';

    /** Title text. */
    label?: string;

    /** When true, action buttons are laid out in the header after the title. */
    inlineActions: boolean;

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
    iconEl,
    iconSlot,
    titleAlign,
    label,
    inlineActions,
    actions,
    trailing,
    showClose,
    onClose,
    closeIcon,
}: DialogHeaderProps) => {
    const handleBack = onBack ?? onClose;
    return (
        <div className={cn('uui-dialog-header', iconSlot === 'top' && 'uui-icon-top')}>
            {leading && <div className="uui-leading">{leading}</div>}
            {showBack && (
                <div className="uui-dialog-back" onClick={handleBack}>
                    {backIcon}
                </div>
            )}
            {iconSlot === 'leading' && iconEl}
            {iconSlot === 'top' && iconEl}
            <DialogTitle align={titleAlign} label={label} />
            {inlineActions ? (
                <>
                    {actions}
                    {trailing && <div className="uui-trailing">{trailing}</div>}
                    {showClose && (
                        <div className="uui-dialog-close" onClick={onClose}>
                            {closeIcon}
                        </div>
                    )}
                </>
            ) : (
                <>
                    {trailing && <div className="uui-trailing">{trailing}</div>}
                    {showClose && (
                        <div className="uui-dialog-close" onClick={onClose}>
                            {closeIcon}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

DialogHeader.displayName = 'DialogHeader';
