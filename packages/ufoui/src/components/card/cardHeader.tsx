import React, { ReactElement, ReactNode } from 'react';

import type { CardActionsProps } from '../actions/actions';
import { cn, ElementFont } from '../../utils';
import { Leading, Trailing } from '../../internal';
import { CloseIcon } from '../../assets';
import { IconButton } from '../iconButton/iconButton';
import { CardActions } from '../actions/actions';
import { CardTitle } from './cardTitle';

/**
 * Props for {@link CardHeader}.
 *
 * @category Card
 */
export interface CardHeaderProps {
    /** Optional content before the title row. */
    leading?: ReactNode;

    /** Title alignment passed to {@link CardTitle}. */
    titleAlign?: 'start' | 'center' | 'end';

    /** Title text. */
    label?: string;

    /** Secondary text shown below the title. */
    subtitle?: string;

    /** Action buttons (see {@link CardActions}). */
    actions?: CardActionsProps['actions'];
    actionsAlign?: CardActionsProps['align'];
    actionsStack?: CardActionsProps['stack'];
    maxActions?: CardActionsProps['maxActions'];
    moreLabel?: CardActionsProps['moreLabel'];
    moreIcon?: CardActionsProps['moreIcon'];

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
 * Card title row: leading/icon, title, inline actions, trailing, and close.
 *
 * @remarks
 * Non-inline actions are omitted here and rendered below the content by the parent.
 *
 * @function
 * @param props Component properties.
 *
 * @category Card
 */
export const CardHeader = ({
    leading,
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
}: CardHeaderProps) => {
    const finalCloseIcon = closeIcon ?? CloseIcon;
    const closeButton = showClose && <IconButton icon={finalCloseIcon} onClick={onClose} />;

    return (
        <div className={cn('uui-card-header')}>
            <Leading content={leading} />
            <CardTitle align={titleAlign} font={font} label={label} />
            <CardActions
                actions={actions}
                align={actionsAlign}
                className={cn('uui-card-actions', 'uui-actions-inline')}
                maxActions={maxActions}
                moreIcon={moreIcon}
                moreLabel={moreLabel}
                stack={actionsStack}
            />
            <Trailing content={trailing} end={closeButton} />
        </div>
    );
};

CardHeader.displayName = 'CardHeader';
