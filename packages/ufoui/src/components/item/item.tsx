import React, { forwardRef, ForwardRefExoticComponent, RefAttributes, useContext, useEffect, useRef } from 'react';

import { SelectionContext } from '../../context';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';
import { Leading, Trailing } from '../../internal';
import { cn, createRipple, ElementDensity, getDensityClass, getFontClass, mergeRefs } from '../../utils';
import { IS_ITEM } from './item.guards';
import { ListSelection, ListSelectionSlot } from '../list/list';
import { Radio } from '../radio/radio';
import { Checkbox } from '../checkbox/checkbox';

interface ItemCtxConfig {
    itemRole?: string;
    density?: ElementDensity;
    nav?: ReturnType<typeof useFocusNavigation>;
    selection?: ListSelection;
    selectionSlot?: ListSelectionSlot;
}

export type ItemVariant = 'baseline' | 'expressive';

export type ItemMedia = 'image' | 'video';

/**
 * Props for the {@link Item} component.
 *
 * @category Item
 */
export interface ItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Secondary supporting text. */
    description?: string;

    /** Disables interactions and focus. */
    disabled?: boolean;

    /** Leading slot content. */
    leading?: React.ReactNode;

    /** Primary label text. */
    label?: string;

    /** Type of media placed in the item slots. Adjusts their vertical padding. */
    media?: ItemMedia;

    /** Slot holding the selection marker. Overrides the value provided by the parent `List`. */
    selectionSlot?: ListSelectionSlot;

    /** Trailing slot content. */
    trailing?: React.ReactNode;

    /** Value identifier used for selection. */
    value?: string;

    /** Short text rendered above the primary label. */
    overline?: string;

    /** Visual variant */
    variant?: ItemVariant;
}

/**
 * **Item** — dumb renderer for list, listbox and menu contexts.
 *
 * Reads ARIA role and density from {@link SelectionContext}. Registers
 * itself with the focus controller provided by the parent `List`.
 *
 * @remarks
 * Export aliases: `ListItem`, `Option`.
 *
 * @example
 * ```tsx
 * <List variant="listbox" selection="single">
 *   <Item value="a" label="Apple" />
 *   <Item value="b" label="Banana" description="Yellow fruit" />
 * </List>
 * ```
 *
 * @function
 * @category Item
 */
export const Item = forwardRef<HTMLDivElement, ItemProps>(
    (
        {
            overline,
            label,
            description,
            leading,
            trailing,
            media,
            value,
            disabled,
            selectionSlot,
            className,
            onClick,
            onKeyDown,
            ...props
        },
        ref
    ) => {
        const ctx = useContext(SelectionContext);
        const config = ctx?.config as ItemCtxConfig | undefined;
        const itemRef = useRef<HTMLDivElement>(null);

        const selected = value ? (ctx?.values.includes(value) ?? false) : false;
        const itemRole = config?.itemRole ?? 'listitem';
        const selection = config?.selection ?? 'none';
        const markerSlot = selectionSlot ?? config?.selectionSlot ?? 'leading';
        const canSelect = ctx && selection !== 'none' && !disabled && value;

        const markerControl =
            selection !== 'none' ? (
                selection === 'single' ? (
                    <Radio aria-hidden="true" checked={selected} readOnly tabIndex={-1} />
                ) : (
                    <Checkbox aria-hidden="true" checked={selected} readOnly tabIndex={-1} />
                )
            ) : null;

        useEffect(() => {
            const el = itemRef.current;
            if (!el || !config?.nav) {
                return;
            }
            config.nav.register(el);
            return () => config.nav?.unregister(el);
        }, [config?.nav]);

        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (disabled) {
                return;
            }
            if (canSelect) {
                ctx.toggle(value);
            }
            onClick?.(e);
            if (itemRef.current) {
                createRipple(itemRef.current, e);
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            config?.nav?.onKeyDown(e);
            if ((e.key === 'Enter' || e.key === ' ') && canSelect) {
                e.preventDefault();
                ctx.toggle(value);
            }
            onKeyDown?.(e);
        };

        return (
            <div
                {...props}
                aria-disabled={disabled || undefined}
                aria-selected={selected}
                className={cn(
                    'uui-item',
                    getDensityClass(config?.density),
                    media && `uui-media-${media}`,
                    selected && 'uui-selected',
                    disabled && 'uui-disabled',
                    className
                )}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                ref={mergeRefs(itemRef, ref)}
                role={itemRole}
                tabIndex={disabled ? -1 : 0}>
                <Leading content={leading} start={markerSlot === 'leading' ? markerControl : undefined} />
                <div className="uui-item-text">
                    {overline && <div className={cn('uui-item-overline', getFontClass('labelMedium'))}>{overline}</div>}
                    {label && <div className={cn('uui-item-label', getFontClass('bodyLarge'))}>{label}</div>}
                    {description && (
                        <div className={cn('uui-item-description', getFontClass('bodyMedium'))}>{description}</div>
                    )}
                </div>
                <Trailing content={trailing} end={markerSlot === 'trailing' ? markerControl : undefined} />
            </div>
        );
    }
);

type ItemComponent = ForwardRefExoticComponent<ItemProps & RefAttributes<HTMLDivElement>> & {
    [IS_ITEM]?: true;
};

(Item as ItemComponent)[IS_ITEM] = true;
Item.displayName = 'Item';

/** @category Item */
export const Option = Item;
