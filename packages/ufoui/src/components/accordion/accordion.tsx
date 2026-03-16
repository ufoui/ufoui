import React, { ReactElement, ReactNode, useMemo } from 'react';

import { SelectionContext, SelectionContextValue } from '../../context';
import { BoxBase, BoxBaseProps } from '../base';
import { AccordionItemProps } from './accordionItem';
import { isAccordionItem } from './accordionItem.guards';
import {
    BorderColor,
    cn,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFont,
    ElementShape,
    getDensityClass,
    SurfaceColor,
} from '../../utils';
import { MotionAnimation, MotionStyle } from '../../types';
import { useSelectionState } from '../../hooks';

export type AccordionVariant = 'text' | 'pills' | 'grouped' | 'segmented';

export type AccordionConfig = {
    variant?: AccordionVariant;
    density?: ElementDensity;
    elevation?: ElementElevation;
    showIcon?: boolean;
    font?: ElementFont;
    border?: ElementBorder;
    borderColor?: BorderColor;
    shape?: ElementShape;
    animation?: MotionAnimation;
    motionStyle?: MotionStyle;
    duration?: number;
    color?: SurfaceColor;
    disabled?: boolean;
};

/**
 * Props for {@link Accordion}.
 *
 * @category Accordion
 */
export interface AccordionProps extends Omit<BoxBaseProps, 'type' | 'gap' | 'gapY' | 'gapX'> {
    /** Accordion behavior mode. Default: 'single'. */
    type?: 'single' | 'multiple';

    /** Accordion items. */
    children: ReactNode;

    variant: AccordionVariant;
    elevation?: ElementElevation;
    density?: ElementDensity;
    showIcon?: boolean;
    border?: ElementBorder;
    borderColor?: BorderColor;
    font?: ElementFont;
    animation?: MotionAnimation;
    motionStyle?: MotionStyle;
    duration?: number;
}

/**
 * Container component that manages accordion selection state.
 *
 * Uses shared selection behavior and provides it
 * to child components through SelectionContext.
 *
 * @function
 *
 * @category Accordion
 */
export const Accordion = ({
    type = 'single',
    variant = 'segmented',
    children,
    density,
    border,
    borderColor,
    elevation,
    showIcon,
    font,
    shape,
    animation,
    motionStyle,
    duration = 250,
    color,
    disabled,
}: AccordionProps) => {
    const ss = useSelectionState(type, 'vertical');
    const { values } = ss;
    const accordionItems: ReactElement<AccordionItemProps>[] = React.Children.toArray(children).filter(isAccordionItem);

    const finalShape = shape ?? (variant !== 'text' ? 'round' : undefined);
    const finalBorder = border ?? (variant !== 'text' ? 1 : undefined);

    const accordionProps = {
        elevation,
        border: finalBorder,
        borderColor,
        shape: finalShape,
    };

    const config = {
        density: density,
        variant: variant,
        showIcon: showIcon,
        font: font,
        animation: animation,
        motionStyle: motionStyle,
        duration: duration,
        color: color,
        disabled: disabled,
        ...accordionProps,
    };

    const contextValue = useMemo<SelectionContextValue<AccordionConfig>>(
        () => ({
            ...ss,
            config,
        }),
        [config, ss]
    );

    const groups: ReactElement<AccordionItemProps>[][] = [];
    const current: ReactElement<AccordionItemProps>[] = [];

    accordionItems.forEach(item => {
        if (variant === 'pills' || variant === 'segmented') {
            groups.push([item]);
        } else {
            current.push(item);
        }
    });

    if (current.length) {
        groups.push(current);
    }

    const classes = ['uui-accordion-group', getDensityClass(density)];
    return (
        <SelectionContext.Provider value={contextValue}>
            <div className={`uui-accordion uui-accordion-${variant}`}>
                {groups.map((group, i) => {
                    const groupOpen = group.some(item => values.includes(item.props.value));
                    return (
                        <BoxBase
                            key={i}
                            {...accordionProps}
                            className={cn(classes, groupOpen && 'uui-open')}
                            direction="col">
                            {group}
                        </BoxBase>
                    );
                })}
            </div>
        </SelectionContext.Provider>
    );
};
