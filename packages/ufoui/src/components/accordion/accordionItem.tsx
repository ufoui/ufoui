import React, { ReactNode, useRef } from 'react';

import { Collapse } from '../collapse/collapse';
import { useFocusVisible, useSelection } from '../../hooks';
import { IS_ACCORDION_ITEM } from './accordionItem.guards';
import { Leading, Trailing } from '../../internal';
import { ExpandIcon } from '../../assets';
import { AccordionConfig, AccordionVariant } from './accordion';
import {
    ControlStyle,
    createRipple,
    ElementFocusEffect,
    ElementFont,
    ElementHoverEffect,
    ElementPressedEffect,
    ElementSelectedEffect,
    ElementTouchEffect,
    getFontClass,
    SurfaceColor,
} from '../../utils';
import { MotionAnimation, MotionStyle } from '../../types';

/**
 * Props for {@link AccordionItem}.
 *
 * @category Accordion
 */
export interface AccordionItemProps {
    /** Unique item value used to control selection state. */
    value: string;

    /** Item header content rendered inside the trigger button. */
    label: ReactNode;

    /** Panel content displayed when the item is expanded. */
    children: ReactNode;
    leading?: ReactNode;
    trailing?: ReactNode;
    icon?: ReactNode;
    showIcon?: boolean;
    variant?: AccordionVariant;
    font?: ElementFont;
    animation?: MotionAnimation;
    motionStyle?: MotionStyle;
    duration?: number;
    flush?: boolean;
    divided?: boolean;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    /** Hover visual effects. */
    hoverEffects?: ElementHoverEffect[];
    /** Focus visual effects. */
    focusEffects?: ElementFocusEffect[];
    /** Pressed visual effects. */
    pressedEffects?: ElementPressedEffect[];
    /** Touch and click visual effects. */
    touchEffects?: ElementTouchEffect[];
    /** Visual effects applied when selected. */
    selectedEffects?: ElementSelectedEffect[];
    color?: SurfaceColor;
    disabled?: boolean;
}

/**
 * Single accordion item consisting of a trigger and collapsible content.
 *
 * Integrates with shared selection behavior to determine
 * whether the panel is expanded and to toggle its state.
 *
 * @function
 *
 * @category Accordion
 */
export const AccordionItem = ({
    value,
    label,
    children,
    leading,
    trailing,
    showIcon,
    icon,
    font,
    variant,
    animation,
    duration,
    motionStyle,
    flush,
    divided,
    onFocus,
    onBlur,
    color,
    disabled,
    hoverEffects = ['overlay'],
    focusEffects = ['ring', 'overlay'],
    pressedEffects = ['overlay'],
    touchEffects = ['ripple'],
    selectedEffects = ['color'],
}: AccordionItemProps) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const { values, toggle, roving, config } = useSelection<AccordionConfig>();
    const isOpen = values.includes(value);
    const { focusVisible, focusHandlers } = useFocusVisible(onFocus, onBlur);
    const id = `accordion-${value}`;
    const finalShowIcon = showIcon ?? config?.showIcon ?? true;
    const finalVariant = variant ?? config?.variant ?? 'segmented';
    const finalDisabled = disabled ?? config?.disabled;
    const finalColor = color ?? config?.color;
    const expandIcon = finalShowIcon && <div className="uui-accordion-icon uui-icon">{icon ?? ExpandIcon}</div>;

    const leadingContent = leading && <Leading content={leading} />;
    const trailingContent = (trailing ?? finalShowIcon) && <Trailing content={trailing} end={expandIcon} />;

    const triggerClasses = [
        'uui-accordion-trigger',
        getFontClass(font ?? config?.font ?? 'labelLarge'),
        ...(focusEffects.includes('ring') && focusVisible ? ['uui-focus-ring'] : []),
        ...(focusEffects.includes('overlay') ? ['uui-focus-overlay'] : []),
        ...(hoverEffects.includes('overlay') ? ['uui-hover-overlay'] : []),
        ...(pressedEffects.includes('overlay') ? ['uui-pressed-overlay'] : []),
    ]
        .filter(Boolean)
        .join(' ');

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        toggle(value);
        if (touchEffects.includes('ripple') && headerRef.current) {
            createRipple(headerRef.current, e);
        }
    }

    const itemClasses = [
        `uui-accordion-item uui-accordion-item-${finalVariant}`,
        flush && 'uui-flush',
        divided && 'uui-divided',
    ]
        .filter(Boolean)
        .join(' ');

    const controlStyle = ControlStyle();
    const stateStyle = ControlStyle();
    stateStyle.bg.on(finalColor);
    controlStyle.bg(finalColor);
    controlStyle.text.on(finalColor);

    return (
        <div className={itemClasses} data-open={isOpen}>
            <div className="uui-accordion-header" ref={headerRef} style={controlStyle.get()}>
                {leadingContent}
                <button
                    {...focusHandlers}
                    aria-controls={`${id}-content`}
                    aria-expanded={isOpen}
                    className={triggerClasses}
                    disabled={finalDisabled}
                    id={`${id}-trigger`}
                    onClick={handleClick}
                    onKeyDown={roving?.onKeyDown}
                    ref={roving?.register}
                    type="button">
                    {label}
                    <div className="uui-state" style={stateStyle.get()} />
                </button>
                {trailingContent}
            </div>

            <Collapse
                animation={animation ?? config?.animation}
                duration={duration ?? config?.duration}
                motionStyle={motionStyle ?? config?.motionStyle}
                open={isOpen}>
                <div aria-labelledby={`${id}-trigger`} id={`${id}-content`} role="region">
                    {children}
                </div>
            </Collapse>
            {/* <div className="uui-accordion-divider"></div>*/}
        </div>
    );
};

/**
 * Marks this component as an AccordionItem for runtime type guards.
 *
 * Used internally to identify Accordion elements via a shared Symbol.
 * Not part of the public API.
 *
 * @internal
 */
AccordionItem[IS_ACCORDION_ITEM] = true;
