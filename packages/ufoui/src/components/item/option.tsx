import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { Item, ItemProps } from './item';

/**
 * Props for {@link Option}.
 * Extends {@link ItemProps}.
 *
 * @category Option
 */
export type OptionProps = ItemProps;

/**
 * **Option** - selectable entry of a {@link Select}.
 *
 * Reads ARIA role and density from {@link SelectionContext}. Registers
 * itself with the focus controller provided by the parent `Select`.
 *
 * @example
 * ```tsx
 * <Select label="Fruit" placeholder="Pick a fruit...">
 *   <Option label="Apple" value="apple" />
 *   <Option description="Yellow fruit" label="Banana" value="banana" />
 * </Select>
 * ```
 *
 * @function
 * @category Option
 */
export const Option: ForwardRefExoticComponent<OptionProps & RefAttributes<HTMLDivElement>> = Item;
