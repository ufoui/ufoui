export const motionClassMap = {
    fade: 'uui-motion-fade',
    fadeBlur: 'uui-motion-fade-blur',

    scale: 'uui-motion-scale',
    scaleBlur: 'uui-motion-scale-blur',
    popup: 'uui-motion-popup',

    slideUp: 'uui-motion-slide-up',
    slideDown: 'uui-motion-slide-down',
    slideLeft: 'uui-motion-slide-left',
    slideRight: 'uui-motion-slide-right',

    slideUpBlur: 'uui-motion-slide-up-blur',
    slideDownBlur: 'uui-motion-slide-down-blur',
    slideLeftBlur: 'uui-motion-slide-left-blur',
    slideRightBlur: 'uui-motion-slide-right-blur',

    rotate: 'uui-motion-rotate',
    rotateUpRight: 'uui-motion-rotate-up-right',
    rotateUpLeft: 'uui-motion-rotate-up-left',
    rollLeft: 'uui-motion-roll-left',
    rollRight: 'uui-motion-roll-right',

    flipX: 'uui-motion-flip-x',
    flipY: 'uui-motion-flip-y',

    bounce: 'uui-motion-bounce',
    squish: 'uui-motion-squish',
    rubber: 'uui-motion-rubber',
    popElastic: 'uui-motion-pop-elastic',
    jelly: 'uui-motion-jelly',
    none: '',
};

export type MotionAnimation = keyof typeof motionClassMap;

/**
 * Returns CSS class name for given motion animation.
 * Returns empty string when animation is not defined or set to 'none'.
 */
export function getAnimationClass(animation?: MotionAnimation): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return animation && animation !== 'none' ? (motionClassMap[animation] ?? '') : '';
}

/**
 * Returns list of available motion animation names, excluding `'none'`.
 */
export function getAnimationList(): MotionAnimation[] {
    return Object.keys(motionClassMap).filter(v => v !== 'none') as MotionAnimation[];
}

export type MotionStyle = 'regular' | 'expressive';

/**
 * Returns CSS class name for motion style.
 * Expressive enables extended motion parameters.
 */
export function getMotionStyleClass(style?: MotionStyle): string {
    return style === 'expressive' ? 'uui-motion-expressive' : '';
}
