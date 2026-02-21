import React, { forwardRef, useMemo } from 'react';

import {
  ControlStyle,
  ElementSize,
  getSizeClass,
  SemanticColor,
} from '../../utils';
import { BoxBase, BoxBaseProps } from '../base';

/**
 * Props for {@link Progress}.
 *
 * @category Progress
 */
export interface ProgressProps extends Omit<BoxBaseProps, 'children'> {
  variant?: 'linear' | 'circular';
  value?: number;
  min?: number;
  max?: number;
  color?: SemanticColor;
  size?: ElementSize;
  thickness?: number;
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
      size = 'medium',
      thickness,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const isDeterminate = typeof value === 'number';

    const clampedValue = useMemo(() => {
      if (!isDeterminate) {
        return 0;
      }
      return Math.min(Math.max(value, min), max);
    }, [value, min, max, isDeterminate]);

    const percentage = useMemo(() => {
      if (!isDeterminate) {
        return 0;
      }
      return ((clampedValue - min) / (max - min)) * 100;
    }, [clampedValue, min, max, isDeterminate]);

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

    const wrapperClasses = [
      'uui-progress',
      variant === 'circular' ? 'uui-progress-circular' : 'uui-progress-linear',
      !isDeterminate ? 'uui-progress-indeterminate' : '',
      getSizeClass(size),
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const mergedStyle = {
      ...(style ?? {}),
      ...(thickness ? { '--uui-progress-thickness': `${thickness}px` } : {}),
    } as React.CSSProperties;

    // ─────────────────────────────
    // CIRCULAR
    // ─────────────────────────────

    if (variant === 'circular') {
      const trackStyle = ControlStyle();
      const indicatorStyle = ControlStyle();

      trackStyle.stroke.container(color);
      indicatorStyle.stroke(color);

      return (
        <BoxBase
          className={wrapperClasses}
          ref={ref}
          style={mergedStyle}
          {...ariaProps}
          {...rest}
        >
          <svg className="uui-progress-svg" viewBox="0 0 100 100">
            <circle
              className="uui-progress-track"
              cx="50"
              cy="50"
              fill="none"
              r="45"
              style={trackStyle.get()}
            />
            <circle
              className="uui-progress-indicator"
              cx="50"
              cy="50"
              fill="none"
              pathLength="100"
              r="45"
              strokeDasharray="100"
              strokeDashoffset={isDeterminate ? 100 - percentage : undefined}
              style={indicatorStyle.get()}
            />
          </svg>
        </BoxBase>
      );
    }

    // ─────────────────────────────
    // LINEAR
    // ─────────────────────────────

    const trackStyle = ControlStyle();
    const indicatorStyle = ControlStyle();

    trackStyle.bg.container(color);
    indicatorStyle.bg(color);

    return (
      <BoxBase
        className={wrapperClasses}
        ref={ref}
        style={mergedStyle}
        {...ariaProps}
        {...rest}
      >
        <div className="uui-progress-track" style={trackStyle.get()}>
          <div
            className="uui-progress-indicator"
            style={{
              ...indicatorStyle.get(),
              ...(isDeterminate ? { width: `${percentage}%` } : {}),
            }}
          />
        </div>
      </BoxBase>
    );
  },
);

Progress.displayName = 'Progress';
