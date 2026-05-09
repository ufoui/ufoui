import { forwardRef, ReactNode, useRef, useState } from 'react';

import { cn, ControlStyle, getShapeClass } from '../../utils';
import { BoxBase, BoxBaseProps } from '../base';
import { ObservedElementSize, useMotion, useResizeObserver, useUpdateEffect } from '../../hooks';
import { ElementAnimation } from '../../types';

/**
 * Props for the Collapse component.
 *
 * @category Collapse
 */
export interface CollapseProps extends Omit<BoxBaseProps, 'elevation'> {
    /** Motion value (`MotionAnimation` or full motion config). */
    animation?: ElementAnimation;
    /** Content rendered inside the container. */
    children?: ReactNode;
    /** Additional root class name. */
    className?: string;
    /** Controls whether the container is expanded. */
    open?: boolean;
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
    const { open, animation, className, children, style, shape, ...other } = props;
    const isOpen = open !== false;
    const resolvedInitial = (typeof animation === 'object' ? animation.initial : undefined) ?? 'skip';
    const contentRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<number | undefined>(undefined);

    const { animationVars, animate, animating, animationClasses } = useMotion(animation, {
        animation: 'fade',
        duration: 2200,
    });
    console.log(animationClasses, animating);
    const handleResize = ({ height }: ObservedElementSize) => {
        setSize(height);
    };

    useResizeObserver(contentRef, handleResize, !animating, true);

    useUpdateEffect(
        () => {
            animate(isOpen ? 'open' : 'closed');
        },
        [open],
        size !== undefined
    );

    const wrapperClasses = cn('uui-collapse', className, getShapeClass(shape));

    const wrapperStyle = ControlStyle();
    wrapperStyle.merge(animationVars);

    if (isOpen) {
        if (size !== undefined) {
            wrapperStyle.set('height', `${size}px`);
        }
    } else {
        wrapperStyle.set('height', '0px');
    }

    const controlStyle = ControlStyle(style);
    controlStyle.merge(animationVars);

    return (
        <div
            aria-hidden={!isOpen}
            className={wrapperClasses}
            {...(!isOpen ? { inert: '' } : {})}
            style={wrapperStyle.get()}>
            <div className="uui-collapse-wrapper" ref={contentRef}>
                <BoxBase {...other} className={animationClasses} ref={ref} shape={shape} style={controlStyle.get()}>
                    {children}
                </BoxBase>
            </div>
        </div>
    );
});

Collapse.displayName = 'Collapse';
