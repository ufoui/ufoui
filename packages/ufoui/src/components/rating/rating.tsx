import React, { forwardRef, MouseEvent, ReactNode, useRef, useState } from 'react';

import {
    cn,
    ControlStyle,
    ElementAlign,
    ElementDensity,
    ElementFocusEffect,
    ElementFont,
    ElementSize,
    ElementTextPlacement,
    getDensityClass,
    getSizeClass,
    SurfaceColor,
    uniqueID,
} from '../../utils';
import { StarFilledIcon, StarIcon } from '../../assets';
import { ControlGrid, ControlLabel, Description, InlineTooltipManager } from '../../internal';
import { useFocusVisible, useSliderKeys } from '../../hooks';

/**
 * Props for the Rating component.
 *
 * Numeric rating control rendered as a star slider with optional label and description.
 *
 * @category Rating
 */
export interface RatingProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'defaultValue' | 'size'> {
    /** Additional class applied to the root element. */
    className?: string;

    /** Color applied to the filled icons. */
    color?: SurfaceColor;

    /** Initial rating value for uncontrolled usage. */
    defaultValue?: number;

    /** Visual density of the control. */
    density?: ElementDensity;

    /** Supporting text displayed below the control. */
    description?: string;

    /** Disables interaction with the control. */
    disabled?: boolean;

    /** Icon used for the empty rating state. */
    emptyIcon?: ReactNode;

    /** Error message displayed below the control. */
    error?: string;

    /** Enables filled visual style for icons. */
    filled?: boolean;

    /** Visual effects applied when the control receives focus. */
    focusEffects?: ElementFocusEffect[];

    /** Font applied to the label text. */
    font?: ElementFont;

    /** Icon used for the filled rating state. */
    icon?: ReactNode;

    /** DOM id used for accessibility attributes. */
    id?: string;

    /** Label text displayed next to the control. */
    label?: string;

    /** Maximum rating value. */
    max?: number;

    /** Called when the rating value changes. */
    onChange?: (value: number) => void;

    /** Prevents value changes while keeping the control focusable. */
    readOnly?: boolean;

    /** Marks the control as required. */
    required?: boolean;

    /** Visual size of the rating icons. */
    size?: ElementSize;

    /** Step size used for keyboard and pointer interaction. */
    step?: number;

    /** Placement of label and description relative to the control. */
    textPlacement?: ElementTextPlacement;

    /** Tooltip alignment relative to the control. */
    tooltipAlign?: ElementAlign;

    /** Current rating value when used as a controlled component. */
    value?: number;
}

/**
 * Star rating input rendered as an interactive slider.
 *
 * Supports mouse, keyboard and form integration through a hidden input.
 *
 * @function
 * @param props Component properties.
 *
 * @category Rating
 */
