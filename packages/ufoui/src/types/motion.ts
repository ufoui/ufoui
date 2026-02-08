export type MotionAnimation =
  | 'fade'
  | 'fadeBlur'
  | 'scale'
  | 'scaleBlur'
  | 'popup'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'slideUpBlur'
  | 'slideDownBlur'
  | 'slideLeftBlur'
  | 'slideRightBlur'
  | 'rotate'
  | 'rotateUpRight'
  | 'rotateUpLeft'
  | 'rollLeft'
  | 'rollRight'
  | 'flipX'
  | 'flipY'
  | 'bounce'
  | 'squish'
  | 'rubber'
  | 'popElastic'
  | 'jelly';

export const motionClassMap: Record<MotionAnimation, string> = {
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
};

/**
 * Returns CSS class name for given motion animation.
 * Returns empty string when animation is not defined.
 */
export function getAnimationClass(animation?: MotionAnimation): string {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return animation ? (motionClassMap[animation] ?? '') : '';
}

/**
 * Returns list of available motion animation names.
 */
export function getAnimationList(): MotionAnimation[] {
  return Object.keys(motionClassMap) as MotionAnimation[];
}

export type MotionStyle = 'regular' | 'expressive';

/**
 * Returns CSS class name for motion style.
 * Expressive enables extended motion parameters.
 */
export function getMotionStyleClass(style?: MotionStyle): string {
  return style === 'expressive' ? 'uui-motion-expressive' : '';
}
