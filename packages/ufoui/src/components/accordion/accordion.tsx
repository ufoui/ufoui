import React, { ReactElement, ReactNode, useMemo } from 'react';

import { SelectionContext, SelectionContextValue } from '../../context';
import { BoxBase, BoxBaseProps } from '../base';
import { AccordionItemProps } from './accordionItem';
import { isAccordionItem } from './accordionItem.guards';
import {
    BaseColor,
    BorderColor,
    cn,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFont,
    ElementShape,
    getDensityClass,
} from '../../utils';
import { ElementAnimation } from '../../types';
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
    animation?: ElementAnimation;
    color?: BaseColor;
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
    animation?: ElementAnimation;
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
                    const item = group[0];
                    const val = item.props.value;
                    const isOpen = values.includes(val);
                    const isFirst = i === 0;
                    const isLast = i === accordionItems.length - 1;

                    const prevItem = accordionItems[i - 1];
                    const nextItem = accordionItems[i + 1];

                    const isPrevOpen = prevItem && values.includes(prevItem.props.value);
                    const isNextOpen = nextItem && values.includes(nextItem.props.value);
                    const isSegmented = variant === 'segmented';
                    const shouldStickTop = isSegmented && !isFirst && !isOpen && !isPrevOpen;
                    const shouldStickBottom = isSegmented && !isLast && !isOpen && !isNextOpen;
                    return (
                        <BoxBase
                            key={val}
                            {...accordionProps}
                            className={cn(classes, isOpen && 'uui-open')}
                            direction="col"
                            style={
                                isSegmented
                                    ? {
                                          borderTopLeftRadius: shouldStickTop ? 0 : undefined,
                                          borderTopRightRadius: shouldStickTop ? 0 : undefined,
                                          borderBottomLeftRadius: shouldStickBottom ? 0 : undefined,
                                          borderBottomRightRadius: shouldStickBottom ? 0 : undefined,
                                          zIndex: isOpen ? 0 : i,
                                          position: 'relative',
                                          transition: 'all 250ms ease',
                                      }
                                    : undefined
                            }>
                            {group}
                        </BoxBase>
                    );
                })}
            </div>
        </SelectionContext.Provider>
    );
};
