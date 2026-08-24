import React, { ReactNode } from 'react';

import { SelectionContext } from '../../context/selectionContext';
import { useSelectionState } from '../../hooks';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';
import { cn, ElementDensity } from '../../utils';
import { BoxBase, BoxBaseProps } from '../base/boxBase';

/** @category List */
export type ListVariant = 'list' | 'listbox';

/** @category List */
export type ListSelection = 'none' | 'single' | 'multiple';

/** @category List */
export type ListSelectionSlot = 'none' | 'leading' | 'trailing';

/** @category List */
export interface ListConfig {
    density?: ElementDensity;
    itemRole: 'listitem' | 'option';

    /** Keyboard focus controller shared with the child items. */
    nav?: ReturnType<typeof useFocusNavigation>;

    /** Selection mode enabled for the list. */
    selection: ListSelection;

    /** Slot holding the selection marker, shared with the child items. */
    selectionSlot?: ListSelectionSlot;
    variant: ListVariant;
}

/**
 * Props for the {@link List} component.
 *
 * @category List
 */
export interface ListProps extends Omit<BoxBaseProps, 'type' | 'onChange'> {
    children: ReactNode;

    /** Uncontrolled initial selected value(s). */
    defaultValue?: string | string[];

    /** Density preset propagated to all child items. */
    density?: ElementDensity;

    /** Change handler called with the new selected values array. */
    onChange?: (values: string[]) => void;

    /** Selection mode enabled for the list. */
    selection?: ListSelection;

    /** Slot holding the selection marker, shared by all child items. */
    selectionSlot?: ListSelectionSlot;

    /** Controlled selected value(s). */
    value?: string | string[];

    /** Switches between display list and selectable listbox. */
    variant?: ListVariant;
}

/**
 * **List** - vertical container for {@link ListItem} elements.
 *
 * When `variant="listbox"` is set, enables keyboard navigation and
 * selection via {@link SelectionContext}. Supports both controlled
 * (`value` + `onChange`) and uncontrolled (`defaultValue`) modes.
 *
 * @example
 * ```tsx
 * <List variant="listbox" selection="single" defaultValue="a">
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
    variant = 'list',
    value,
    defaultValue,
    selection = 'none',
    selectionSlot,
    onChange,
    density,
    ...props
}: ListProps) => {
    const ss = useSelectionState({
        type: selection === 'multiple' ? 'multiple' : 'single',
        value,
        defaultValue,
        onChange,
    });
    const nav = useFocusNavigation('vertical');

    const config: ListConfig = {
        itemRole: variant === 'listbox' ? 'option' : 'listitem',
        density,
        nav,
        selection,
        selectionSlot,
        variant,
    };

    return (
        <SelectionContext.Provider value={{ ...ss, config }}>
            <BoxBase
                {...props}
                aria-orientation="vertical"
                as="div"
                className={cn('uui-list', className)}
                role={variant === 'listbox' ? 'listbox' : 'list'}>
                <div className="uui-list-scroll uui-flex uui-flex-col">{children}</div>
            </BoxBase>
        </SelectionContext.Provider>
    );
};