export const Rating = forwardRef<HTMLInputElement, RatingProps>(
    (
        {
            size = 'small',
            value,
            defaultValue = 0,
            max = 5,
            step = 0.5,
            readOnly,
            disabled,
            icon,
            font,
            emptyIcon,
            color,
            name,
            id,
            label,
            description,
            error,
            required,
            density,
            onChange,
            onFocus,
            onBlur,
            title,
            textPlacement = 'start',
            focusEffects = ['ring'],
            className,
            tooltipAlign = 'auto',
            'aria-label': ariaLabel,
            filled,
            ...rest
        },
        ref
    ) => {
        const internalId = useRef(uniqueID('rating')).current;
        const elemId = id ?? name ?? internalId;
        const labelId = label ? `${elemId}_label` : undefined;
        const { isFocused, focusHandlers, focusVisible } = useFocusVisible(onFocus, onBlur);

        const trackRef = useRef<HTMLDivElement | null>(null);
        const wrapperRef = useRef<HTMLDivElement | null>(null);

        const isControlled = value !== undefined;
        const [internal, setInternal] = useState(defaultValue);
        const [hover, setHover] = useState<number | null>(null);

        const current = isControlled ? (value ?? 0) : internal;
        const displayValue = hover ?? current;
        const clamped = Math.max(0, Math.min(displayValue, max));

        const inlineTooltip = title ? <div id={`${elemId}-tip`}>{title}</div> : null;

        function computeValue(clientX: number) {
            if (!trackRef.current) {
                return current;
            }

            const container = trackRef.current;
            const rect = container.getBoundingClientRect();
            const children = container.getElementsByClassName('uui-rating-icon');

            const relativeX = clientX - rect.left;

            if (relativeX < 5) {
                return 0;
            }

            const sectionWidth = rect.width / max;
            let foundIndex = Math.floor(relativeX / sectionWidth);
            foundIndex = Math.max(0, Math.min(foundIndex, max - 1));

            const starRect = children[foundIndex].getBoundingClientRect();
            const xInStar = clientX - starRect.left;
            const percent = Math.max(0, Math.min(1, xInStar / starRect.width));

            const stepsPerStar = 1 / step;
            const rawValue = foundIndex + Math.ceil(percent * stepsPerStar) / stepsPerStar;

            return parseFloat(Math.min(rawValue, max).toFixed(10));
        }

        function setValue(next: number) {
            if (!isControlled) {
                setInternal(next);
            }

            onChange?.(next);
        }

        function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
            if (readOnly || disabled) {
                return;
            }
            setHover(computeValue(e.clientX));
        }

        function handleMouseLeave() {
            if (!readOnly && !disabled) {
                setHover(null);
            }
        }

        function handleClick(e: MouseEvent<HTMLDivElement>) {
            if (readOnly || disabled) {
                return;
            }

            const next = computeValue(e.clientX);
            setHover(null);
            setValue(next === current ? 0 : next);
        }

        const sliderKeys = useSliderKeys({
            value: displayValue,
            min: 0,
            max,
            step,
            disabled,
            readOnly,
            onChange: setValue,
        });

        const defaultIcon = icon ?? StarFilledIcon;
        const defaultEmptyIcon = emptyIcon ?? (filled ? defaultIcon : StarIcon);

        const wrapperClasses = cn(
            'uui-rating',
            getSizeClass(size),
            className,
            filled && 'uui-filled',
            readOnly && 'uui-read-only',
            error && 'uui-error',
            disabled && 'uui-disabled'
        );

        const controlClasses = cn(
            'uui-rating-control',
            ...(focusEffects.includes('ring') && isFocused && focusVisible ? ['uui-focus-ring uui-focus-visible'] : []),
            getDensityClass(density)
        );

        const finalColor = error ? 'error' : color;
        const stars = Array.from({ length: Math.ceil(max) }).map((_, i) => {
            const fill = Math.min(Math.max(clamped - i, 0), 1) * 100;

            const style = ControlStyle();
            style.text(finalColor);
            style.set('width', `${fill}%`);

            return (
                <div
                    className="uui-icon uui-rating-icon"
                    key={`${elemId}-star-${i}`}
                    style={{ cursor: readOnly || disabled ? 'default' : 'pointer', lineHeight: 0 }}>
                    <div className="uui-rating-empty-icon">{defaultEmptyIcon}</div>
                    <div className="uui-rating-filled-icon" style={style.get()}>
                        {defaultIcon}
                    </div>
                </div>
            );
        });

        const rating = (
            <div
                {...focusHandlers}
                aria-disabled={disabled || undefined}
                aria-label={!label ? (ariaLabel ?? title) : undefined}
                aria-labelledby={labelId}
                aria-valuemax={max}
                aria-valuemin={0}
                aria-valuenow={displayValue}
                className={controlClasses}
                id={elemId}
                onClick={handleClick}
                onKeyDown={sliderKeys.onKeyDown}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                ref={trackRef}
                role="slider"
                tabIndex={readOnly || disabled ? -1 : 0}>
                <input disabled={disabled} ref={ref} type="hidden" value={current} {...rest} />
                {stars}
                {inlineTooltip && (
                    <InlineTooltipManager align={tooltipAlign} tooltip={inlineTooltip} triggerRef={wrapperRef} />
                )}
            </div>
        );

        const controlLabel = label && (
            <ControlLabel focusRef={trackRef} font={font} id={labelId} label={label} required={required} tag="span" />
        );

        const controlDescription = (description ?? error) && <Description description={description} error={error} />;

        return (
            <ControlGrid
                className={wrapperClasses}
                control={rating}
                description={controlDescription}
                label={controlLabel}
                ref={wrapperRef}
                spanDesc
                textPlacement={textPlacement}
            />
        );
    }
);

Rating.displayName = 'Rating';
