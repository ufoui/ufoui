import { ReactNode } from 'react';

import { cn } from './utils';

/**
 * Texts surrounding a form control, used to build its ARIA attributes.
 *
 * @category Utils
 */
export interface AriaLabelsSource {
    /** Visible label text; becomes the accessible name. */
    label?: ReactNode;

    /** Accessible name used when there is no visible label. */
    ariaLabel?: string;

    /** Tooltip text; names the control without a label, otherwise describes it. */
    title?: string;

    /** Supporting text rendered below the control. */
    description?: ReactNode;

    /** Error message; replaces the description and marks the control invalid. */
    error?: ReactNode;

    /** Marks the control as required; pass only for roles that support `aria-required`. */
    required?: boolean;
}

/**
 * Builds the accessible name, description and state attributes of a form control.
 *
 * @remarks
 * A visible `label` always names the control; `ariaLabel` and then `title` are used only without it.
 * The description lists the supporting text and, when not used as the name, the tooltip.
 * Referenced elements must use the ids `${id}-label`, `${id}-desc` and `${id}-tip`.
 *
 * @function
 * @param id Control id used as the prefix of referenced element ids.
 * @param source Texts surrounding the control.
 * @returns ARIA attributes to spread on the control element.
 *
 * @category Utils
 */
export function getAriaLabels(id: string, { label, ariaLabel, title, description, error, required }: AriaLabelsSource) {
    return {
        'aria-label': label ? undefined : (ariaLabel ?? title),
        'aria-labelledby': label ? `${id}-label` : undefined,
        'aria-describedby':
            cn((error ?? description) && `${id}-desc`, title && (label ?? ariaLabel) && `${id}-tip`) || undefined,
        'aria-invalid': error ? true : undefined,
        'aria-required': required || undefined,
    };
}
