import React, { forwardRef, ReactNode, useContext, useEffect, useRef, useState } from 'react';

import {
    createRipple,
    ElementAlign,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFocusEffect,
    ElementFont,
    ElementHoverEffect,
    ElementOutline,
    ElementPressedEffect,
    ElementSelectedEffect,
    ElementShape,
    ElementSize,
    ElementTextPlacement,
    ElementTouchEffect,
    getBorderClass,
    getDensityClass,
    getElevationClass,
    getFontClass,
    getShapeClass,
    getSizeClass,
    mergeRefs,
    uniqueID,
} from '@ufoui/utils';
import { RadioGroupContext } from '@ufoui/context/radioGroupContext';
import { FieldsetContext } from '@ufoui/context/fieldsetContext';
import { getAnimationClass, getMotionStyleClass, MotionAnimation, MotionStyle } from '@ufoui/types';

import { BorderColor, ControlStyle, getSurfaceColorVar, SemanticColor, SurfaceColor } from '../../../utils/color';
import { useFocusVisible } from '../../../hooks/useFocusVisible';
import { InlineTooltipManager } from '../../../internal/inlineTooltip/inlineTooltipManager';
import { useAnimate } from '../../../hooks/useAnimate';

/**
 * Props for the CheckboxBase component.
 *
 * Supports controlled and uncontrolled usage, visual effects,
 * animation configuration, and accessibility features.
 *
 * @category Base components
 */
export interface CheckboxBaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'size'> {
    /** Animation preset for check and uncheck transitions. */
    animation?: MotionAnimation;

    /** Border style. */
    border?: ElementBorder;

    /** Border color override. */
    borderColor?: BorderColor;

    /** Custom content rendered instead of the default glyph. */
    children?: ReactNode;

    /** Additional root class name. */
    className?: string;

    /** Semantic color used when checked. */
    color?: SemanticColor;

    /** Visual density of the control. */
    density?: ElementDensity;

    /** Supporting text displayed below the label. */
    description?: string;

    /** Text color override for the description. */
    descriptionColor?: SurfaceColor;

    /** Font applied to the description text. */
    descriptionFont?: ElementFont;

    /** Duration in milliseconds for the check or uncheck animation. */
    duration?: number;

    /** Required root class name for styling. */
    elementClass: string;

    /** Elevation level applied to the glyph. */
    elevation?: ElementElevation;

    /** Error message text. Overrides description when present. */
    error?: string;

    /** Enables filled visual style. */
    filled?: boolean;

    /** Focus color override. */
    focusColor?: BorderColor;

    /** Visual effects applied on focus. */
    focusEffects?: ElementFocusEffect[];

    /** Font applied to the label text. */
    font?: ElementFont;

    /** Visual effects applied on hover. */
    hoverEffects?: ElementHoverEffect[];

    /** Icon rendered in checked state. */
    icon?: ReactNode;

    /** DOM id. Auto-generated when not provided. */
    id?: string;

    /** Enables indeterminate (mixed) state. */
    indeterminate?: boolean;

    /** Icon rendered in indeterminate state. */
    indeterminateIcon?: ReactNode;

    /** Text label displayed next to the control. */
    label?: string;

    /** Text color override for the label. */
    labelColor?: SurfaceColor;

    /** Motion style applied to animated elements. */
    motionStyle?: MotionStyle;

    /** DOM name attribute. */
    name?: string;

    /** Change event handler. */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;

    /** Visual effects applied while pressed. */
    pressedEffects?: ElementPressedEffect[];

    /** Marks the control as read-only without disabling focus. */
    readOnly?: boolean;

    /** Marks the control as required. Visual indicator only. */
    required?: boolean;

    /** Visual effects applied when selected. */
    selectedEffects?: ElementSelectedEffect[];

    /** Shape variant of the control. */
    shape?: ElementShape;

    /** Size of the control. */
    size?: ElementSize;

    /** Text color override for label and content. */
    textColor?: SurfaceColor;

    /** Placement of text relative to the control. */
    textPlacement?: ElementTextPlacement;

    /** Tooltip alignment relative to the control. */
    tooltipAlign?: ElementAlign;

    /** Touch and click visual effects. */
    touchEffects?: ElementTouchEffect[];

    /** Input type. */
    type: 'radio' | 'checkbox';

    /** Border style when unchecked. */
    uncheckedBorder?: ElementOutline;

    /** Border color when unchecked. */
    uncheckedBorderColor?: BorderColor;

    /** Semantic color used when unchecked. */
    uncheckedColor?: SemanticColor;

    /** Icon rendered when unchecked. */
    uncheckedIcon?: ReactNode;

    /** Controlled value for radio buttons. */
    value?: string;
}

/**
 * Low-level base component for checkbox and radio controls.
 *
 * Supports controlled and uncontrolled usage.
 *
 *
 * @param props Component properties.
 * @function
 *
 * @example
 * <CheckboxBase label="Accept terms" />
 *
 * @example
 * <CheckboxBase
 *   type="checkbox"
 *   label="Select all"
 *   indeterminate
 * />
 *
 * @category Base components
 */

