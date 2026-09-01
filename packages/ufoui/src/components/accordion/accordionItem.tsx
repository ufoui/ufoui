import React, { ReactNode, useRef } from 'react';

import { Collapse } from '../collapse/collapse';
import { useFocusVisible, useSelection } from '../../hooks';
import { IS_ACCORDION_ITEM } from './accordionItem.guards';
import { Leading, Trailing } from '../../internal';
import { ExpandIcon } from '../../assets';
import { AccordionConfig, AccordionVariant } from './accordion';
import {
    cn,
    ControlStyle,
    createRipple,
    ElementEffects,
    ElementFont,
    getEffects,
    getFontClass,
    SurfaceColor,
} from '../../utils';
import { ElementAnimation } from '../../types';

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
    animation?: ElementAnimation;
    flush?: boolean;
    divided?: boolean;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    /** Interaction visual effects, or `'none'` to disable them all. */
    effects?: ElementEffects;
    color?: SurfaceColor;
    disabled?: boolean;
}

/**
 * Single accordion item consisting of a trigger and collapsible content.
 *
 * Integrates with shared selection behavior to determine
 * whether the panel is expanded and to toggle its state.
 *
 * @remarks
 * Supported effects:
 * - `hover`, `pressed` - `'overlay'`
 * - `touch` - `'ripple'`
 * - `focus` - `'ring'`, `'overlay'`
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
    flush,
    divided,
    onFocus,
    onBlur,
    color,
    disabled,
    effects,
}: AccordionItemProps) => {
    const finalEffects = getEffects(effects, {
        hover: ['overlay'],
        pressed: ['overlay'],
        touch: ['ripple'],
        focus: ['ring', 'overlay'],
    });

    const headerRef = useRef<HTMLDivElement>(null);
    const { values, toggle, config } = useSelection<AccordionConfig>();
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

    const triggerClasses = cn(
        'uui-accordion-trigger',
        getFontClass(font ?? config?.font ?? 'labelLarge'),
        finalEffects.focus?.includes('ring') && focusVisible && 'uui-focus-ring',
        finalEffects.focus?.includes('overlay') && 'uui-focus-overlay',
        finalEffects.hover?.includes('overlay') && 'uui-hover-overlay',
        finalEffects.pressed?.includes('overlay') && 'uui-pressed-overlay'
    );

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        toggle(value);
        if (finalEffects.touch?.includes('ripple') && headerRef.current) {
            createRipple(headerRef.current, e);
        }
    }

    const itemClasses = cn(
        `uui-accordion-item uui-accordion-item-${finalVariant}`,
        flush && 'uui-flush',
        divided && 'uui-divided'
    );

    const controlStyle = ControlStyle();
    const stateStyle = ControlStyle();
    stateStyle.bg.on(finalColor);
    controlStyle.bg(finalColor);
    controlStyle.text.on(finalColor);
    const collapseAnimation: ElementAnimation = {
        animation: 'fade',
        duration: 220,
        style: 'regular',
        ...(typeof config?.animation === 'string' ? { animation: config.animation } : config?.animation),
        ...(typeof animation === 'string' ? { animation } : animation),
    };

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
                    onKeyDown={config?.nav?.onKeyDown}
                    ref={config?.nav?.register}
                    type="button">
                    {label}
                    <div className="uui-state" style={stateStyle.get()} />
                </button>
                {trailingContent}
            </div>
            <Collapse animation={collapseAnimation} open={isOpen}>
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
