import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';

import {
    BorderColor,
    clampInt,
    cn,
    ControlStyle,
    ElementBorder,
    ElementDensity,
    ElementFont,
    ElementShape,
    getBorderClass,
    getDensityClass,
    getFontClass,
    getShapeClass,
    mergeRefs,
    SemanticColor,
    useUniqueId,
} from '../../utils';
import { useFocusVisible } from '../../hooks';
import { Description, LabelText, Leading, Trailing } from '../../internal';

/** Visual variant of the field control. */
type FieldVariant = 'filled' | 'outlined' | 'classic';

/**
 * Props for the FieldBase component.
 *
 * Supports controlled and uncontrolled usage, floating and static labels,
 * leading and trailing slots, and validation messaging.
 *
 * @category Base components
 */
export interface FieldBaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'children'> {
    /** Semantic color used as the control accent when active. Default: primary */
    color?: SemanticColor;

    /** Required root class name. */
    elementClass: string;

    /** Visual density of the field. */
    density?: ElementDensity;

    /** Text label for the field. */
    label?: string;

    /** Font style applied to the label in its floating position. Default: bodySmall */
    labelFont?: ElementFont;

    /** Validation message. Marks the control invalid and replaces the description. */
    error?: string;

    /** Supporting text displayed below control. */
    description?: string;

    /** Visual field variant. Takes precedence over boolean variant shortcuts. */
    variant?: FieldVariant;

    /** Shortcut for `variant="outlined"`. */
    outlined?: boolean;

    /** Shortcut for `variant="filled"`. */
    filled?: boolean;

    /** Shortcut for `variant="classic"`. */
    classic?: boolean;

    fullWidth?: boolean;

    /** Control shape variant. Default: smooth */
    shape?: ElementShape;

    /** Border width of the control. Default: 1 for outlined and classic */
    border?: ElementBorder;

    /** Border color override. Default: onSurfaceVariant, outline for classic */
    borderColor?: BorderColor;

    /** Placeholder text shown while the field is empty. */
    placeholder?: string;

    /** Content rendered before the input. */
    leading?: React.ReactNode;

    /** Content rendered after the input. */
    trailing?: React.ReactNode;

    /** Icon rendered before the leading content. */
    icon?: React.ReactNode;

    /** Icon rendered after the trailing content. */
    endIcon?: React.ReactNode;

    /** Controlled value of the input. */
    value?: string;

    /** Initial value for uncontrolled usage. */
    defaultValue?: string;

    /** Font style applied to the control and to the resting label. Default: bodyLarge */
    font?: ElementFont;

    /** Marks the control as required (visual indicator only). */
    required?: boolean;
}

/**
 * Base input control shared by all field components.
 *
 * @remarks
 * The `filled` and `outlined` variants float the label above the input once it is
 * focused or filled, while `classic` renders it as a static label above the control.
 * The value is uncontrolled unless `value` is provided.
 *
 * @example
 * <FieldBase elementClass="uui-text-field" label="Label" />
 *
 * @example
 * <FieldBase elementClass="uui-text-field" label="Email" outlined error="Required" />
 *
 * @category Base components
 */
