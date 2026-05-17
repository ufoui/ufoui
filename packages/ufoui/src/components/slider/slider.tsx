/* eslint-disable sonarjs/cognitive-complexity */
import React, { forwardRef, useCallback, useContext, useMemo, useRef, useState } from 'react';

import {
    cn,
    ElementDensity,
    ElementFocusEffect,
    ElementFont,
    ElementOrientation,
    ElementSize,
    ElementTextPlacement,
    getDensityClass,
    getSizeClass,
    mergeRefs,
    SemanticColor,
    SurfaceColor,
    useUniqueId,
} from '../../utils';
import { FieldsetContext } from '../../context';
import { useFocusVisible, useSliderKeys } from '../../hooks';
import { ControlGrid, ControlLabel, Description } from '../../internal';
import { SliderHandle } from './sliderHandle';

// ─── helpers ────────────────────────────────────────────────────────────────

const isRange = (v: unknown): v is [number, number] => Array.isArray(v) && v.length === 2;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const snap = (v: number, min: number, step: number) => (step > 0 ? min + Math.round((v - min) / step) * step : v);
const toPct = (v: number, min: number, max: number) => ((v - min) / (max - min || 1)) * 100;

// ─── types ───────────────────────────────────────────────────────────────────

/**
 * Props for the {@link Slider} component.
 * @category Slider
 */
export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    /** Semantic color of the active track and handle. */
    color?: SemanticColor;
    /** Default value for uncontrolled mode. Use `[start, end]` with `type="range"`. */
    defaultValue?: number | [number, number];
    /** Visual density of the layout. */
    density?: ElementDensity;
    /** Supporting text displayed below the slider. */
    description?: string;
    /** Disables interaction. */
    disabled?: boolean;
    /** Error message. Overrides `description` when set. */
    error?: string;
    /** Focus ring effects. */
    focusEffects?: ElementFocusEffect[];
    /** Font token for the label. */
    font?: ElementFont;
    /** Format function for the value indicator. */
    formatValue?: (value: number) => string;
    /** DOM id of the slider. Auto-generated when omitted. */
    id?: string;
    /** Text label. */
    label?: string;
    /** Show stop indicators at each step position (MD3 discrete mode). */
    stops?: boolean;
    /** Maximum value. */
    max?: number;
    /** Minimum value. */
    min?: number;
    /** Name for the hidden form input. */
    name?: string;
    /** Change handler. Returns `number` for single or `[number, number]` for range. */
    onChange?: (value: number | [number, number]) => void;
    /** Called after a drag gesture ends. */
    onChangeCommitted?: (value: number | [number, number]) => void;
    /** Track orientation. */
    orientation?: ElementOrientation;
    /** Prevents value changes; sets `aria-readonly`. */
    readOnly?: boolean;
    /** Required field indicator. */
    required?: boolean;
    /** Value indicator display mode. `true`/`"hover"` → on hover+focus; `"always"` → always visible. */
    showValue?: boolean | 'always' | 'hover';
    /** Track thickness. MD3: XS=16dp, S=24dp, M=40dp (default), L=56dp, XL=96dp. */
    size?: ElementSize;
    /** Step increment for keyboard and stop indicators. */
    step?: number;
    /** Label placement relative to the slider. */
    textPlacement?: ElementTextPlacement;
    /**
     * Slider behaviour type.
     * - `"standard"` — single handle, active track from the left edge (default).
     * - `"centered"` — single handle, active track grows from the midpoint.
     * - `"range"` — two handles; pass `[start, end]` as `value` / `defaultValue`.
     */
    type?: 'standard' | 'centered' | 'range';
    /** Color of the inactive track. */
    trackColor?: SurfaceColor;
    /** Controlled value. Use `[start, end]` with `type="range"`. */
    value?: number | [number, number];
}

