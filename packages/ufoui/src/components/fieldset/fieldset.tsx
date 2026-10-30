import { forwardRef } from 'react';

import { cn, ControlStyle, ElementFont, getAriaLabels, getFontClass, SurfaceColor, useUniqueId } from '../../utils';
import { SelectionContext } from '../../context';
import { useSelection, useSelectionState } from '../../hooks';
import { BoxBase, BoxBaseProps } from '../base';
import { LabelText } from '../../internal';

/**
 * Configuration shared by {@link Fieldset} with its child controls.
 *
 * @category Fieldset
 */
export interface FieldsetConfig {
    /** Selection mode of the group; set only when the fieldset manages the value. */
    group?: 'single' | 'multiple';

    /** Shared `name` of the grouped inputs. */
    name?: string;
}

/**
 * Props for {@link Fieldset}.
 * Extends {@link BoxBaseProps} except for `as` and `elementClass`.
 *
 * @category Fieldset
 */
export interface FieldsetProps
    extends Omit<BoxBaseProps, 'as' | 'elementClass' | 'color' | 'onChange' | 'defaultValue'> {
    /** Surface background token. */
    color?: SurfaceColor;
    /** Initial selected value(s) for uncontrolled usage. */
    defaultValue?: string | string[];
    /** Supporting text displayed below the fieldset content. */
    description?: string;
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
    /** Shared `name` attribute applied to the grouped inputs. */
    name?: string;
    /** Called with the selected values when the selection changes. */
    onChange?: (values: string[]) => void;
    /** Marks the fieldset as required. Adds a required indicator to the legend. */
    required?: boolean;
    /** Lets the fieldset manage the selected value(s) of its controls. @default 'none' */
    selection?: 'none' | 'single' | 'multiple';
    /** Controlled selected value(s). */
    value?: string | string[];
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
            descriptionFont,
            alignItems = 'start',
            id,
            'aria-label': ariaLabel,
            name,
            onChange,
            role,
            selection = 'none',
            value,
            defaultValue,
            ...props
        },
        ref
    ) => {
        const generatedId = useUniqueId('fieldset');
        const elemId = id ?? generatedId;
        const finalDisabled = useSelection()?.disabled || disabled;
        const legendText = legend ?? label;
        const ss = useSelectionState({
            type: selection === 'multiple' ? 'multiple' : 'single',
            value,
            defaultValue,
            onChange,
            deselectable: false,
        });
        const legendClasses = cn('uui-fieldset-legend', getFontClass(font ?? 'labelLarge'));

        const descriptionStyle = ControlStyle();
        if (error) {
            descriptionStyle.text('error');
        } else {
            descriptionStyle.text.on('surfaceVariant');
        }

        const descriptionClasses = cn(
            'uui-support-text',
            getFontClass(descriptionFont ?? 'bodySmall'),
            error && 'uui-error',
            description && !error && 'uui-description'
        );

        const descriptionText = (description ?? error) && (
            <div className={descriptionClasses} id={`${elemId}-desc`} style={descriptionStyle.get()}>
                {error ?? description}
            </div>
        );

        return (
            <>
                {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
                <SelectionContext.Provider
                    value={{ ...ss, config: { group: selection === 'none' ? undefined : selection, name }, disabled: finalDisabled }}>
                    <BoxBase
                        ref={ref}
                        {...props}
                        {...getAriaLabels(elemId, {
                            label: legendText,
                            ariaLabel,
                            description,
                            error,
                            required: role === 'radiogroup' && required,
                        })}
                        alignItems={alignItems}
                        as="fieldset"
                        direction={direction}
                        disabled={finalDisabled}
                        elementClass="uui-fieldset"
                        id={elemId}
                        role={role}>
                        {legendText && (
                            <legend className={legendClasses} id={`${elemId}-label`}>
                                <LabelText label={legendText} required={required} />
                            </legend>
                        )}
                        {children}
                    </BoxBase>
                </SelectionContext.Provider>
                {descriptionText}
            </>
        );
    }
);

Fieldset.displayName = 'Fieldset';
