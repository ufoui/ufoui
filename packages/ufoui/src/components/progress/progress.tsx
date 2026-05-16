import React, { HTMLAttributes } from 'react';

import { SpinnerRingSvg } from '../../assets';
import {
    cn,
    ControlStyle,
    ElementSize,
    getSizeClass,
    getWrapperStyle,
    SemanticColor,
    SurfaceColor,
    WrapperProps,
} from '../../utils';

/**
 * Props for {@link Progress}.
 *
 * Supports both linear and circular progress indicators, in determinate
 * (`value` provided) and indeterminate (`value` omitted) modes.
 *
 * @category Progress
 */
export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>, Omit<WrapperProps, 'shape'> {
    /** Semantic color of the active indicator. */
    color?: SemanticColor;
    /** Maximum value of the progress range. */
    max?: number;
    /** Minimum value of the progress range. */
    min?: number;
    /** Size preset of the progress component. */
    size?: ElementSize;
    /** Surface color of the track/background. */
    trackColor?: SurfaceColor;
    /** Current value for determinate mode. Leave undefined for indeterminate mode. */
    value?: number;
    /** Visual style of the indicator. */
    variant?: 'linear' | 'circular';
}

/**
 * Visual progress indicator.
 *
 * Renders either a linear bar or a circular ring. The component is:
 * - determinate when `value` is provided,
 * - indeterminate when `value` is omitted.
 *
 * @function
 * @param props - Component props.
 *
 * @category Progress
 *
 * @example
 * <Progress value={42} />
 *
 * @example
 * <Progress variant="circular" value={75} />
 *
 * @example
 * <Progress variant="linear" />
 */
export const Progress = ({
    variant = 'linear',
    value,
    min = 0,
    max = 100,
    color = 'primary',
    trackColor = 'secondaryContainer',
    size = 'medium',
    className,
    style,
    ...rest
}: ProgressProps) => {
    const { wrapperStyle, otherProps } = getWrapperStyle(rest);
    const mergedStyle = ControlStyle(wrapperStyle);
    mergedStyle.merge(style);
    const isDeterminate = typeof value === 'number';

    const clampedValue = Math.min(Math.max(value ?? min, min), max);
    const range = max - min;
    const percentage = range > 0 ? ((clampedValue - min) / range) * 100 : 0;

    const ariaProps = {
        role: 'progressbar',
        'aria-valuemin': min,
        'aria-valuemax': max,
        ...(isDeterminate && { 'aria-valuenow': clampedValue }),
    };

    const wrapperClasses = cn(
        className,
        'uui-progress',
        variant === 'circular' ? 'uui-progress-circular' : 'uui-progress-linear',
        !isDeterminate ? 'uui-progress-indeterminate' : '',
        getSizeClass(size)
    );

    const trackStyle = ControlStyle();
    const indicatorStyle = ControlStyle();

    if (variant === 'circular') {
        trackStyle.stroke(trackColor);
        indicatorStyle.stroke(color);
        const classes = cn('uui-spinner', !isDeterminate && 'uui-spinner-ring', wrapperClasses);
        return (
            <SpinnerRingSvg
                className={classes}
                indicatorProps={{
                    pathLength: 100,
                    style: {
                        ...indicatorStyle.get(),
                        ...(isDeterminate
                            ? {
                                  animation: 'none',
                                  strokeDasharray: `${percentage} 100`,
                                  strokeDashoffset: 0,
                                  opacity: percentage > 0 ? 1 : 0,
                              }
                            : {}),
                    },
                }}
                style={mergedStyle.get()}
                trackProps={{ style: trackStyle.get() }}
                {...ariaProps}
                {...otherProps}
            />
        );
    }

    trackStyle.bg(trackColor);
    indicatorStyle.bg(color);

    return (
        <div className={wrapperClasses} style={mergedStyle.get()} {...ariaProps} {...otherProps}>
            <div className="uui-progress-track" style={trackStyle.get()}>
                <div
                    className="uui-progress-indicator"
                    style={{
                        ...indicatorStyle.get(),
                        ...(isDeterminate ? { transform: `scaleX(${percentage / 100})` } : {}),
                    }}
                />
            </div>
        </div>
    );
};

Progress.displayName = 'Progress';
