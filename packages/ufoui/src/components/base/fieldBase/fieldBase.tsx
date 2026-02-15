import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {
  clampInt,
  ElementBorder,
  ElementDensity,
  ElementFont,
  ElementShape,
  getBorderClass,
  getDensityClass,
  getFontClass,
  getShapeClass,
  mergeRefs,
  uniqueID,
} from '../../../utils/utils';
import {
  BorderColor,
  ControlStyle,
  SemanticColor,
  SurfaceColor,
} from '../../../utils/color';
import { useFocusState } from '../../../hooks/useFocusState';

type FieldVariant = 'filled' | 'outlined' | 'classic';

export interface FieldBaseProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'color' | 'children'
  > {
  color?: SemanticColor;
  /** Required root class name. */
  elementClass: string;
  /** Visual density of the button. */
  density?: ElementDensity;
  /** Text label for the field. */
  label?: string;
  labelFont?: ElementFont;
  error?: string;
  /** Supporting text displayed below control. */
  description?: string;

  /** Text color override for the description. */
  descriptionColor?: SurfaceColor;

  /** Font style applied to the description text. */
  descriptionFont?: ElementFont;
  variant?: FieldVariant;
  outlined?: boolean;
  filled?: boolean;
  classic?: boolean;
  fullWidth?: boolean;
  /** Control shape variant. */
  shape?: ElementShape;
  /** Text color override for the label. */
  labelColor?: SurfaceColor;
  /** Text color override for the placeholder. */
  placeholderColor?: SurfaceColor;

  border?: ElementBorder;
  borderColor?: BorderColor;
  placeholder?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  /** Font style applied to the label. */
  font?: ElementFont;
  placeholderFont?: ElementFont;
  /** Marks the control as required (visual indicator only). */
  required?: boolean;
  /** Text color override for label and content. */
  textColor?: SurfaceColor;
}

