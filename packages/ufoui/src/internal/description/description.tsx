import { HTMLAttributes, ReactNode } from 'react';

import { cn, getFontClass } from '../../utils';

export interface DescriptionProps extends HTMLAttributes<HTMLElement> {
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
export const Description = ({ description, error, ...rest }: DescriptionProps) => {
    const content = error ?? description;

    if (!content) {
        return null;
    }

    const classes = cn(
        'uui-support-text',
        getFontClass('bodySmall'),
        !!error && 'uui-error',
        !!description && !error && 'uui-description'
    );
    return (
        <div className={classes} {...rest}>
            {content}
        </div>
    );
};
