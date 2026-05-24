import React from 'react';

import { List, ListProps } from '../list/list';

/**
 * Props for the {@link ListBox} component.
 *
 * @category ListBox
 */
export type ListBoxProps = Omit<ListProps, 'variant'>;

/**
 * **ListBox** — thin semantic wrapper over `List` that presets `variant="listbox"`.
 *
 * @remarks
 * Prefer using `List` with `variant="listbox"` directly when composing
 * with `Select` or other controlled parents.
 *
 * @example
 * ```tsx
 * <ListBox type="single" defaultValue="a">
 *   <Item value="a" label="Apple" />
 *   <Item value="b" label="Banana" />
 * </ListBox>
 * ```
 *
 * @category ListBox
 */
export const ListBox = (props: ListBoxProps) => <List {...props} variant="listbox" />;
