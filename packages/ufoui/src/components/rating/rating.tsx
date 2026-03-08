import React, { forwardRef, KeyboardEvent, MouseEvent, ReactNode, useMemo, useRef, useState } from 'react';

import {
    ControlStyle,
    ElementDensity,
    ElementFocusEffect,
    ElementFont,
    ElementSize,
    ElementTextPlacement,
    getSizeClass,
    SurfaceColor,
    uniqueID,
} from '../../utils';
import { Flex } from '../layout';
import { StarFilledIcon, StarIcon } from '../../assets';
import { useFocusVisible } from '../../hooks';

export interface RatingProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'defaultValue' | 'size'> {
    value?: number;
    defaultValue?: number;
    max?: number;
    step?: number;
    size?: ElementSize;
    gap?: number;

    disabled?: boolean;

    icon?: ReactNode;
    emptyIcon?: ReactNode;
    color?: SurfaceColor;

    onChange?: (value: number) => void;
    /** DOM id. Auto-generated when not provided. */
    id?: string;
    /** Error message text. Overrides description when present. */
    error?: string;

    /** Enables filled visual style. */
    filled?: boolean;
    /** Additional root class name. */
    className?: string;
    /** Font applied to the label text. */
    font?: ElementFont;
    /** Text label displayed next to the control. */
    label?: string;
    /** Marks the control as read-only without disabling focus. */
    readOnly?: boolean;

    /** Marks the control as required. Visual indicator only. */
    required?: boolean;
    /** Placement of text relative to the control. */
    textPlacement?: ElementTextPlacement;
    /** Visual density of the control. */
    density?: ElementDensity;
    /** Visual effects applied on focus. */
    focusEffects?: ElementFocusEffect[];

    /** Supporting text displayed below the label. */
    description?: string;
}

export const Rating = forwardRef<HTMLInputElement, RatingProps>(
    (
        {
            size = 'small',
            value,
            defaultValue = 0,
            max = 5,
            step = 0.5,
            readOnly = false,
            disabled = false,
            onFocus,
            onBlur,
            icon,
            emptyIcon,
            color,
            gap = 4,
            name,
            id,
            onChange,
            focusEffects = ['ring'],
            className,
            'aria-label': ariaLabel,
            filled,
            ...rest
        },
        ref
    ) => {
        const trackRef = useRef<HTMLDivElement | null>(null);
        const { focusVisible, isFocused, focusHandlers } = useFocusVisible(onFocus, onBlur);

        const isControlled = value !== undefined;
        const [internal, setInternal] = useState(defaultValue);
        const [hover, setHover] = useState<number | null>(null);

        const internalIdRef = useRef(uniqueID('rating'));
        const elemId = id || name || internalIdRef.current;

        const current = isControlled ? (value ?? 0) : internal;
        const displayValue = hover ?? current;

        const clamped = useMemo(() => {
            return Math.max(0, Math.min(displayValue, max));
        }, [displayValue, max]);

        function roundToStep(val: number) {
            return Math.round(val / step) * step;
        }

        function update(val: number) {
            const next = Math.max(0, Math.min(roundToStep(val), max));

            if (!isControlled) {
                setInternal(next);
            }

            onChange?.(next);
        }

        function getValueFromPosition(clientX: number) {
            if (!trackRef.current) {
                return current;
            }

            const rect = trackRef.current.getBoundingClientRect();
            const percent = (clientX - rect.left) / rect.width;

            return percent * max;
        }

        function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
            if (readOnly || disabled) {
                return;
            }

            const raw = getValueFromPosition(e.clientX);
            setHover(roundToStep(raw));
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

            const raw = getValueFromPosition(e.clientX);
            update(raw);
        }

        function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
            if (readOnly || disabled) {
                return;
            }

            const base = hover ?? current;
            let next = base;

            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowUp':
                    e.preventDefault();
                    next = Math.min(base + step, max);
                    break;

                case 'ArrowLeft':
                case 'ArrowDown':
                    e.preventDefault();
                    next = Math.max(base - step, 0);
                    break;

                case 'Home':
                    e.preventDefault();
                    next = 0;
                    break;

                case 'End':
                    e.preventDefault();
                    next = max;
                    break;

                default:
                    return;
            }

            update(next);
        }

        /**
         * Config
         */

        const defaultIcon = icon ?? StarFilledIcon;
        const defaultEmptyIcon = emptyIcon ?? (filled ? defaultIcon : StarIcon);

        const ratingClasses = [
            'uui-rating',
            getSizeClass(size),
            disabled && 'uui-disabled',
            ...(focusEffects.includes('ring') ? ['uui-focus-ring'] : []),
        ]
            .filter(Boolean)
            .join(' ');

        const stars = Array.from({ length: max }).map((_, i) => {
            const fill = Math.min(Math.max(clamped - i, 0), 1) * 100;

            const iconStyle = ControlStyle();
            iconStyle.text(color);
            iconStyle.set('width', `${fill}%`);

            return (
                <div
                    className="uui-icon uui-rating-icon"
                    key={i}
                    style={{
                        cursor: readOnly || disabled ? 'default' : 'pointer',
                        lineHeight: 0,
                    }}>
                    <div className="uui-rating-empty-icon">{defaultEmptyIcon}</div>

                    <div className="uui-rating-filled-icon" style={iconStyle.get()}>
                        {defaultIcon}
                    </div>
                </div>
            );
        });

        return (
            <Flex
                {...focusHandlers}
                alignItems="center"
                aria-valuemax={max}
                aria-valuemin={0}
                aria-valuenow={current}
                className={ratingClasses}
                gap={gap}
                id={elemId}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                ref={trackRef}
                role="slider"
                style={{ position: 'relative' }}
                tabIndex={readOnly || disabled ? -1 : 0}>
                <input disabled={disabled} ref={ref} type="hidden" value={current} {...rest} />
                {stars}
            </Flex>
        );
    }
);

Rating.displayName = 'Rating';
