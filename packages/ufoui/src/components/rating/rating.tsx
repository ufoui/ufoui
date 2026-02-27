import {
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useMemo,
  useState,
} from 'react';

import { BoxBase, BoxBaseProps } from '../base';
import { SurfaceColor } from '../../utils';

export interface RatingProps extends Omit<BoxBaseProps, 'type' | 'onChange'> {
  value?: number;
  defaultValue?: number;
  max?: number;
  step?: number;

  readOnly?: boolean;
  disabled?: boolean;

  icon?: ReactNode;
  emptyIcon?: ReactNode;

  color?: SurfaceColor;

  onChange?: (value: number) => void;
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value,
      defaultValue = 0,
      max = 5,
      step = 0.5,
      readOnly = false,
      disabled = false,
      icon,
      emptyIcon,
      color = 'primary',
      gap = 4,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const controlled = value !== undefined;
    const [internal, setInternal] = useState(defaultValue);
    const [hover, setHover] = useState<number | null>(null);

    const current = controlled ? (value ?? 0) : internal;
    const displayValue = hover ?? current;

    const clamped = useMemo(
      () => Math.max(0, Math.min(displayValue, max)),
      [displayValue, max],
    );

    function roundToStep(val: number) {
      return Math.round(val / step) * step;
    }

    function update(val: number) {
      const next = roundToStep(val);
      if (!controlled) {
        setInternal(next);
      }
      onChange?.(next);
    }

    function handleClick(e: MouseEvent<HTMLDivElement>, index: number) {
      if (readOnly || disabled) {
        return;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;

      update(index + percent);
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
          next = base + step;
          break;

        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          next = base - step;
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

    const activeColor = `var(--uui-${color})`;
    const emptyColor = 'var(--uui-surfaceVariant)';

    const defaultIcon = icon ?? '★';
    const defaultEmptyIcon = emptyIcon ?? defaultIcon;

    return (
      <BoxBase
        alignItems="center"
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={current}
        gap={gap}
        onKeyDown={handleKeyDown}
        ref={ref}
        role="slider"
        tabIndex={readOnly || disabled ? -1 : 0}
        type="flex"
        {...rest}
      >
        {Array.from({ length: max }).map((_, i) => {
          const fill = Math.min(Math.max(clamped - i, 0), 1) * 100;

          return (
            <div
              key={i}
              onClick={(e) => {
                handleClick(e, i);
              }}
              onMouseEnter={() => !readOnly && !disabled && setHover(i + 1)}
              onMouseLeave={() => !readOnly && !disabled && setHover(null)}
              style={{
                position: 'relative',
                cursor: readOnly || disabled ? 'default' : 'pointer',
                lineHeight: 0,
              }}
            >
              {/* empty */}
              <div style={{ color: emptyColor }}>{defaultEmptyIcon}</div>

              {/* filled */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${fill}%`,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  color: activeColor,
                }}
              >
                {defaultIcon}
              </div>
            </div>
          );
        })}
      </BoxBase>
    );
  },
);

Rating.displayName = 'Rating';