export const FieldBase = forwardRef<HTMLInputElement, FieldBaseProps>(
  (props: FieldBaseProps, ref) => {
    const {
      elementClass,
      color,
      density,
      label,
      labelColor,
      labelFont,
      id,
      outlined,
      filled,
      classic,
      disabled,
      font,
      placeholderFont,
      placeholderColor,
      border,
      borderColor,
      shape,
      required,
      title,
      description,
      descriptionColor,
      descriptionFont,
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
      textColor,
      defaultValue,
      ...other
    } = props;

    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const isControlled = value !== undefined;

    const fieldValue = isControlled ? value : internalValue;
    const isEmpty = fieldValue.length === 0;

    const inputRef = useRef<HTMLInputElement>(null);
    const controlRef = useRef<HTMLDivElement>(null);
    const elemId = id ?? uniqueID('input');

    const [labelUpX, setLabelUpX] = useState(0);
    const finalLeading = leading ?? icon;

    const fieldVariant =
      variant ??
      (filled && 'filled') ??
      (outlined && 'outlined') ??
      (classic && 'classic') ??
      'filled';

    const { isFocused } = useFocusState(inputRef);

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

    useLayoutEffect(() => {
      const control = controlRef.current;
      const input = inputRef.current;
      if (!control || !input) {
        return;
      }

      const next =
        control.getBoundingClientRect().left -
        input.getBoundingClientRect().left +
        16;
      setLabelUpX((prev) => (prev === next ? prev : next));
    }, [finalLeading]);

    // Wrapper
    const wrapperClasses = [
      elementClass,
      className,
      'uui-field uui-field-wrapper',
      `uui-${fieldVariant}`,
      getDensityClass(density),
    ];

    // Leading

    const leadingContent = finalLeading && (
      <div className="uui-leading">
        {React.Children.map(finalLeading, (child) =>
          child ? (
            <span
              className="uui-slot"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {child}
            </span>
          ) : null,
        )}
      </div>
    );

    // Trailing
    const finalTrailing = trailing ?? endIcon;
    const trailingContent = finalTrailing && (
      <div className="uui-trailing">
        {React.Children.map(finalTrailing, (child) =>
          child ? (
            <span
              className="uui-slot"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {child}
            </span>
          ) : null,
        )}
      </div>
    );

    // Label
    const labelText = label && (
      <>
        {label}
        {required && (
          <span aria-hidden="true" className="uui-required">
            *
          </span>
        )}
      </>
    );

    const resolvedBorder =
      border ?? (fieldVariant !== 'filled' ? 1 : undefined);
    const controlClasses = [
      'uui-field-control',
      getFontClass(font ?? 'bodyLarge'),
      getShapeClass(shape ?? 'rounded'),
      fieldVariant !== 'outlined' && getBorderClass(resolvedBorder),
      error && 'uui-error',
      isFocused && 'uui-active',
      disabled && 'uui-disabled',
      leadingContent && 'uui-has-leading',
      trailingContent && 'uui-has-trailing',
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
          legendContent = (
            <legend className={getFontClass(labelFont ?? 'bodySmall')}>
              {labelText}
            </legend>
          );
          labelContent = (
            <span className={labelClasses.join(' ')}>{labelText}</span>
          );
        } else {
          labelPlaceholder = (
            <span className={getFontClass(labelFont ?? 'bodySmall')}>
              &nbsp;
            </span>
          );
          labelContent = (
            <span className={labelClasses.join(' ')}>{labelText}</span>
          );
        }
      } else {
        labelStyle.text((error ? 'error' : undefined) ?? 'onSurface');
        labelClasses.push(getFontClass(labelFont ?? 'bodyMedium'));
        const finalLabelClasses = labelClasses.filter(Boolean).join(' ');
        externalLabelContent = (
          <label
            className={finalLabelClasses}
            htmlFor={elemId}
            style={labelStyle.get()}
          >
            {labelText}
          </label>
        );
      }
    }

    // Fieldset
    let fieldsetContent;
    if (fieldVariant === 'outlined') {
      const fieldsetClasses = [
        'uui-field-fieldset',
        getShapeClass(shape ?? 'rounded'),
      ]
        .filter(Boolean)
        .join(' ');
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

    if (fieldVariant === 'classic') {
      controlStyle.border(borderColor ?? 'outline');
    }

    if (fieldVariant === 'filled') {
      controlStyle.border(borderColor ?? 'onSurfaceVariant');
    }

    // State
    const stateClasses = ['uui-field-state'].filter(Boolean).join(' ');
    const stateStyle = ControlStyle();

    // Description & Error
    const descriptionStyle = ControlStyle();
    if (error) {
      descriptionStyle.text('error');
    } else if (descriptionColor) {
      descriptionStyle.text(descriptionColor);
    } else {
      descriptionStyle.text.on('surfaceVariant');
    }

    const descriptionClasses = [
      getFontClass(descriptionFont ?? 'bodySmall'),
      error && 'uui-error uui-support-text',
      description && !error && 'uui-description uui-support-text',
    ]
      .filter(Boolean)
      .join(' ');

    const descriptionText = (description ?? error) && (
      <div className={descriptionClasses} style={descriptionStyle.get()}>
        {error ?? description}
      </div>
    );

    // Input
    const inputClasses = 'uui-field-input';
    const inputStyle = ControlStyle();
    inputStyle.text('onSurface');
    if (!isFocused && labelContent && isEmpty) {
      inputStyle.set('opacity', 0);
    }

    // Input Wrapper
    const inputWrapperClasses = ['uui-field-input-wrapper']
      .filter(Boolean)
      .join(' ');

    const wrapperClass = wrapperClasses.filter(Boolean).join(' ');
    const controlClass = controlClasses.filter(Boolean).join(' ');
    return (
      <div className={wrapperClass} title={title}>
        {externalLabelContent}
        <div
          className={controlClass}
          onPointerDown={focusInput}
          ref={controlRef}
          style={controlStyle.get()}
        >
          {leadingContent}
          <div className={inputWrapperClasses}>
            {labelPlaceholder}
            {labelContent}
            <input
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
          {/* {fieldVariant === 'filled' && labelContent}*/}
          {trailingContent}
          {fieldVariant === 'filled' && (
            <div className={stateClasses} style={stateStyle.get()} />
          )}
          {fieldsetContent}
        </div>
        {descriptionText}
      </div>
    );
  },
);

FieldBase.displayName = 'FieldBase';
