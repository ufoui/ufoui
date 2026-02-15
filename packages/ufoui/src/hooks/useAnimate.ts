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
  /** True while in the opening phase. */
  opening: boolean;

  /** True while in the closing phase. */
  closing: boolean;

  /** True while an animation is actively running. */
  animating: boolean;

  /** True when no animation is active. */
  idle: boolean;

  /** CSS variables controlling animation timing and direction. */
  animationVars: Record<string, string>;

  /** Triggers the next animation step or forces open or closed direction. */
  animate(next?: 'open' | 'closed'): void;
}

type Phase = 'idle' | 'opening' | 'open' | 'closing' | 'closed';

/**
 * Animation state hook supporting automatic, one-shot, and manual step modes.
 *
 * Mode behavior:
 * - Automatic mode: when t1 is provided, animate runs a timed open or close sequence.
 * - One-shot mode: when enabled, only the opening transition is performed.
 * - Manual mode: when t1 is not provided, each animate call advances the phase by one step.
 *
 * The hook handles animation interruption by clearing active timers and
 * temporarily suppressing visual animation to avoid glitches.
 *
 * animationVars return CSS custom properties describing the active phase:
 * - --uui-duration defines the duration of the current phase in milliseconds.
 * - --uui-reverse indicates whether the animation direction should be reversed.
 *
 * @function
 * @param options Hook configuration options.
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
          setPhase((v) => (v === 'opening' ? 'open' : 'opening'));
        }
        return;
      }

      if (t1) {
        // const shouldClose =
        //   // eslint-disable-next-line no-nested-ternary
        //   next === 'closed'
        //     ? true
        //     : // eslint-disable-next-line sonarjs/no-nested-conditional
        //       next === 'open'
        //       ? false
        //       : phase === 'open' || phase === 'opening';
        //
        // const currentPhase: Phase = shouldClose ? 'closing' : 'opening';
        // const nextPhase: Phase = shouldClose ? 'closed' : 'open';
        //
        // setPhase(currentPhase);
        setPhase((prev) => {
          const shouldClose =
            // eslint-disable-next-line no-nested-ternary
            next === 'closed'
              ? true
              : // eslint-disable-next-line sonarjs/no-nested-conditional
                next === 'open'
                ? false
                : prev === 'open' || prev === 'opening';

          const current = shouldClose ? 'closing' : 'opening';
          const target = shouldClose ? 'closed' : 'open';

          delay(target, target === 'open' ? t1 : closeTime);
          return current;
        });
        // delay(nextPhase, nextPhase === 'open' ? t1 : closeTime);
        return;
      }

      // manual stepper
      setPhase((v) => {
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
    [oneShot, t1, closeTime],
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
  const idle = phase === 'idle';
  const animating = (opening || closing) && !resetting;
  const duration = opening ? t1 : closeTime;
  return {
    opening,
    closing,
    animating,
    idle,
    animationVars: {
      '--uui-duration': `${duration}ms`,
      '--uui-reverse': closing ? 'reverse' : 'normal',
    },
    animate,
  };
}
