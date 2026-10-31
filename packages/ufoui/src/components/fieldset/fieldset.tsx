import { forwardRef } from 'react';

import { cn, ElementFont, getAriaLabels, getFontClass, SurfaceColor, useUniqueId } from '../../utils';
import { SelectionContext } from '../../context';
import { useSelection, useSelectionState } from '../../hooks';
import { BoxBase, BoxBaseProps } from '../base';
import { Description, LabelText } from '../../internal';

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
 * Extends {@link BoxBaseProps} except for `as`, `elementClass`, `color`, `onChange` and `defaultValue`.
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

    /** Disables all controls inside; a child cannot re-enable itself. */
    disabled?: boolean;

    /** Error message displayed below the fieldset content. Overrides `description`. */
    error?: string;

    /** Font token applied to the legend text. @default 'labelLarge' */
    font?: ElementFont;

    /** Text rendered inside the native `<legend>` element. */
    label?: string;

    /** Shared `name` attribute applied to the grouped inputs. */
    name?: string;

    /** Called with the selected values when the selection changes. */
    onChange?: (values: string[]) => void;

    /** Adds a required indicator to the legend; with `role="radiogroup"` also sets `aria-required`. */
    required?: boolean;

    /** Lets the fieldset manage the selected value(s) of its controls. @default 'none' */
    selection?: 'none' | 'single' | 'multiple';

    /** Controlled selected value(s). */
    value?: string | string[];
}

/**
 * Semantic wrapper for grouping related form controls.
 *
 * Renders a native fieldset with an optional legend, description and error message.
 * With `selection`, it also manages the selected value(s) of the controls inside.
 *
 * @remarks
 * Lays out its content as a column: `direction` defaults to `'col'` and `alignItems` to `'start'`.
 *
 * @function
 * @param props Component properties.
 * @example
 * ```tsx
 * <Fieldset label="Notifications">
 *     <Checkbox label="Email" />
 *     <Checkbox label="SMS" />
 * </Fieldset>
 * ```
 *
 * @example
 * ```tsx
 * <Fieldset defaultValue={['email']} label="Notifications" name="notify" selection="multiple">
 *     <Checkbox label="Email" value="email" />
 *     <Checkbox label="SMS" value="sms" />
 * </Fieldset>
 * ```
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
            children,
            direction = 'col',
            required,
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
        const ss = useSelectionState({
            type: selection === 'multiple' ? 'multiple' : 'single',
            value,
            defaultValue,
            onChange,
            deselectable: false,
        });
        const legendClasses = cn('uui-fieldset-legend', getFontClass(font ?? 'labelLarge'));

        return (
            <>
                {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
                <SelectionContext.Provider
                    value={{ ...ss, config: { group: selection === 'none' ? undefined : selection, name }, disabled: finalDisabled }}>
                    <BoxBase
                        ref={ref}
                        {...props}
                        {...getAriaLabels(elemId, {
                            label,
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
                        {label && (
                            <legend className={legendClasses} id={`${elemId}-label`}>
                                <LabelText label={label} required={required} />
                            </legend>
                        )}
                        {children}
                    </BoxBase>
                </SelectionContext.Provider>
                <Description description={description} error={error} id={`${elemId}-desc`} />
            </>
        );
    }
);

Fieldset.displayName = 'Fieldset';
