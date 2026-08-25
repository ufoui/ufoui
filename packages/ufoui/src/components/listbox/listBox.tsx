import React from 'react';

import { List, ListProps } from '../list/list';

/**
 * Props for the {@link ListBox} component.
 *
 * @category ListBox
 */
export type ListBoxProps = Omit<ListProps, 'type'>;

/**
 * **ListBox** - thin semantic wrapper over `List` that presets `type="listbox"`.
 *
 * @remarks
 * Prefer using `List` with `type="listbox"` directly when composing
 * with `Select` or other controlled parents.
 *
 * @example
 * ```tsx
 * <ListBox selection="single" defaultValue="a">
 *   <Item value="a" label="Apple" />
 *   <Item value="b" label="Banana" />
 * </ListBox>
 * ```
 *
 * @category ListBox
 */
export const ListBox = (props: ListBoxProps) => <List {...props} type="listbox" />;