// eslint-disable-next-line sonarjs/cognitive-complexity
export const CheckboxBase = forwardRef<HTMLInputElement, CheckboxBaseProps>((props: CheckboxBaseProps, ref) => {
    const {
        elementClass,
        density,
        icon,
        disabled,
        elevation,
        checked,
        children,
        color,
        uncheckedColor,
        defaultChecked,
        indeterminate,
        hoverEffects = ['overlay'],
        touchEffects = ['ripple'],
        focusEffects = ['ring'],
        selectedEffects = [],
        pressedEffects = ['overlay'],
        id,
        name,
        label,
        font,
        border,
        borderColor,
        uncheckedBorder,
        uncheckedBorderColor,
        onChange,
        onClick,
        type,
        required,
        shape = 'smooth',
        title,
        filled,
        value,
        size = 'small',
        uncheckedIcon,
        indeterminateIcon,
        description,
        descriptionColor,
        descriptionFont,
        className,
        error,
        animation,
        duration = 150,
        motionStyle = 'regular',
        focusColor,
        labelColor,
        textColor,
        readOnly,
        tooltipAlign = 'auto',
        textPlacement = 'end',
        'aria-label': ariaLabel,
        ...other
    } = props;

    const { animationVars, animate, animating } = useAnimate({ t1: duration, oneShot: true });

    const group = useContext(RadioGroupContext);
    const resolvedName = type === 'radio' ? (name ?? group?.name) : name;
    const fieldset = useContext(FieldsetContext);
    const resolvedDisabled = disabled ?? fieldset?.disabled;

    const focusVisible = useFocusVisible();
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const controlRef = useRef<HTMLDivElement>(null);
    const stateRef = useRef<HTMLDivElement>(null);
    const internalIdRef = useRef(uniqueID('check'));
    const elemId = id ?? internalIdRef.current;

    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

    let isChecked;
    if (isControlled) {
        isChecked = !!checked;
    } else if (group?.value !== undefined) {
        isChecked = group.value === value;
    } else {
        isChecked = internalChecked;
    }
    // eslint-disable-next-line sonarjs/no-nested-conditional,no-nested-ternary
    const logicalState = indeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked';
    const [visualState, setVisualState] = useState(logicalState);

    const finalAriaLabel = ariaLabel ?? (!label ? title : undefined);
    // eslint-disable-next-line sonarjs/no-nested-conditional,no-nested-ternary
    const finalColor = error ? 'error' : !isChecked && !indeterminate && uncheckedColor ? uncheckedColor : color;
    const inlineTooltip = title ? <div id={`${elemId}-tip`}>{title}</div> : null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (readOnly) {
            e.preventDefault();
            return;
        }
        const input = e.currentTarget;
        if (!isControlled) {
            if (type === 'radio' && group?.setValue) {
                group.setValue(input.value);
            }
            setInternalChecked(input.checked);
        }
        onChange?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        if (readOnly) {
            e.preventDefault();
            return;
        }
        if (touchEffects.includes('ripple') && stateRef.current && controlRef.current) {
            createRipple(stateRef.current, e, controlRef.current);
        }
        onClick?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        props.onBlur?.(e);
    };

    useEffect(() => {
        if (logicalState !== visualState && animation) {
            animate();
        }
    }, [logicalState, visualState, animation, animate]);

    useEffect(() => {
        if (!animating) {
            setVisualState(logicalState);
        }
    }, [animating, logicalState]);

    // render
    const wrapperStyle = ControlStyle();

    const wrapperClasses = [
        elementClass,
        'uui-cb',
        getDensityClass(density),
        className,
        resolvedDisabled && 'uui-disabled',
        ...(!children ? [getSizeClass(size)] : []),
    ]
        .filter(Boolean)
        .join(' ');

    const controlClasses = [
        'uui-cb-control',

        isChecked && 'uui-checked',
        indeterminate && 'uui-indeterminate',
        filled && 'uui-filled',
        ...(hoverEffects.includes('overlay') && !readOnly ? ['uui-hover-overlay'] : []),
        ...(focusEffects.includes('overlay') && focusVisible && isFocused ? ['uui-focus-overlay'] : []),
        ...(selectedEffects.includes('overlay') ? ['uui-selected-overlay'] : []),
        ...(pressedEffects.includes('overlay') && !readOnly ? ['uui-pressed-overlay'] : []),
        ...(children ? [getShapeClass(shape)] : ['uui-round']),
    ]
        .filter(Boolean)
        .join(' ');

    const controlStyle = ControlStyle();

    if (focusColor && focusVisible && isFocused) {
        controlStyle.set('--uui-focus-color', getSurfaceColorVar(focusColor).color);
    }

    const inputClasses = [
        'uui-input',
        focusEffects.includes('ring') && focusVisible && isFocused && 'uui-focus-visible uui-focus-ring',
    ]
        .filter(Boolean)
        .join(' ');
    const stateClasses = ['uui-state'].filter(Boolean).join(' ');

    const stateStyle = ControlStyle();
    stateStyle.bg(finalColor);

    const glyphClasses = [
        'uui-cb-glyph',
        getElevationClass(elevation),
        getShapeClass(shape),
        getBorderClass(isChecked ? border : uncheckedBorder),
    ]
        .filter(Boolean)
        .join(' ');

    const glyphStyle = ControlStyle();
    const animationClass = getAnimationClass(animation);
    const iconClasses = ['uui-icon', animating && animationClass, getMotionStyleClass(motionStyle)]
        .filter(Boolean)
        .join(' ');
    const iconStyle = ControlStyle();
    iconStyle.merge(animationVars);

    if (isChecked || indeterminate || uncheckedColor) {
        glyphStyle.border(error ? 'error' : borderColor);
        if (filled) {
            const skipFill = !isChecked && !uncheckedIcon && !indeterminate;
            if (!skipFill) {
                glyphStyle.bg(finalColor);
            }
            iconStyle.text.on(finalColor);
        } else {
            iconStyle.text(finalColor);
        }
    } else {
        if (filled && uncheckedIcon) {
            iconStyle.text(error ? 'onError' : 'surface');
            glyphStyle.bg(error ? 'error' : 'onSurfaceVariant');
        } else if (uncheckedIcon) {
            iconStyle.text(error ? 'error' : 'onSurfaceVariant');
        }
        glyphStyle.border(error ? 'error' : uncheckedBorderColor);
    }
    let content;
    if (children) {
        const contentClasses = ['uui-cb-content uui-overflow-hidden', getShapeClass(shape), getBorderClass(border)]
            .filter(Boolean)
            .join(' ');
        content = <div className={contentClasses}>{children}</div>;
    } else {
        const displayedIcon =
            // eslint-disable-next-line sonarjs/no-nested-conditional,no-nested-ternary
            visualState === 'indeterminate' ? indeterminateIcon : visualState === 'checked' ? icon : uncheckedIcon;
        content = (
            <div className={glyphClasses} style={glyphStyle.get()}>
                <div className={iconClasses} style={iconStyle.get()}>
                    {displayedIcon}
                </div>
            </div>
        );
    }

    const labelStyle = ControlStyle();
    labelStyle.text((error ? 'error' : undefined) ?? labelColor ?? textColor ?? 'onSurface');
    const labelClasses = [getFontClass(font ?? 'bodyMedium'), 'uui-cb-label'].join(' ');
    const labelText = label && (
        <label className={labelClasses} htmlFor={elemId} style={labelStyle.get()}>
            {label}
            {required && (
                <span aria-hidden="true" className="uui-required">
                    *
                </span>
            )}
        </label>
    );

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

    const controlText = (labelText ?? descriptionText) && (
        <>
            {labelText}
            {descriptionText}
        </>
    );

    const controlWrapperStyle = ControlStyle();

    if (textPlacement === 'end') {
        labelStyle.set('gridColumn', 2);
        descriptionStyle.set('gridColumn', 2);
        controlWrapperStyle.set('gridColumn', 1);
    } else if (textPlacement === 'start') {
        labelStyle.set('gridColumn', 1);
        descriptionStyle.set('gridColumn', 1);
        controlWrapperStyle.set('gridColumn', 2);
        controlWrapperStyle.set('gridRow', 1);
    } else {
        wrapperStyle.set('gridTemplateColumns', '1fr');
        wrapperStyle.set('justifyItems', 'start');
    }
    if (textPlacement === 'top') {
        controlWrapperStyle.set('order', 1);
        descriptionStyle.set('order', 2);
    }

    return (
        <div className={wrapperClasses} style={wrapperStyle.get()}>
            <div className="uui-cb-control-wrapper" style={controlWrapperStyle.get()}>
                <div className={controlClasses} ref={controlRef} style={controlStyle.get()}>
                    <input
                        aria-label={finalAriaLabel}
                        aria-readonly={readOnly === true ? true : undefined}
                        checked={!!isChecked}
                        className={inputClasses}
                        disabled={resolvedDisabled}
                        id={elemId}
                        name={resolvedName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onClick={handleClick}
                        onFocus={handleFocus}
                        readOnly={readOnly}
                        ref={mergeRefs(inputRef, ref)}
                        type={type}
                        value={value}
                        {...other}
                    />
                    <div className={stateClasses} ref={stateRef} style={stateStyle.get()} />
                    {content}
                </div>
            </div>
            {controlText}
            {inlineTooltip && (
                <InlineTooltipManager align={tooltipAlign} tooltip={inlineTooltip} triggerRef={inputRef} />
            )}
        </div>
    );
});

CheckboxBase.displayName = 'CheckBoxBase';
