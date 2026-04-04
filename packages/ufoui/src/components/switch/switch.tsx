import React, { forwardRef, ReactNode, useContext, useRef, useState } from 'react';

import {
    BorderColor,
    ControlStyle,
    createRipple,
    ElementDensity,
    ElementElevation,
    ElementFocusEffect,
    ElementFont,
    ElementHoverEffect,
    ElementOutline,
    ElementPlacement,
    ElementPressedEffect,
    ElementSelectedEffect,
    ElementShape,
    ElementSize,
    ElementTextPlacement,
    ElementTouchEffect,
    getBorderClass,
    getDensityClass,
    getElevationClass,
    getShapeClass,
    getSizeClass,
    getSurfaceColorVar,
    mergeRefs,
    SemanticColor,
    uniqueID,
} from '../../utils';
import { FieldsetContext } from '../../context';
import { useFocusVisible } from '../../hooks';
import { ControlGrid, ControlLabel, Description, InlineTooltipManager } from '../../internal';

/**
 * Props for the Switch component.
 *
 * Low-level boolean control.
 *
 * @category Switch
 */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'size' | 'type'> {
    /** Border style when outlined. */
    border?: ElementOutline;

    /** Border color override. */
    borderColor?: BorderColor;

    /** Border color when unchecked. */
    uncheckedBorderColor?: BorderColor;

    /** Custom content rendered inside the control. */
    children?: ReactNode;

    /** Additional root class name. */
    className?: string;

    /** Semantic color used for the checked state. */
    color?: SemanticColor;

    /** Semantic color used for the unchecked state. */
    uncheckedColor?: SemanticColor;

    /** Visual density affecting layout spacing. */
    density?: ElementDensity;

    /** Supporting text displayed below the label. */
    description?: string;

    /** Elevation level of the control surface. */
    elevation?: ElementElevation;

    /** Error message text. Overrides description when present. */
    error?: string;

    /** Focus ring color override. */
    focusColor?: BorderColor;

    /** Visual effects applied on focus. */
    focusEffects?: ElementFocusEffect[];

    /** Font token applied to the label text. */
    font?: ElementFont;

    /** Enables full color rendering for the unchecked state. */
    fullColor?: boolean;

    /** Visual effects applied on hover. */
    hoverEffects?: ElementHoverEffect[];

    /** Icon rendered when checked. */
    icon?: ReactNode;

    /** DOM id. Auto-generated if not provided. */
    id?: string;

    /** Text label associated with the control. */
    label?: string;

    /** Name attribute forwarded to the input element. */
    name?: string;

    /** Change event handler. */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;

    /** Visual effects applied on press. */
    pressedEffects?: ElementPressedEffect[];

    /** Marks the control as required. Visual only. */
    required?: boolean;

    /** Visual effects applied when checked. */
    selectedEffects?: ElementSelectedEffect[];

    /** Shape variant of the control. */
    shape?: ElementShape;

    /** Size of the control. */
    size?: ElementSize;

    /** Layout of text relative to the control. */
    textPlacement?: ElementTextPlacement;

    /** Tooltip alignment relative to the control. */
    tooltipAlign?: ElementPlacement;

    /** Touch and click visual effects. */
    touchEffects?: ElementTouchEffect[];

    /** Border style when unchecked. */
    uncheckedBorder?: ElementOutline;

    /** Icon rendered when unchecked. */
    uncheckedIcon?: ReactNode;

    /** Controlled value forwarded to the input element. */
    value?: string;

    /** Duration of the thumb transition between checked and unchecked states. */
    duration?: number;

    /** Marks the control as read-only. Applies aria-readonly. */
    readOnly?: boolean;
}

/**
 * Switch control used to toggle a setting on or off.
 *
 * Represents an immediate boolean preference.
 *
 * @function Switch
 * @param props Component properties.
 *
 * @example
 * <Switch label="Notifications" />
 *
 * @category Switch
 */

