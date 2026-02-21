import { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';

import { ControlStyle, ElementOrientation } from '../../utils';
import { BoxBase, BoxBaseProps } from '../base/boxBase';
import {
  ObservedElementSize,
  useAnimate,
  useResizeObserver,
} from '../../hooks';
import {
  getAnimationClass,
  getMotionStyleClass,
  MotionAnimation,
  MotionStyle,
} from '../../types';

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
      duration = 220,
      motionStyle = 'regular',
      className,
      children,
      style,
      orientation = 'vertical',
      ...other
    } = props;
    const isFirstRender = useRef(true);
    const contentRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<number | undefined>(undefined);
    const propertyName = orientation === 'vertical' ? 'height' : 'width';

    const { animationVars, animate, animating } = useAnimate({
      t1: duration,
    });

    const handleResize = ({ height, width }: ObservedElementSize) => {
      console.log('calc HxW', height, width);
      setSize(orientation === 'vertical' ? height : width);
      isFirstRender.current = false;
    };

    console.log('open:', open, 'anim:', animating, size);
    useResizeObserver(contentRef, handleResize, !animating);

    useEffect(() => {
      if (isFirstRender.current) {
        return;
      }
      animate(open ? 'open' : 'closed');
    }, [open]);

    useEffect(() => {
      const el = contentRef.current;
      if (!el) {
        return;
      }
      const vertical = orientation === 'vertical';
      setSize(vertical ? el.scrollHeight : el.scrollWidth);
    }, [orientation]);

    const wrapperClasses = [
      'uui-collapse',
      className,
      orientation === 'vertical' ? 'uui-vertical' : 'uui-horizontal',
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperStyle = ControlStyle();
    wrapperStyle.merge(animationVars);
    if (open) {
      if (size !== undefined) {
        wrapperStyle.set(propertyName, `${size}px`);
      }
      if (orientation === 'horizontal') {
        wrapperStyle.set('display', 'inline-flex');
        wrapperStyle.set('width', '100%');
      }
    } else {
      wrapperStyle.set(propertyName, '0px');
    }

    const contentClasses = [
      animating && getAnimationClass(animation),
      getMotionStyleClass(motionStyle),
    ]
      .filter(Boolean)
      .join(' ');

    const controlStyle = ControlStyle(style);
    controlStyle.merge(animationVars);

    return (
      <div
        aria-hidden={!open}
        className={wrapperClasses}
        // @ts-expect-error
        inert={!open ? '' : undefined}
        ref={wrapperRef}
        style={wrapperStyle.get()}
      >
        <div className="uui-collapse-wrapper" ref={contentRef}>
          <BoxBase
            {...other}
            className={contentClasses}
            ref={ref}
            style={controlStyle.get()}
          >
            {children}
          </BoxBase>
        </div>
      </div>
    );
  },
);

Collapse.displayName = 'Collapse';
