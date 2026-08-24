import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { Item, ItemProps } from './item';

/**
 * Props for {@link ListItem}.
 * Extends {@link ItemProps}.
 *
 * @category ListItem
 */
export type ListItemProps = ItemProps;

/**
 * **ListItem** - entry of a {@link List}.
 *
 * Reads ARIA role and density from {@link SelectionContext}. Registers
 * itself with the focus controller provided by the parent `List`.
 *
 * @example
 * ```tsx
 * <List variant="listbox" selection="single">
 *   <ListItem label="Apple" value="apple" />
 *   <ListItem description="Yellow fruit" label="Banana" value="banana" />
 * </List>
 * ```
 *
 * @function
 * @category ListItem
 */
export const ListItem: ForwardRefExoticComponent<ListItemProps & RefAttributes<HTMLDivElement>> = Item;
