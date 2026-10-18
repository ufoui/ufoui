import React from 'react';

import { List, ListProps } from '../list/list';

/**
 * Props for the {@link Tree} component.
 *
 * @category Tree
 */
export type TreeProps = Omit<ListProps, 'type'>;

/**
 * **Tree** - thin semantic wrapper over `List` that presets `type="tree"`.
 *
 * @remarks
 * Branches are {@link TreeItem} elements given `children` - the nested items render inside
 * a {@link Collapse} and share the focus controller and the selection of the tree.
 *
 * @example
 * ```tsx
 * <Tree selection="single">
 *   <TreeItem label="Inbox" value="inbox" />
 *   <TreeItem defaultOpen label="Projects">
 *     <TreeItem label="Alpha" value="alpha" />
 *     <TreeItem label="Beta" value="beta" />
 *   </TreeItem>
 * </Tree>
 * ```
 *
 * @category Tree
 */
export const Tree = (props: TreeProps) => <List {...props} type="tree" />;
