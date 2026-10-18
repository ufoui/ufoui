import React, { ReactNode, useEffect, useRef } from 'react';

import { SelectionContext } from '../../context';
import { useSelectionState } from '../../hooks';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';
import { cn, ControlStyle, ElementDensity, getOnColorName } from '../../utils';
import { BoxBase, BoxBaseProps } from '../base';
import type { ItemVariant } from '../item/item';

/** @category List */
export type ListType = 'list' | 'listbox' | 'tree';

/** @category List */
export type ListSelection = 'none' | 'single' | 'multiple';

/** @category List */
export type ListSelectionMarker = 'auto' | 'checkbox' | 'radio' | 'icon' | 'switch';

/** @category List */
export type ListSelectionScroll = 'none' | 'nearest' | 'center';

/** @category List */
export type ListSelectionSlot = 'none' | 'leading' | 'trailing';

/** @category List */
export interface ListConfig {
    density?: ElementDensity;

    /** Disables all child items. */
    disabled?: boolean;

    /** Marks the child items as drag sources. */
    draggable?: boolean;

    /** Reserves the leading selection marker space of unselected child items. */
    fixedLeading?: boolean;

    itemRole: 'listitem' | 'option' | 'treeitem';

    /** Keyboard focus controller shared with the child items. */
    nav?: ReturnType<typeof useFocusNavigation>;

    /** Selection mode enabled for the list. */
    selection: ListSelection;

    /** Selection marker kind, shared with the child items. */
    selectionMarker?: ListSelectionMarker;

    /** Slot holding the selection marker, shared with the child items. */
    selectionSlot?: ListSelectionSlot;
    type: ListType;

    /** Visual variant, shared with the child items. */
    variant?: ItemVariant;
}

/**
 * Props for the {@link List} component.
 *
 * @category List
 */
export interface ListProps extends Omit<BoxBaseProps, 'type' | 'onChange' | 'draggable'> {
    children: ReactNode;

    /** Uncontrolled initial selected value(s). */
    defaultValue?: string | string[];

    /** Density preset propagated to all child items. */
    density?: ElementDensity;

    /** Disables all child items. */
    disabled?: boolean;

    /** Makes all child items draggable. */
    draggable?: boolean;

    /**
     * Reserves the selection marker space of unselected child items, so their text does not shift.
     * Applies to the `icon` marker in the leading slot. Default: `true`.
     */
    fixedLeading?: boolean;

    /** Change handler called with the new selected values array. */
    onChange?: (values: string[]) => void;

    /** Selection mode enabled for the list. */
    selection?: ListSelection;

    /**
     * Selection marker kind, shared by all child items. `auto` renders a radio for single
     * and a checkbox for multiple selection; `icon` renders a check mark on selected items only;
     * `switch` renders a switch, meant for multiple selection in the trailing slot.
     */
    selectionMarker?: ListSelectionMarker;

    /**
     * Scrolls the first selected item into view on mount - `nearest` with minimal movement,
     * `center` to the middle of the list. Default: `'none'`.
     */
    selectionScroll?: ListSelectionScroll;

    /** Slot holding the selection marker, shared by all child items. */
    selectionSlot?: ListSelectionSlot;

    /** ARIA role family applied to the list and to its child items. */
    type?: ListType;

    /** Controlled selected value(s). */
    value?: string | string[];

    /** Visual variant shared by all child items. Default: `'baseline'`. */
    variant?: ItemVariant;
}

/**
 * **List** - vertical container for {@link ListItem} elements.
 *
 * When `type="listbox"` is set, enables keyboard navigation and
 * selection via {@link SelectionContext}. Supports both controlled
 * (`value` + `onChange`) and uncontrolled (`defaultValue`) modes.
 *
 * @example
 * ```tsx
 * <List type="listbox" selection="single" defaultValue="a">
 *   <Item value="a" label="Apple" />
 *   <Item value="b" label="Banana" />
 * </List>
 * ```
 *
 * @category List
 */
export const List = ({
    children,
    className,
    color,
    style,
    type = 'list',
    value,
    defaultValue,
    selection = 'none',
    selectionMarker,
    selectionScroll = 'none',
    selectionSlot,
    onChange,
    density,
    disabled,
    draggable,
    fixedLeading,
    variant,
    ...props
}: ListProps) => {
    const ss = useSelectionState({
        type: selection === 'multiple' ? 'multiple' : 'single',
        value,
        defaultValue,
        onChange,
    });
    const nav = useFocusNavigation('vertical');
    const rootRef = useRef<HTMLElement>(null);
    const controlStyle = ControlStyle(style);
    controlStyle.token('--uui-variant-color', color && getOnColorName(color, true));

    const config: ListConfig = {
        itemRole: type === 'listbox' ? 'option' : type === 'tree' ? 'treeitem' : 'listitem',
        density,
        disabled,
        draggable,
        fixedLeading,
        nav,
        selection,
        selectionMarker,
        selectionSlot,
        type,
        variant,
    };

    useEffect(() => {
        if (selectionScroll !== 'none') {
            rootRef.current?.querySelector('.uui-selected')?.scrollIntoView({ block: selectionScroll });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SelectionContext.Provider value={{ ...ss, config }}>
            <BoxBase
                {...props}
                aria-orientation="vertical"
                className={cn('uui-list', variant === 'expressive' && 'uui-expressive', className)}
                color={color}
                ref={rootRef}
                role={type}
                style={controlStyle.get()}>
                <div className="uui-list-scroll uui-flex uui-flex-col" role="none">
                    {children}
                </div>
            </BoxBase>
        </SelectionContext.Provider>
    );
};