export const FieldBase = forwardRef<HTMLInputElement, FieldBaseProps>((props: FieldBaseProps, ref) => {
    const {
        elementClass,
        color,
        density,
        label,
        labelFont,
        id,
        outlined,
        filled,
        classic,
        disabled,
        font,
        onFocus,
        onBlur,
        border,
        borderColor,
        shape,
        required,
        title,
        description,
        name,
        error,
        className,
        placeholder,
        type = 'text',
        icon,
        leading,
        trailing,
        endIcon,
        variant,
        value,
        defaultValue,
        ...other
    } = props;

    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const isControlled = value !== undefined;
    const fieldValue = isControlled ? value : internalValue;
    const isEmpty = fieldValue.length === 0;
    const inputRef = useRef<HTMLInputElement>(null);
    const controlRef = useRef<HTMLDivElement>(null);
    const generatedId = useUniqueId('input');
    const elemId = id ?? generatedId;
    const fieldVariant = variant ?? (filled ? 'filled' : outlined ? 'outlined' : classic ? 'classic' : 'filled');

    const [labelUpX, setLabelUpX] = useState(0);
    const { isFocused, focusHandlers } = useFocusVisible(onFocus, onBlur);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setInternalValue(e.target.value);
        }
        props.onChange?.(e);
    };

    const focusInput = (e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();
        inputRef.current?.focus();
    };

    // Sync internalValue with the input’s initial DOM value (e.g. autofill / uncontrolled).
    useEffect(() => {
        const el = inputRef.current;
        if (!el) {
            return;
        }
        if (el.value) {
            setInternalValue(el.value);
        }
    }, []);

    // Leading
    const finalLeading = leading ?? icon;
    useLayoutEffect(() => {
        const control = controlRef.current;
        const input = inputRef.current;
        if (!control || !input) {
            return;
        }
        const next = control.getBoundingClientRect().left - input.getBoundingClientRect().left + 16;
        setLabelUpX(prev => (prev === next ? prev : next));
    }, [finalLeading]);
    const leadingContent = <Leading content={leading} start={icon} />;

    // Trailing
    const finalTrailing = trailing ?? endIcon;
    const trailingContent = <Trailing content={trailing} end={endIcon} />;

    // Wrapper
    const wrapperClasses = [elementClass, className, 'uui-field', `uui-${fieldVariant}`, getDensityClass(density)];

    // Label
    const labelText = label && <LabelText label={label} required={required} />;

    const resolvedBorder = border ?? (fieldVariant !== 'filled' ? 1 : undefined);
    const controlClasses = [
        'uui-field-control',
        getFontClass(font ?? 'bodyLarge'),
        getShapeClass(shape ?? 'smooth'),
        fieldVariant !== 'outlined' && getBorderClass(resolvedBorder),
        error && 'uui-error',
        isFocused && 'uui-active',
        disabled && 'uui-disabled',
        finalLeading && 'uui-has-leading',
        finalTrailing && 'uui-has-trailing',
    ];

    // Label & Legend
    let labelContent;
    let labelPlaceholder;
    let legendContent;
    let externalLabelContent;
    const labelStyle = ControlStyle();
    const labelClasses = ['uui-fb-label'];

    if (labelText) {
        if (fieldVariant !== 'classic') {
            if (isFocused || !isEmpty) {
                labelStyle.text((error ? 'error' : undefined) ?? color ?? 'primary');
                labelClasses.push(getFontClass(labelFont ?? 'bodySmall'));
                controlClasses.push('uui-fb-label-up');
            } else {
                labelStyle.text((error ? 'error' : undefined) ?? 'onSurfaceVariant');
                labelClasses.push(getFontClass(font ?? 'bodyLarge'));
            }

            labelClasses.push('uui-field-float-label');
            if (fieldVariant === 'outlined') {
                legendContent = <legend className={getFontClass(labelFont ?? 'bodySmall')}>{labelText}</legend>;
                labelContent = <span className={labelClasses.join(' ')}>{labelText}</span>;
            } else {
                labelPlaceholder = <span className={getFontClass(labelFont ?? 'bodySmall')}>&nbsp;</span>;
                labelContent = <span className={labelClasses.join(' ')}>{labelText}</span>;
            }
        } else {
            labelStyle.text((error ? 'error' : undefined) ?? 'onSurface');
            labelClasses.push(getFontClass(labelFont ?? 'bodyMedium'));
            const finalLabelClasses = labelClasses.filter(Boolean).join(' ');
            externalLabelContent = (
                <label className={finalLabelClasses} htmlFor={elemId} style={labelStyle.get()}>
                    {labelText}
                </label>
            );
        }
    }

    // Fieldset
    let fieldsetContent;
    if (fieldVariant === 'outlined') {
        const fieldsetClasses = cn('uui-field-fieldset', getShapeClass(shape ?? 'rounded'));
        const fieldsetStyle = ControlStyle();

        const borderWidth = clampInt(0, 4, border, 1);
        fieldsetStyle.set('borderWidth', `${borderWidth}px`);
        fieldsetStyle.border(borderColor ?? 'onSurfaceVariant');

        fieldsetContent = (
            <fieldset className={fieldsetClasses} style={fieldsetStyle.get()}>
                {legendContent}
            </fieldset>
        );
    }

    // Control

    const controlStyle = ControlStyle();
    controlStyle.set('--uui-label-up-x', `${labelUpX}px`);
    controlStyle.current(color);
    if (border && border > 2) {
        controlStyle.set('--uui-field-indicator-height', `${border}px`);
        controlStyle.set('--uui-field-active-indicator-height', `${border}px`);
    }

    if (fieldVariant === 'classic') {
        controlStyle.border(borderColor ?? 'outline');
    }

    let indicator;
    if (fieldVariant === 'filled') {
        controlStyle.border(borderColor ?? 'onSurfaceVariant');
        indicator = <div className="uui-field-indicator"></div>;
    }

    // State
    const stateClasses = cn('uui-field-state');
    const stateStyle = ControlStyle();

    const descriptionText = <Description description={description} error={error} />;

    // Input
    const inputClasses = 'uui-field-input';
    const inputStyle = ControlStyle();
    inputStyle.text('onSurface');
    if (!isFocused && labelContent && isEmpty) {
        inputStyle.set('opacity', 0);
    }

    // Input Wrapper
    const inputWrapperClasses = cn('uui-field-input-wrapper');

    const wrapperClass = wrapperClasses.filter(Boolean).join(' ');
    const controlClass = controlClasses.filter(Boolean).join(' ');
    return (
        <div className={wrapperClass} title={title}>
            {externalLabelContent}
            <div
                aria-disabled={disabled}
                {...(disabled ? { inert: 'true' } : {})}
                className={controlClass}
                onPointerDown={focusInput}
                ref={controlRef}
                style={controlStyle.get()}>
                {leadingContent}
                <div className={inputWrapperClasses}>
                    {labelPlaceholder}
                    {labelContent}
                    <input
                        {...focusHandlers}
                        {...other}
                        {...(isControlled ? { value } : { defaultValue })}
                        aria-invalid={!!error}
                        autoComplete="email"
                        className={inputClasses}
                        disabled={disabled}
                        id={elemId}
                        name={name}
                        onChange={handleChange}
                        placeholder={placeholder}
                        ref={mergeRefs(ref, inputRef)}
                        style={inputStyle.get()}
                        type={type}
                    />
                </div>
                {trailingContent}
                {fieldVariant === 'filled' && <div className={stateClasses} style={stateStyle.get()} />}
                {fieldsetContent}
                {indicator}
            </div>
            {descriptionText}
        </div>
    );
});

FieldBase.displayName = 'FieldBase';
