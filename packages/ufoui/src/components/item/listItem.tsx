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
 * @remarks
 * An item given `children` becomes an expandable group - the nested entries render
 * inside a {@link Collapse} and stay ordinary list items.
 *
 * @example
 * ```tsx
 * <List type="listbox" selection="single">
 *   <ListItem label="Apple" value="apple" />
 *   <ListItem description="Yellow fruit" label="Banana" value="banana" />
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * <List>
 *   <ListItem label="Inbox" />
 *   <ListItem defaultOpen label="Projects">
 *     <ListItem label="Alpha" value="alpha" />
 *     <ListItem label="Beta" value="beta" />
 *   </ListItem>
 * </List>
 * ```
 *
 * @function
 * @category ListItem
 */
export const ListItem: ForwardRefExoticComponent<ListItemProps & RefAttributes<HTMLDivElement>> = Item;
