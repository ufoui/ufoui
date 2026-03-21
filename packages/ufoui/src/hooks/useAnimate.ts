import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Options for the useAnimate hook.
 *
 * @category Hooks
 */
export interface UseAnimateOptions {
    /** Duration (ms) of the opening phase. When omitted, animation can be stepped manually. */
    t1?: number;

    /** Duration (ms) of the closing phase. Defaults to a fraction of t1 when not provided. */
    t2?: number;

    /** Enables one-shot animation behavior. */
    oneShot?: boolean;

    /** Initial phase on mount. */
    initial?: 'idle' | 'open' | 'closed';
}

/**
 * Result returned by the useAnimate hook.
 *
 * @category Hooks
 */
export interface UseAnimateResult {
    /** True during the opening phase. */
    opening: boolean;

    /** True during the closing phase. */
    closing: boolean;

    /** True when animation is running and not temporarily suppressed. */
    animating: boolean;

    /** True while animation is in progress (opening or closing). */
    active: boolean;

    /** True only before any animation has started. */
    idle: boolean;

    /** CSS variables controlling animation timing and direction. */
    animationVars: Record<string, string>;

    /** Triggers animation towards open or closed state. */
    animate(next?: 'open' | 'closed'): void;
}

type Phase = 'idle' | 'opening' | 'open' | 'closing' | 'closed';

/**
 * Handles open/close animation with interrupt support.
 *
 * Flow:
 * - animate('open') → sets phase to "opening" and starts a timer
 * - after t1 → phase becomes "open" and timer is cleared
 * - animate('closed') → sets phase to "closing" and starts a timer
 * - after t2 → phase becomes "closed" and timer is cleared
 *
 * Interrupt:
 * - calling animate() during an active transition clears the current timer
 * - a new transition starts immediately
 * - for one render animating = false (reset frame)
 *
 * State usage:
 * - opening / closing → current transition phase
 * - active → true while transition is in progress (used for mount/visibility)
 * - animating → same as active, but disabled during reset frame (used for CSS classes)
 * - idle → true only before the first animation
 *
 * Important:
 * - use `active` to control visibility (mount/unmount)
 * - use `animating` to apply or remove animation classes
 *
 * Timer:
 * - created when transition starts
 * - cleared on completion or interrupt
 *
 * Modes:
 * - t1 defined → automatic timed transitions
 * - t1 undefined → manual stepper (each call advances phase)
 * - oneShot → only opening transition is executed
 *
 * @function
 * @param options Hook configuration options
 *
 * @category Hooks
 */
export function useAnimate(options: UseAnimateOptions = {}): UseAnimateResult {
    const { initial = 'idle' } = options;
    const [phase, setPhase] = useState<Phase>('idle');
    const [resetting, setResetting] = useState(false);
    const { t1 = 0, t2, oneShot = false } = options;
    const closeTime = t2 ?? Math.round(t1 * 0.67);
    const timerRef = useRef<number | null>(null);

    const clearTimer = () => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
            return true;
        }
        return false;
    };

    const animate = useCallback(
        (next?: 'open' | 'closed') => {
            function delay(nextPhase: Phase, t: number) {
                timerRef.current = window.setTimeout(() => {
                    setPhase(nextPhase);
                    clearTimer();
                }, t);
            }

            const wasAnimating = clearTimer();
            if (wasAnimating) {
                setResetting(true);
            }

            if (oneShot) {
                if (t1) {
                    delay('open', t1);
                    setPhase('opening');
                } else {
                    setPhase(v => (v === 'opening' ? 'open' : 'opening'));
                }
                return;
            }

            if (t1) {
                setPhase(prev => {
                    const shouldClose =
                        next === 'closed' ? true : next === 'open' ? false : prev === 'open' || prev === 'opening';

                    const current = shouldClose ? 'closing' : 'opening';
                    const target = shouldClose ? 'closed' : 'open';

                    delay(target, target === 'open' ? t1 : closeTime);
                    return current;
                });
                return;
            }

            // manual stepper
            setPhase(v => {
                switch (v) {
                    case 'idle':
                    case 'closed':
                        return 'opening';
                    case 'opening':
                        return 'open';
                    case 'open':
                        return 'closing';
                    case 'closing':
                        return 'closed';
                    default:
                        return v;
                }
            });
        },
        [oneShot, t1, closeTime]
    );

    useEffect(() => {
        if (resetting) {
            setResetting(false);
        }
    }, [resetting]);

    useEffect(() => {
        if (initial !== 'idle') {
            animate(initial === 'open' ? 'open' : 'closed');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const closing = phase === 'closing';
    const opening = phase === 'opening';
    const duration = opening ? t1 : closeTime;
    return {
        opening,
        closing,
        animating: (opening || closing) && !resetting,
        idle: phase === 'idle',
        active: closing || opening,
        animationVars: {
            '--uui-duration': `${duration}ms`,
            '--uui-reverse': closing ? 'reverse' : 'normal',
        },
        animate,
    };
}
