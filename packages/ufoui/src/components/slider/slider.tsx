import { forwardRef, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';

export interface SliderProps {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    name?: string;
    disabled?: boolean;
    onChange?: (value: number) => void;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
    ({ value, defaultValue = 0, min = 0, max = 100, step = 1, name, disabled = false, onChange, ...rest }, ref) => {
        const [internal, setInternal] = useState(defaultValue);
        const isControlled = value !== undefined;
        const current = isControlled ? value : internal;

        const trackRef = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false);

        const percentage = ((current - min) / (max - min)) * 100;

        const updateValue = (clientX: number) => {
            if (!trackRef.current || disabled) {
                return;
            }
            const rect = trackRef.current.getBoundingClientRect();
            const pos = (clientX - rect.left) / rect.width;
            const rawValue = pos * (max - min) + min;
            const steppedValue = Math.round(rawValue / step) * step;
            const clampedValue = Math.max(min, Math.min(max, steppedValue));

            if (!isControlled) {
                setInternal(clampedValue);
            }
            onChange?.(clampedValue);
        };

        const handleMouseDown = (e: ReactMouseEvent) => {
            if (disabled) {
                return;
            }
            setIsDragging(true);
            updateValue(e.clientX);
        };

        useEffect(() => {
            const handleMouseMove = (e: MouseEvent) => {
                if (isDragging) {
                    updateValue(e.clientX);
                }
            };
            const handleMouseUp = () => {
                setIsDragging(false);
            };

            if (isDragging) {
                window.addEventListener('mousemove', handleMouseMove);
                window.addEventListener('mouseup', handleMouseUp);
            }
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }, [isDragging]);

        return (
            <div
                className={`uui-slider ${disabled ? 'uui-slider--disabled' : ''}`}
                onMouseDown={handleMouseDown}
                ref={ref}
                {...rest}>
                <input name={name} type="hidden" value={current} />

                <div className="uui-slider-track-container" ref={trackRef}>
                    {/* Inactive Track */}
                    <div className="uui-slider-track-inactive" />

                    {/* Active Track */}
                    <div className="uui-slider-track-active" style={{ width: `${percentage}%` }} />

                    {/* Handle */}
                    <div
                        aria-valuemax={max}
                        aria-valuemin={min}
                        aria-valuenow={current}
                        className="uui-slider-handle"
                        role="slider"
                        style={{ left: `${percentage}%` }}
                        tabIndex={disabled ? -1 : 0}>
                        <div className="uui-slider-state-layer" />
                    </div>
                </div>
            </div>
        );
    }
);

Slider.displayName = 'Slider';
