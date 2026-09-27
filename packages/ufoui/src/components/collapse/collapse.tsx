import { CSSProperties, forwardRef, ReactNode, useCallback, useRef, useState } from 'react';

import { cn, ControlStyle, getShapeClass, getWrapperStyle } from '../../utils';
import { BoxBase, BoxBaseProps } from '../base';
import { ObservedElementSize, useMotion, useResizeObserver, useUpdateEffect } from '../../hooks';
import { ElementAnimation } from '../../types';

/**
 * Props for the Collapse component.
 *
 * @category Collapse
 */
export interface CollapseProps
    extends Omit<BoxBaseProps, 'children' | 'className' | 'elevation' | 'elementClass' | 'style' | 'type'> {
    /** Motion value (`MotionAnimation` or full motion config). */
    animation?: ElementAnimation;
    /** Content rendered inside the inner BoxBase container. */
    children?: ReactNode;
    /** Additional root class name. */
    className?: string;
    /** Inline styles applied to the root container. */
    style?: CSSProperties;
    /** Controls whether the container is expanded. */
    open?: boolean;
}

/**
 * Animated container that expands and collapses vertically.
 *
 * Animates height and integrates with the UUI motion system.
 * `className`, `style`, ref, and wrapper props (margin, positioning, stacking) apply to the root
 * container; remaining BoxBase props and native attributes apply to the inner content container.
 *
 * @function
 * @param props Component properties.
 *
 * @category Collapse
 */
export const Collapse = forwardRef<HTMLDivElement, CollapseProps>((props, ref) => {
    const { open, animation, className, children, style, shape, ...other } = props;
    const isOpen = open !== false;
    const contentRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<number | undefined>(undefined);

    const { openingVars, closingVars, animate, animating, animationClasses } = useMotion(animation, {
        animation: 'slideDown',
        duration: 220,
    });

    const handleResize = useCallback(({ height }: ObservedElementSize) => {
        setSize(height);
    }, []);

    useResizeObserver(contentRef, handleResize, !animating, true);

    useUpdateEffect(
        () => {
            animate(isOpen ? 'open' : 'closed');
        },
        [open],
        size !== undefined
    );

    const wrapperClasses = cn('uui-collapse', className, getShapeClass(shape));

    const { wrapperStyle: outerStyle, otherProps } = getWrapperStyle(other);
    const wrapperStyle = ControlStyle(outerStyle);
    wrapperStyle.merge(style);
    const controlStyle = ControlStyle();

    let animationVars;
    if (isOpen) {
        if (size !== undefined) {
            wrapperStyle.set('height', `${size}px`);
        }
        animationVars = openingVars;
    } else {
        wrapperStyle.set('height', '0px');

        animationVars = closingVars;
    }

    controlStyle.merge(animationVars);
    wrapperStyle.merge(animationVars);

    return (
        <div
            aria-hidden={!isOpen}
            className={wrapperClasses}
            ref={ref}
            {...(!isOpen ? { inert: 'true' } : {})}
            style={wrapperStyle.get()}>
            <div className="uui-collapse-wrapper" ref={contentRef}>
                <BoxBase {...otherProps} className={animationClasses} shape={shape} style={controlStyle.get()}>
                    {children}
                </BoxBase>
            </div>
        </div>
    );
});

Collapse.displayName = 'Collapse';
