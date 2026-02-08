import React, { forwardRef } from 'react';

import { BoxBase, BoxBaseProps, ControlStyle, ElementFont, getFontClass, SurfaceColor } from '@ufoui/core';
import { FieldsetContext } from '@ufoui/context/fieldsetContext';

/**
 * Props for {@link Fieldset}.
 * Extends {@link BoxBaseProps} except for `elementClass` and `component`.
 *
 * @category Fieldset
 */
export interface FieldsetProps extends Omit<BoxBaseProps, 'component' | 'elementClass'> {
    /** Supporting text displayed below the fieldset content. */
    description?: string;
    /** Text color of the description. */
    descriptionColor?: SurfaceColor;
    /** Font token applied to the description text. */
    descriptionFont?: ElementFont;
    /** Disables all form controls inside the fieldset. */
    disabled?: boolean;
    /** Error message displayed below the fieldset content. Overrides `description`. */
    error?: string;
    /** Font token applied to the legend text. */
    font?: ElementFont;
    /** Alias for `legend`. Used as fallback when `legend` is not provided. */
    label?: string;
    /** Text rendered inside the native `<legend>` element. */
    legend?: string;
    /** Marks the fieldset as required. Adds a required indicator to the legend. */
    required?: boolean;
}

/**
 * Semantic wrapper for grouping related form controls.
 *
 * Renders a native fieldset with an optional legend.
 * Used to group checkboxes or radio buttons.
 *
 * @function
 * @example
 * <Fieldset legend="Fieldset">
 *   <Checkbox>
 *   <Checkbox>
 *   <Checkbox>
 * </Fieldset>
 *
 * @category Fieldset
 */
export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
    (
        {
            description,
            error,
            font,
            label,
            disabled,
            legend,
            children,
            direction = 'col',
            required,
            descriptionColor,
            descriptionFont,
            alignItems = 'start',
            ...props
        },
        ref
    ) => {
        const legendText = legend ?? label;
        const legendClasses = ['uui-fieldset-legend', getFontClass(font ?? 'labelLarge')].filter(Boolean).join(' ');

        const descriptionStyle = ControlStyle();
        if (error) {
            descriptionStyle.text('error');
        } else if (descriptionColor) {
            descriptionStyle.text(descriptionColor);
        } else {
            descriptionStyle.text.on('surfaceVariant');
        }

        const descriptionClasses = [
            'uui-support-text',
            getFontClass(descriptionFont ?? 'bodySmall'),
            error && 'uui-error',
            description && !error && 'uui-description',
        ]
            .filter(Boolean)
            .join(' ');

        const descriptionText = (description ?? error) && (
            <div className={descriptionClasses} style={descriptionStyle.get()}>
                {error ?? description}
            </div>
        );

        return (
            <>
                {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
                <FieldsetContext.Provider value={{ disabled }}>
                    <BoxBase
                        ref={ref}
                        {...props}
                        alignItems={alignItems}
                        component="fieldset"
                        direction={direction}
                        disabled={disabled}
                        elementClass="uui-fieldset">
                        {legendText && (
                            <legend className={legendClasses}>
                                {legendText}
                                {required && (
                                    <span aria-hidden="true" className="uui-required">
                                        *
                                    </span>
                                )}
                            </legend>
                        )}
                        {children}
                    </BoxBase>
                </FieldsetContext.Provider>
                {descriptionText}
            </>
        );
    }
);

Fieldset.displayName = 'Fieldset';