/**
 * MD3-compliant slider for selecting a value or range along a track.
 *
 * Track thickness is controlled by `size` (MD3: XS=16dp, S=24dp, M=40dp, L=56dp, XL=96dp).
 * Use `orientation="vertical"` and set a height via `style` for vertical sliders.
 *
 * @function
 * @category Slider
 *
 * @example
 * <Slider defaultValue={40} label="Volume" />
 *
 * @example
 * <Slider type="range" defaultValue={[20, 80]} label="Price range" showValue />
 *
 * @example
 * <Slider type="centered" defaultValue={0} min={-100} max={100} label="Balance" />
 *
 * @example
 * <Slider orientation="vertical" defaultValue={60} style={{ height: '200px' }} />
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
    const {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        className,
        color = 'primary',
        defaultValue,
        density,
        description,
        disabled,
        error,
        focusEffects = ['ring'],
        font,
        formatValue,
        id,
        label,
        stops = false,
        max = 100,
        min = 0,
        name,
        onBlur,
        onChange,
        onChangeCommitted,
        onFocus,
        orientation = 'horizontal',
        readOnly,
        required,
        showValue,
        size = 'medium',
        step = 1,
        style,
        textPlacement = 'top',
        trackColor = 'secondaryContainer',
        type = 'standard',
        value: valueProp,
    } = props;

    const rangeMode = type === 'range';
    const centeredMode = type === 'centered';
    const fieldset = useContext(FieldsetContext);
    const off = disabled ?? fieldset?.disabled;

    const initSingle = useRef<number>(typeof defaultValue === 'number' ? defaultValue : min);
    const initRange = useRef<[number, number]>(isRange(defaultValue) ? defaultValue : [min, max]);
    const [single, setSingle] = useState<number>(initSingle.current);
    const [range, setRange] = useState<[number, number]>(initRange.current);

    const isControlled = valueProp !== undefined;
    const val0 = rangeMode
        ? clamp(isRange(valueProp) ? valueProp[0] : range[0], min, max)
        : clamp(typeof valueProp === 'number' ? valueProp : single, min, max);
    const val1 = rangeMode ? clamp(isRange(valueProp) ? valueProp[1] : range[1], min, max) : max;

    const trackRef = useRef<HTMLDivElement>(null);
    const h0Ref = useRef<HTMLSpanElement>(null);
    const h1Ref = useRef<HTMLSpanElement>(null);
    const generatedId = useUniqueId('slider');
    const elemId = id ?? generatedId;

    const dispatch = useCallback(
        (next: number | [number, number]) => {
            if (!isControlled) {
                if (typeof next === 'number') {
                    setSingle(next);
                } else {
                    setRange(next);
                }
            }
            onChange?.(next);
        },
        [isControlled, onChange]
    );

    const fromPointer = useCallback(
        (e: React.PointerEvent<HTMLElement>): number => {
            const rect = trackRef.current?.getBoundingClientRect();
            if (!rect) {
                return min as number;
            }
            const numMin = Number(min);
            const numMax = Number(max);
            const ratio =
                orientation === 'vertical'
                    ? 1 - (e.clientY - rect.top) / rect.height
                    : (e.clientX - rect.left) / rect.width;
            return clamp(snap(numMin + ratio * (numMax - numMin), numMin, Number(step)), numMin, numMax);
        },
        [min, max, step, orientation]
    );

    const handlePointer = useCallback(
        (e: React.PointerEvent<HTMLSpanElement>, pointerType: 'down' | 'move' | 'up', idx: 0 | 1) => {
            if (off) {
                return;
            }
            if (pointerType !== 'move' && readOnly) {
                return;
            }
            if (pointerType === 'move' && !(e.buttons & 1)) {
                return;
            }
            if (pointerType === 'down') {
                e.currentTarget.setPointerCapture(e.pointerId);
                (idx === 0 ? h0Ref : h1Ref).current?.focus();
            }
            const v = fromPointer(e);
            const next: number | [number, number] = rangeMode
                ? idx === 0
                    ? [clamp(v, min, val1), val1]
                    : [val0, clamp(v, val0, max)]
                : v;
            if (pointerType === 'up') {
                onChangeCommitted?.(next);
            } else {
                dispatch(next);
            }
        },
        [off, readOnly, fromPointer, rangeMode, val0, val1, min, max, dispatch, onChangeCommitted]
    );

    const handleTrack = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (off || readOnly || (e.target as HTMLElement).closest('.uui-slider-handle')) {
                return;
            }
            const v = fromPointer(e);
            if (!rangeMode) {
                dispatch(v);
                h0Ref.current?.focus();
                return;
            }
            const useH0 = Math.abs(v - val0) <= Math.abs(v - val1);
            dispatch(useH0 ? [clamp(v, min, val1), val1] : [val0, clamp(v, val0, max)]);
            (useH0 ? h0Ref : h1Ref).current?.focus();
        },
        [off, readOnly, fromPointer, rangeMode, val0, val1, min, max, dispatch]
    );

    const { focusVisible, isFocused: f0, focusHandlers: fh0 } = useFocusVisible(onFocus, onBlur);
    const { isFocused: f1, focusHandlers: fh1 } = useFocusVisible();

    const keys0 = useSliderKeys({
        value: val0,
        min,
        max: rangeMode ? val1 : max,
        step,
        disabled: off,
        readOnly,
        onChange: v => {
            dispatch(rangeMode ? [clamp(v, min, val1), val1] : v);
        },
    });
    const keys1 = useSliderKeys({
        value: val1,
        min: val0,
        max,
        step,
        disabled: off,
        readOnly,
        onChange: v => {
            dispatch([val0, clamp(v, val0, max)]);
        },
    });

    const fmt = formatValue ?? String;
    const showMode: 'always' | 'hover' | 'none' = showValue === 'always' ? 'always' : showValue ? 'hover' : 'none';

    // ─── color CSS variables (cascade to track, glyph, state, stops) ──────────
    const toKebab = (s: string) => s.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
    const colorVars: React.CSSProperties = {};
    if (color) {
        const c = toKebab(color);
        Object.assign(colorVars, {
            '--uui-slider-active-color': `var(--uui-color-${c})`,
            '--uui-slider-active-on-color': `var(--uui-color-on-${c})`,
        });
    }
    if (trackColor) {
        const c = toKebab(trackColor);
        Object.assign(colorVars, {
            '--uui-slider-inactive-color': `var(--uui-color-${c})`,
            '--uui-slider-inactive-on-color': `var(--uui-color-on-${c})`,
        });
    }
    // ──────────────────────────────────────────────────────────────────────────

    const p0 = toPct(val0, min, max);
    const p1 = toPct(val1, min, max);

    const stopPoints = useMemo(() => {
        if (!stops || step <= 0) {
            return [];
        }
        const out: number[] = [];
        const s = Number(step);
        for (let v: number = min; v <= max; v = v + s) {
            out.push(toPct(v, min, max));
        }
        return out;
    }, [stops, step, min, max]);

    const ctr = 50; // midpoint of min-max range is always 50 %
    const activeLeft = rangeMode ? p0 : centeredMode ? Math.min(p0, ctr) : 0;
    const activeSize = rangeMode ? p1 - p0 : centeredMode ? Math.abs(p0 - ctr) : p0;

    const posKey = orientation === 'vertical' ? 'bottom' : 'left';
    const activePosition: React.CSSProperties =
        orientation === 'vertical'
            ? { bottom: `${activeLeft}%`, height: `${activeSize}%`, top: 'auto', width: '100%' }
            : { left: `${activeLeft}%`, width: `${activeSize}%` };

    const labelledBy = !ariaLabel && label ? `${elemId}-label` : undefined;
    const hCommon = { disabled: off, focusEffects, focusVisible, orientation, readOnly, showValue: showMode } as const;
    const controlStyle = {
        '--uui-slider-h0': `${p0}%`,
        ...(rangeMode ? { '--uui-slider-h1': `${p1}%` } : {}),
        ...colorVars,
        ...style,
    } as React.CSSProperties;

    const control = (
        <div className="uui-slider-control-wrapper">
            {!rangeMode && (
                <input
                    aria-hidden="true"
                    disabled={off}
                    id={elemId}
                    max={max}
                    min={min}
                    name={name}
                    onChange={() => undefined}
                    readOnly
                    step={step}
                    tabIndex={-1}
                    type="range"
                    value={val0}
                />
            )}
            <div className="uui-slider-control" onPointerDown={handleTrack} ref={trackRef} style={controlStyle}>
                <div aria-hidden="true" className="uui-slider-track">
                    <div className="uui-slider-track-inactive" />
                    <div className="uui-slider-track-active" style={activePosition} />
                    {stopPoints.length > 0 && (
                        <div className="uui-slider-stops">
                            {stopPoints.map(p => {
                                const active = rangeMode
                                    ? p >= p0 && p <= p1
                                    : centeredMode
                                      ? p >= Math.min(p0, ctr) && p <= Math.max(p0, ctr)
                                      : p <= p0;
                                return (
                                    <span
                                        className={cn(
                                            'uui-slider-stop',
                                            active ? 'uui-slider-stop-active' : 'uui-slider-stop-inactive'
                                        )}
                                        key={p}
                                        style={{ [posKey]: `${p}%` }}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
                <SliderHandle
                    {...hCommon}
                    ariaLabel={rangeMode && ariaLabel ? `${ariaLabel} start` : ariaLabel}
                    ariaLabelledby={ariaLabel ? ariaLabelledby : (labelledBy ?? ariaLabelledby)}
                    displayValue={fmt(val0)}
                    handleRef={mergeRefs(h0Ref, !rangeMode ? ref : null)}
                    isFocused={f0}
                    max={rangeMode ? val1 : max}
                    min={min}
                    onBlur={fh0.onBlur as React.FocusEventHandler<HTMLElement>}
                    onFocus={fh0.onFocus as React.FocusEventHandler<HTMLElement>}
                    onKeyDown={keys0.onKeyDown}
                    onPointer={(e, t) => {
                        handlePointer(e, t, 0);
                    }}
                    pct={p0}
                    value={val0}
                />
                {rangeMode && (
                    <SliderHandle
                        {...hCommon}
                        ariaLabel={ariaLabel ? `${ariaLabel} end` : undefined}
                        ariaLabelledby={ariaLabel ? ariaLabelledby : (labelledBy ?? ariaLabelledby)}
                        displayValue={fmt(val1)}
                        handleRef={mergeRefs(h1Ref, ref)}
                        isFocused={f1}
                        max={max}
                        min={val0}
                        onBlur={fh1.onBlur as React.FocusEventHandler<HTMLElement>}
                        onFocus={fh1.onFocus as React.FocusEventHandler<HTMLElement>}
                        onKeyDown={keys1.onKeyDown}
                        onPointer={(e, t) => {
                            handlePointer(e, t, 1);
                        }}
                        pct={p1}
                        value={val1}
                    />
                )}
            </div>
        </div>
    );

    return (
        <ControlGrid
            className={cn(
                'uui-slider',
                orientation === 'vertical' && 'uui-slider-vertical',
                getSizeClass(size),
                getDensityClass(density),
                className,
                error && 'uui-error',
                off && 'uui-disabled',
                rangeMode && 'uui-slider-range',
                centeredMode && 'uui-slider-centered'
            )}
            control={control}
            description={<Description description={description} error={error} />}
            label={label ? <ControlLabel font={font} htmlFor={elemId} label={label} required={required} /> : undefined}
            textPlacement={textPlacement}
        />
    );
});

Slider.displayName = 'Slider';
