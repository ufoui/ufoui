import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { Item, ItemProps } from './item';

/**
 * Props for {@link TreeItem}.
 * Extends {@link ItemProps}.
 *
 * @category TreeItem
 */
export type TreeItemProps = ItemProps;

/**
 * **TreeItem** - node of a {@link Tree}.
 *
 * Reads ARIA role and density from {@link SelectionContext}. Registers
 * itself with the focus controller provided by the parent `Tree`.
 *
 * @remarks
 * A node given `children` becomes a branch - the nested nodes render inside
 * a {@link Collapse} and stay ordinary tree items.
 *
 * @example
 * ```tsx
 * <Tree>
 *   <TreeItem label="Inbox" />
 *   <TreeItem defaultOpen label="Projects">
 *     <TreeItem label="Alpha" value="alpha" />
 *     <TreeItem label="Beta" value="beta" />
 *   </TreeItem>
 * </Tree>
 * ```
 *
 * @function
 * @category TreeItem
 */
export const TreeItem: ForwardRefExoticComponent<TreeItemProps & RefAttributes<HTMLDivElement>> = Item;
