import React, { forwardRef, HTMLAttributes } from 'react';

import { SpinnerRingSvg } from '../../assets';
import {
    cn,
    ControlStyle,
    ElementShape,
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
 * @category Progress
 */
export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>, WrapperProps {
    variant?: 'linear' | 'circular';
    value?: number;
    min?: number;
    max?: number;
    color?: SemanticColor;
    trackColor?: SurfaceColor;
    size?: ElementSize;
    shape?: ElementShape;
}

/**
 * Visual progress indicator.
 *
 * @function
 *
 * @param props - Component props.
 *
 * @category Progress
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
    (
        {
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
        },
        ref
    ) => {
        const { wrapperStyle, otherProps } = getWrapperStyle(rest);
        const isDeterminate = typeof value === 'number';

        const clampedValue = isDeterminate ? Math.min(Math.max(value, min), max) : 0;
        const percentage = isDeterminate ? ((clampedValue - min) / (max - min)) * 100 : 0;

        const ariaProps = isDeterminate
            ? {
                  role: 'progressbar',
                  'aria-valuemin': min,
                  'aria-valuemax': max,
                  'aria-valuenow': clampedValue,
              }
            : {
                  role: 'progressbar',
                  'aria-valuemin': min,
                  'aria-valuemax': max,
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

        // ─────────────────────────────
        // CIRCULAR
        // ─────────────────────────────

        if (variant === 'circular') {
            trackStyle.stroke(trackColor);
            indicatorStyle.stroke(color);
            const classes = cn('uui-spinner', !isDeterminate && 'uui-spinner-ring', wrapperClasses);
            const circularStyle = ControlStyle(wrapperStyle);
            circularStyle.merge(style);
            return (
                <SpinnerRingSvg
                    aria-hidden="true"
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
                    style={circularStyle.get()}
                    trackProps={{ style: trackStyle.get() }}
                    {...otherProps}
                />
            );
        }

        // ─────────────────────────────
        // LINEAR
        // ─────────────────────────────

        const mergedStyle = {
            ...(wrapperStyle ?? {}),
            ...(style ?? {}),
        } as React.CSSProperties;

        trackStyle.bg(trackColor);
        indicatorStyle.bg(color);

        return (
            <div className={wrapperClasses} ref={ref} style={mergedStyle} {...ariaProps} {...otherProps}>
                <div className="uui-progress-track" style={trackStyle.get()}>
                    <div
                        className="uui-progress-indicator"
                        style={{
                            ...indicatorStyle.get(),
                            ...(isDeterminate ? { width: `${percentage}%` } : {}),
                        }}
                    />
                </div>
            </div>
        );
    }
);

Progress.displayName = 'Progress';
