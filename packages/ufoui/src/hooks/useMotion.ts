import { ElementAnimation, getAnimationClass, getMotionStyleClass, MotionConfig } from '../types';
import { useAnimate, UseAnimateOptions, UseAnimateResult } from './useAnimate';
import { cn } from '../utils';

/**
 * Result returned by the useMotion hook.
 *
 * @category Hooks
 */
export interface UseMotionResult extends UseAnimateResult {
    /**
     * Joined animation classes:
     * - animation class only while `animating`
     * - motion style helper class when style is set
     */
    animationClasses: string;
}

/**
 * Composes normalized motion input with useAnimate.
 *
 * Input can be a shorthand animation name or a full motion config object.
 * Optional `defaults` are merged with input before animation state is created.
 *
 * @param animation Motion value as shorthand name or full config object.
 * @param defaults Optional default motion configuration.
 * @param options Additional animation lifecycle options forwarded to useAnimate.
 * @category Hooks
 */
export function useMotion(
    animation: ElementAnimation | undefined,
    defaults: Partial<MotionConfig> = {},
    options: Omit<UseAnimateOptions, 't1'> = {}
): UseMotionResult {
    const motion = typeof animation === 'string' ? { ...defaults, animation } : { ...defaults, ...animation };

    const animateState = useAnimate({ t1: motion.duration, ...options });
    const animationClasses = cn(
        animateState.animating && getAnimationClass(motion.animation),
        getMotionStyleClass(motion.style)
    );

    return {
        ...animateState,
        animationClasses,
    };
}
