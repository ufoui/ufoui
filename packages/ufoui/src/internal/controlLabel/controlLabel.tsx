import { ElementType, ReactNode, RefObject } from 'react';

import { cn, ElementFont, getFontClass } from '../../utils';

export interface ControlLabelProps {
    /** Label content. */
    label?: ReactNode;
    /** ID of the associated control element. Used when tag is 'label'. */
    htmlFor?: string;
    /** DOM id applied to the label element. */
    id?: string;
    /** Reference to a control element that should receive focus when the label is clicked. */
    focusRef?: RefObject<HTMLElement>;
    /** Displays a required indicator next to the label. */
    required?: boolean;
    /** Font applied to the label text. */
    font?: ElementFont;
    /** HTML tag used to render the label element. Default: 'label'. */
    tag?: ElementType;
}

/**
 * Renders a label for form controls.
 *
 * Supports both native label behaviour and ARIA labeling for custom controls.
 * When tag is 'label', htmlFor associates the label with a form element.
 * When focusRef is provided, clicking the label focuses the referenced control.
 *
 * @function
 * @param props Component properties.
 *
 * @category Slot
 */
export const ControlLabel = ({
    label,
    htmlFor,
    id,
    required,
    font,
    focusRef,
    tag: Tag = 'label',
}: ControlLabelProps) => {
    if (!label) {
        return null;
    }

    const classes = cn('uui-control-label', getFontClass(font ?? 'bodyMedium'));
    const labelProps = Tag === 'label' ? { htmlFor: focusRef ? undefined : htmlFor } : {};

    return (
        <Tag
            className={classes}
            id={id}
            {...labelProps}
            onClick={focusRef ? () => focusRef.current?.focus() : undefined}>
            {label}
            {required && (
                <span aria-hidden="true" className="uui-required">
                    *
                </span>
            )}
        </Tag>
    );
};
