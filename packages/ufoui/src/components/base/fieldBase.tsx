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
import { useDisableFocusWithin } from '../../hooks/useDisableFocusWithin';

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
export interface FieldBaseProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'children' | 'rows'> {
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

    /** Renders the control as a multi-line text area. */
    multiline?: boolean;

    /** Minimum number of visible text lines the area grows from when `multiline` is set. Default: 3 */
    lines?: number;

    /** Maximum number of visible text lines the area grows to when `multiline` is set. Default: unlimited */
    maxLines?: number;

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
// eslint-disable-next-line sonarjs/cognitive-complexity
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
        multiline,
        lines,
        maxLines,
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
    const borderWidth = clampInt(0, 4, border, fieldVariant !== 'filled' ? 1 : 0);
    const { isFocused, focusHandlers } = useFocusVisible(onFocus, onBlur);

    const [labelUpX, setLabelUpX] = useState(0);

    useDisableFocusWithin(controlRef, disabled);

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

    // Autosize the text area: `rows` holds the minimum height, maxLines caps the growth.
    useLayoutEffect(() => {
        const el = inputRef.current;
        if (!multiline || !el) {
            return;
        }
        const autosize = () => {
            el.style.height = 'auto';
            const max = (maxLines ?? 0) * parseFloat(getComputedStyle(el).lineHeight) || Infinity;
            el.style.height = `${Math.min(Math.max(el.scrollHeight, el.offsetHeight), max)}px`;
        };
        autosize();
        // Only width matters – it rewraps the text; height changes are the autosize itself.
        let width = el.clientWidth;
        const observer = new ResizeObserver(() => {
            if (width !== el.clientWidth) {
                width = el.clientWidth;
                autosize();
            }
        });
        observer.observe(el);
        return () => {
            observer.disconnect();
        };
    }, [multiline, maxLines, fieldValue]);

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
    const wrapperClasses = cn(
        elementClass,
        className,
        'uui-field',
        `uui-${fieldVariant}`,
        disabled && 'uui-disabled',
        getDensityClass(density),
        error && 'uui-error'
    );

    // Label
    const labelText = label && <LabelText label={label} required={required} />;

    // Label & Legend
    let labelContent;
    let labelPlaceholder;
    let legendContent;
    let externalLabelContent;
    const labelStyle = ControlStyle();
    const labelClasses = ['uui-field-label'];

    if (labelText) {
        if (fieldVariant !== 'classic') {
            if (isFocused || !isEmpty) {
                labelClasses.push(getFontClass(labelFont ?? 'bodySmall'));
            } else {
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
        fieldsetContent = (
            <fieldset className={fieldsetClasses} style={fieldsetStyle.get()}>
                {legendContent}
            </fieldset>
        );
    }

    // Control
    const controlClasses = [
        'uui-field-control',
        getFontClass(font ?? 'bodyLarge'),
        getShapeClass(shape ?? 'smooth'),
        fieldVariant !== 'outlined' && getBorderClass(borderWidth as ElementBorder),
        isFocused && 'uui-active',
        finalLeading && 'uui-has-leading',
        finalTrailing && 'uui-has-trailing',
        multiline && 'uui-multiline',
        (isFocused || !isEmpty) && 'uui-field-label-up',
    ];

    const controlStyle = ControlStyle();
    if (shape && shape === 'round') {
        controlStyle.set('--uui-label-up-x', `${labelUpX + 14 + (borderWidth ?? 0) / 2}px`);
    } else {
        controlStyle.set('--uui-label-up-x', `${labelUpX}px`);
    }
    controlStyle.current(color);

    if (border && border > 0) {
        controlStyle.set('--uui-border-width', `${border}px`);
        controlStyle.set('--uui-active-border-width', `${border + 1}px`);
    }

    if (borderColor) {
        controlStyle.token('--uui-border-color', borderColor);
    }

    const indicator = fieldVariant === 'filled' ? <div className="uui-field-indicator"></div> : null;

    // State
    const stateClasses = cn('uui-field-state');
    const stateStyle = ControlStyle();

    const descriptionText = <Description description={description} error={error} />;

    // Input
    const inputClasses = 'uui-field-input uui-scroller';
    const inputStyle = ControlStyle();
    inputStyle.text('onSurface');
    if (!isFocused && labelContent && isEmpty) {
        inputStyle.set('opacity', 0);
    }

    // Input Wrapper
    const inputWrapperClasses = cn('uui-field-input-wrapper');
    const InputTag = (multiline ? 'textarea' : 'input') as 'input';
    return (
        <div className={wrapperClasses} title={title}>
            {externalLabelContent}
            <div
                aria-disabled={disabled}
                className={cn(controlClasses)}
                onPointerDown={focusInput}
                ref={controlRef}
                {...(disabled ? { inert: 'true' } : {})}
                style={controlStyle.get()}>
                {leadingContent}
                <div className={inputWrapperClasses}>
                    {labelPlaceholder}
                    {labelContent}
                    <InputTag
                        {...focusHandlers}
                        {...other}
                        {...(multiline ? { rows: lines ?? 3 } : {})}
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
