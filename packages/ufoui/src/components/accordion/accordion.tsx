import React, { ReactElement, ReactNode, useCallback, useMemo, useState } from 'react';

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
import { useRovingFocus } from '../../hooks/useRovingFocus';

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
    duration = 2000,
    color,
    disabled,
}: AccordionProps) => {
    const [values, setValues] = useState<string[]>([]);
    const roving = useRovingFocus('vertical');
    const accordionItems: ReactElement<AccordionItemProps>[] = React.Children.toArray(children).filter(isAccordionItem);

    const toggle = useCallback(
        (value: string) => {
            setValues(prev => {
                const isSelected = prev.includes(value);
                if (type === 'single') {
                    return isSelected ? [] : [value];
                }
                return isSelected ? prev.filter(v => v !== value) : [...prev, value];
            });
        },
        [type]
    );

    const set = useCallback((value: string) => {
        setValues([value]);
    }, []);

    const clear = useCallback(() => {
        setValues([]);
    }, []);

    const contextValue = useMemo<SelectionContextValue<AccordionConfig>>(
        () => ({
            values,
            mode: type,
            toggle,
            set,
            clear,
            roving,
            config: {
                density: density,
                elevation: elevation,
                variant: variant,
                showIcon: showIcon,
                font: font,
                border: border,
                borderColor: borderColor,
                shape: shape,
                animation: animation,
                motionStyle: motionStyle,
                duration: duration,
                color: color,
                disabled: disabled,
            },
        }),
        [
            values,
            type,
            toggle,
            set,
            clear,
            roving,
            density,
            elevation,
            variant,
            showIcon,
            font,
            border,
            borderColor,
            shape,
            animation,
            motionStyle,
            duration,
            color,
            disabled,
        ]
    );

    let boxProps: BoxBaseProps = {};

    boxProps = {
        elevation,
        border,
        borderColor,
        shape,
    };

    const groups: ReactElement<AccordionItemProps>[][] = [];
    let current: ReactElement<AccordionItemProps>[] = [];

    accordionItems.forEach(item => {
        const isOpen = values.includes(item.props.value);
        if (variant === 'pills') {
            groups.push([item]);
            return;
        }

        if (variant === 'segmented' && isOpen) {
            if (current.length) {
                groups.push(current);
            }
            groups.push([item]);
            current = [];
            return;
        }

        current.push(item);
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
                        <BoxBase key={i} {...boxProps} className={cn(classes, groupOpen && 'uui-open')} direction="col">
                            {group}
                        </BoxBase>
                    );
                })}
            </div>
        </SelectionContext.Provider>
    );
};
