import { forwardRef, ReactNode, useEffect, useRef } from 'react';

import {
  getAnimationClass,
  getMotionStyleClass,
  MotionAnimation,
  MotionStyle,
} from '@ufoui/types';
import { ElementOrientation } from '@ufoui/utils';

import { BoxBase, BoxBaseProps } from '../base/boxBase/boxBase';
import { useAnimate } from '../../hooks/useAnimate';
import { ControlStyle } from '../../utils/color';

/**
 * Props for the Collapse component.
 *
 * @category Base components
 */
export interface CollapseProps extends BoxBaseProps {
  /** Controls whether the container is expanded. */
  open: boolean;

  /** Motion animation key. Default: slideDown */
  animation?: MotionAnimation;

  /** Animation duration in milliseconds. Default: 250 */
  duration?: number;

  /** Motion style variant. */
  motionStyle?: MotionStyle;

  /** Custom content rendered inside the container. */
  children?: ReactNode;

  /** Additional root class name. */
  className?: string;

  /** Collapse axis. Default: vertical */
  orientation?: ElementOrientation;
}

/**
 * Animated layout container that expands and collapses
 * along vertical or horizontal axis.
 *
 * Combines dimension animation (height / width)
 * with UUI motion system.
 *
 * @function
 * @param props - Component properties.
 *
 * @category Base components
 */
export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  (props, ref) => {
    const {
      open,
      animation = 'slideDown',
      duration = 250,
      motionStyle = 'regular',
      className,
      children,
      style,
      orientation = 'vertical',
      ...other
    } = props;

    const contentRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentSize = useRef(0);

    const { animationVars, animate, animating } = useAnimate({
      t1: duration,
      initial: open ? 'open' : 'closed',
    });

    useEffect(() => {
      animate(open ? 'open' : 'closed');
    }, [animate, open]);

    useEffect(() => {
      const el = contentRef.current;
      if (!el) {
        return;
      }
      const vertical = orientation === 'vertical';
      contentSize.current = vertical ? el.scrollHeight : el.scrollWidth;
    }, [orientation]);

    // useEffect(() => {
    //   const el = contentRef.current;
    //   if (!el) {
    //     return;
    //   }
    //
    //   const resizeObserver = new ResizeObserver((entries) => {
    //     for (const entry of entries) {
    //       const isVertical = orientation === 'vertical';
    //       const newSize = isVertical
    //         ? entry.target.scrollHeight
    //         : entry.target.scrollWidth;
    //       setSize(newSize);
    //     }
    //   });
    //
    //   resizeObserver.observe(el);
    //   return () => {
    //     resizeObserver.disconnect();
    //   };
    // }, [orientation]);

    const animationClass = getAnimationClass(animation);
    const motionStyleClass = getMotionStyleClass(motionStyle);

    const classes = [
      'uui-collapse',
      animating && animationClass,
      motionStyleClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperStyle = ControlStyle();
    wrapperStyle.merge(animationVars);
    wrapperStyle.set('overflow', 'hidden');
    wrapperStyle.set(
      'transitionProperty',
      orientation === 'vertical' ? 'height' : 'width',
    );

    const controlStyle = ControlStyle(style);
    if (open) {
      wrapperStyle.set('height', `${contentSize.current}px`);
    } else {
      wrapperStyle.set('height', '0px');
    }

    return (
      <div className={classes} ref={wrapperRef} style={wrapperStyle.get()}>
        <div className="uui-collapse-wrapper" ref={contentRef}>
          <BoxBase {...other} ref={ref} style={controlStyle.get()}>
            {children}
          </BoxBase>
        </div>
      </div>
    );
  },
);

Collapse.displayName = 'Collapse';