export const Switch = forwardRef<HTMLInputElement, SwitchProps>((props: SwitchProps, ref) => {
    const {
        density,
        icon,
        disabled,
        elevation,
        checked,
        children,
        color = 'primary',
        uncheckedColor,
        defaultChecked,
        hoverEffects = ['overlay'],
        touchEffects = ['ripple'],
        focusEffects = ['ring'],
        selectedEffects = [],
        pressedEffects = ['overlay', 'scale'],
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
        onFocus,
        onBlur,
        required,
        shape = 'round',
        title,
        value,
        size = 'small',
        uncheckedIcon,
        description,
        className,
        error,
        focusColor,
        duration = 200,
        tooltipAlign = 'auto',
        textPlacement = 'end',
        'aria-label': ariaLabel,
        readOnly,
        ...other
    } = props;

    const rippleTimerRef = useRef<number | null>(null);

    const fieldset = useContext(FieldsetContext);
    const resolvedDisabled = disabled ?? fieldset?.disabled;

    const { focusVisible, isFocused, focusHandlers } = useFocusVisible(onFocus, onBlur);

    const inputRef = useRef<HTMLInputElement>(null);
    const controlRef = useRef<HTMLDivElement>(null);
    const stateRef = useRef<HTMLDivElement>(null);
    const internalIdRef = useRef(uniqueID('check'));
    const elemId = id ?? internalIdRef.current;

    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
    const isChecked = isControlled ? !!checked : internalChecked;

    const finalAriaLabel = ariaLabel ?? (!label ? title : undefined);
    const finalColor = error ? 'error' : color;
    const inlineTooltip = title ? <div id={`${elemId}-tip`}>{title}</div> : null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (readOnly) {
            e.preventDefault();
            return;
        }
        const input = e.currentTarget;
        if (!isControlled) {
            setInternalChecked(input.checked);
        }
        onChange?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        if (readOnly) {
            e.preventDefault();
            return;
        }
        if (touchEffects.includes('ripple')) {
            if (rippleTimerRef.current) {
                clearTimeout(rippleTimerRef.current);
            }

            rippleTimerRef.current = window.setTimeout(() => {
                if (stateRef.current && controlRef.current) {
                    createRipple(stateRef.current, e, controlRef.current);
                    rippleTimerRef.current = null;
                }
            }, duration);
        }
        onClick?.(e);
    };

    // render

    const wrapperClasses = [
        'uui-switch',
        getDensityClass(density),
        className,
        error && 'uui-error',
        resolvedDisabled && 'uui-disabled',
        ...(!children ? [getSizeClass(size)] : []),
    ]
        .filter(Boolean)
        .join(' ');

    // Control
    const controlClasses = [
        'uui-switch-control',
        isChecked && 'uui-checked',
        uncheckedIcon && 'uui-symmetric-thumb',
        ...(hoverEffects.includes('overlay') && !readOnly ? ['uui-hover-overlay'] : []),
        ...(focusEffects.includes('overlay') && focusVisible && isFocused ? ['uui-focus-overlay'] : []),
        ...(selectedEffects.includes('overlay') ? ['uui-selected-overlay'] : []),
        ...(pressedEffects.includes('overlay') && !readOnly ? ['uui-pressed-overlay'] : []),
        ...(pressedEffects.includes('scale') && !readOnly ? ['uui-pressed-scale'] : []),
        getShapeClass(shape),
        focusEffects.includes('ring') && focusVisible && isFocused && 'uui-focus-visible uui-focus-ring',
    ]
        .filter(Boolean)
        .join(' ');

    const controlStyle = ControlStyle();
    if (focusColor && focusVisible && isFocused) {
        controlStyle.set('--uui-focus-color', getSurfaceColorVar(focusColor).color);
    }
    controlStyle.set('--uui-switch-duration', `${duration}ms`);

    // Input
    const inputClasses = ['uui-input'].filter(Boolean).join(' ');

    // State
    const stateClasses = ['uui-state', getShapeClass('round')].filter(Boolean).join(' ');
    const stateStyle = ControlStyle();

    // Track
    const finalBorder = isChecked ? border : (uncheckedBorder ?? border ?? 2);
    const trackClasses = [
        'uui-switch-track',
        getBorderClass(finalBorder),
        getShapeClass(shape),
        getElevationClass(elevation),
    ]
        .filter(Boolean)
        .join(' ');

    const trackStyle = ControlStyle();
    // Thumb
    const thumbClasses = ['uui-switch-thumb', getShapeClass(shape)].filter(Boolean).join(' ');

    // Icon
    const iconClasses = ['uui-icon'].filter(Boolean).join(' ');
    const iconStyle = ControlStyle();

    // Glyph
    const glyphClasses = ['uui-switch-glyph'].filter(Boolean).join(' ');
    const glyphStyle = ControlStyle();

    // Color
    const contentStyle = ControlStyle();
    trackStyle.border(error ? 'error' : (borderColor ?? 'outline'));
    contentStyle.border(error ? 'error' : (borderColor ?? 'outline'));
    if (isChecked) {
        stateStyle.bg(finalColor);
        trackStyle.bg(error ? 'errorContainer' : color);

        glyphStyle.bg.on(color);

        iconStyle.text.onContainer(color);
    } else {
        if (uncheckedBorderColor) {
            trackStyle.border(error ? 'error' : uncheckedBorderColor);
            contentStyle.border(error ? 'error' : uncheckedBorderColor);
        }
        stateStyle.bg(error ? 'error' : (uncheckedColor ?? 'onSurface'));
        trackStyle.bg(error ? 'errorContainer' : (uncheckedColor ?? 'surfaceContainerHighest'));

        if (uncheckedColor) {
            glyphStyle.bg.on(uncheckedColor);
            iconStyle.text.onContainer(uncheckedColor);
        } else {
            glyphStyle.bg(uncheckedIcon ? 'onSurfaceVariant' : 'outline');
            iconStyle.text('surfaceContainerHighest');
        }
    }

    let content;
    if (children) {
        const contentClasses = [
            'uui-switch-content uui-overflow-hidden',
            getShapeClass(shape),
            getBorderClass(border),
            getElevationClass(elevation),
        ]
            .filter(Boolean)
            .join(' ');
        content = (
            <div className={contentClasses} style={contentStyle.get()}>
                {children}
                <div className={stateClasses} ref={stateRef} style={stateStyle.get()} />
            </div>
        );
    } else {
        const displayedIcon = isChecked ? icon : uncheckedIcon;
        content = (
            <>
                <div className={trackClasses} style={trackStyle.get()} />
                <div className={thumbClasses}>
                    <div className={glyphClasses} style={glyphStyle.get()}>
                        <div className={iconClasses} style={iconStyle.get()}>
                            {displayedIcon}
                        </div>
                    </div>
                    <div className={stateClasses} ref={stateRef} style={stateStyle.get()} />
                </div>
            </>
        );
    }

    const labelText = label && <ControlLabel font={font} htmlFor={elemId} label={label} required={required} />;
    const descriptionText = <Description description={description} error={error} />;

    const control = (
        <div className="uui-switch-control-wrapper">
            <div className={controlClasses} ref={controlRef} style={controlStyle.get()}>
                <input
                    {...focusHandlers}
                    aria-label={finalAriaLabel}
                    aria-readonly={readOnly === true ? true : undefined}
                    checked={!!isChecked}
                    className={inputClasses}
                    disabled={resolvedDisabled}
                    id={elemId}
                    name={name}
                    onChange={handleChange}
                    onClick={handleClick}
                    readOnly={readOnly}
                    ref={mergeRefs(inputRef, ref)}
                    type="checkbox"
                    value={value}
                    {...other}
                />
                {content}
                {inlineTooltip && (
                    <InlineTooltipManager align={tooltipAlign} tooltip={inlineTooltip} triggerRef={inputRef} />
                )}
            </div>
        </div>
    );

    return (
        <ControlGrid
            className={wrapperClasses}
            control={control}
            description={descriptionText}
            label={labelText}
            textPlacement={textPlacement}
        />
    );
});

Switch.displayName = 'Switch';
