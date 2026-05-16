import React from 'react';

import { cn, ElementFocusEffect } from '../../utils';
import { TextBase } from '../base/textBase';

export interface SliderHandleProps {
    ariaLabel?: string;
    ariaLabelledby?: string;
    disabled?: boolean;
    displayValue: string;
    focusEffects: ElementFocusEffect[];
    focusVisible: boolean;
    handleRef: React.Ref<HTMLSpanElement>;
    isFocused: boolean;
    max: number;
    min: number;
    onBlur: React.FocusEventHandler<HTMLElement>;
    onFocus: React.FocusEventHandler<HTMLElement>;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    onPointer: (e: React.PointerEvent<HTMLSpanElement>, type: 'down' | 'move' | 'up') => void;
    orientation: 'horizontal' | 'vertical';
    pct: number;
    readOnly?: boolean;
    showValue: 'always' | 'hover' | 'none';
    value: number;
}

export const SliderHandle = ({
    ariaLabel,
    ariaLabelledby,
    disabled,
    displayValue,
    focusEffects,
    focusVisible,
    handleRef,
    isFocused,
    max,
    min,
    onBlur,
    onFocus,
    onKeyDown,
    onPointer,
    orientation,
    pct,
    readOnly,
    showValue,
    value,
}: SliderHandleProps) => {
    const ring = focusEffects.includes('ring') && focusVisible && isFocused;
    const pos: React.CSSProperties =
        orientation === 'vertical'
            ? { bottom: `${pct}%`, left: '50%', transform: 'translate(-50%, 50%)' }
            : { left: `${pct}%`, top: '50%', transform: 'translate(-50%, -50%)' };

    return (
        <span
            aria-disabled={disabled ?? undefined}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-readonly={readOnly ?? undefined}
            aria-valuemax={max}
            aria-valuemin={min}
            aria-valuenow={value}
            aria-valuetext={displayValue}
            className={cn(
                'uui-slider-handle',
                showValue === 'always' && 'uui-slider-label-always',
                ring && 'uui-focus-visible uui-focus-ring'
            )}
            onBlur={onBlur as React.FocusEventHandler<HTMLSpanElement>}
            onFocus={onFocus as React.FocusEventHandler<HTMLSpanElement>}
            onKeyDown={onKeyDown}
            onPointerDown={e => {
                onPointer(e, 'down');
            }}
            onPointerMove={e => {
                onPointer(e, 'move');
            }}
            onPointerUp={e => {
                onPointer(e, 'up');
            }}
            ref={handleRef}
            role="slider"
            style={pos}
            tabIndex={disabled ? -1 : 0}>
            <span className="uui-slider-state" />
            <span className="uui-slider-glyph" />
            {showValue !== 'none' && (
                <TextBase className="uui-slider-value-label" color="inverseSurface" font="labelLarge" shape="round" style={{ padding: '12px', minWidth: '44px', textAlign: 'center' }}>
                    {displayValue}
                </TextBase>
            )}
        </span>
    );
};
