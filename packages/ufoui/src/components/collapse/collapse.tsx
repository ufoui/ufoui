import { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';

import { ControlStyle, getShapeClass } from '../../utils';
import { BoxBase, BoxBaseProps } from '../base';
import { ObservedElementSize, useAnimate, useResizeObserver } from '../../hooks';
import { getAnimationClass, getMotionStyleClass, MotionAnimation, MotionStyle } from '../../types';

/**
 * Props for the Collapse component.
 *
 * @category Collapse
 */
export interface CollapseProps extends Omit<BoxBaseProps, 'elevation'> {
    /** Motion animation key. Default: slideDown. */
    animation?: MotionAnimation;

    /** Content rendered inside the container. */
    children?: ReactNode;

    /** Additional root class name. */
    className?: string;

    /** Animation duration in milliseconds. Default: 220. */
    duration?: number;

    /** Motion style variant. */
    motionStyle?: MotionStyle;

    /** Controls whether the container is expanded. */
    open: boolean;
}

/**
 * Animated container that expands and collapses vertically.
 *
 * Animates height and integrates with the UUI motion system.
 *
 * @function
 * @param props Component properties.
 *
 * @category Collapse
 */
export const Collapse = forwardRef<HTMLDivElement, CollapseProps>((props, ref) => {
    const {
        open,
        animation = 'slideDown',
        duration = 220,
        motionStyle = 'regular',
        className,
        children,
        style,
        shape,
        ...other
    } = props;

    const isFirstRender = useRef(true);
    const contentRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<number | undefined>(undefined);

    const { animationVars, animate, animating } = useAnimate({
        t1: duration,
    });

    const handleResize = ({ height }: ObservedElementSize) => {
        setSize(height);
        isFirstRender.current = false;
    };

    useResizeObserver(contentRef, handleResize, !animating);

    useEffect(() => {
        if (isFirstRender.current) {
            return;
        }
        animate(open ? 'open' : 'closed');
    }, [open]);

    const wrapperClasses = ['uui-collapse', className, ...(shape ? [getShapeClass(shape)] : [])]
        .filter(Boolean)
        .join(' ');

    const wrapperStyle = ControlStyle();
    wrapperStyle.merge(animationVars);
    if (open) {
        if (size !== undefined) {
            wrapperStyle.set('height', `${size}px`);
        }
    } else {
        wrapperStyle.set('height', '0px');
    }

    const contentClasses = [animating && getAnimationClass(animation), getMotionStyleClass(motionStyle)]
        .filter(Boolean)
        .join(' ');

    const controlStyle = ControlStyle(style);
    controlStyle.merge(animationVars);

    return (
        <div
            aria-hidden={!open}
            className={wrapperClasses}
            {...(!open ? { inert: '' } : {})}
            style={wrapperStyle.get()}>
            <div className="uui-collapse-wrapper" ref={contentRef}>
                <BoxBase {...other} className={contentClasses} ref={ref} shape={shape} style={controlStyle.get()}>
                    {children}
                </BoxBase>
            </div>
        </div>
    );
});

Collapse.displayName = 'Collapse';
