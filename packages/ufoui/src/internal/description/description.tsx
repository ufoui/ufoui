import { ReactNode } from 'react';

import { getFontClass } from '../../utils';

export interface DescriptionProps {
    /** Supporting description text. */
    description?: ReactNode;

    /** Error message text. Overrides description when present. */
    error?: ReactNode;
}

/**
 * Renders supporting text such as description or error message.
 *
 * Error message takes precedence over description.
 *
 * @function
 * @param props Component properties.
 *
 * @category Slot
 */
export const Description = ({ description, error }: DescriptionProps) => {
    const content = error ?? description;

    if (!content) {
        return null;
    }

    const classes = [
        'uui-support-text',
        getFontClass('bodySmall'),
        error && 'uui-error',
        description && !error && 'uui-description',
    ]
        .filter(Boolean)
        .join(' ');

    return <div className={classes}>{content}</div>;
};
