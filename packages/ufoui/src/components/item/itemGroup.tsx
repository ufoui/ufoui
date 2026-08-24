import React, { ReactNode, useId, useState } from 'react';

import { ExpandIcon } from '../../assets';
import { Icon } from '../../internal';
import { cn } from '../../utils';
import { Collapse } from '../collapse/collapse';
import { Item, ItemProps } from './item';

/**
 * Props for the {@link ItemGroup} component.
 *
 * @category Item
 */
export interface ItemGroupProps extends ItemProps {
    /** Nested items revealed while the group is expanded. */
    children: ReactNode;

    /** Initial expanded state for uncontrolled usage. */
    defaultOpen?: boolean;

    /** Called whenever the expanded state changes. */
    onChange?: (open: boolean) => void;

    /** Controlled expanded state. */
    open?: boolean;
}

/**
 * **ItemGroup** — {@link ListItem} that reveals nested items.
 *
 * Renders the group header as a regular `Item` and the nested entries inside a
 * {@link Collapse}. The children stay ordinary list items: they register with
 * the focus controller of the parent `List` and take part in its selection.
 *
 * @remarks
 * Groups nest — every level adds its own leading inset. Supports both
 * controlled (`open` + `onChange`) and uncontrolled (`defaultOpen`) modes.
 *
 * @example
 * ```tsx
 * <List>
 *   <Item label="Inbox" />
 *   <ItemGroup defaultOpen label="Projects" leading={<FolderIcon />}>
 *     <Item label="Alpha" value="a" />
 *     <Item label="Beta" value="b" />
 *   </ItemGroup>
 * </List>
 * ```
 *
 * @function
 * @category Item
 */
export const ItemGroup = ({
    children,
    className,
    defaultOpen,
    onChange,
    onClick,
    onKeyDown,
    open,
    trailing,
    ...props
}: ItemGroupProps) => {
    const [internal, setInternal] = useState(!!defaultOpen);
    const id = useId();
    const expanded = open ?? internal;

    const toggle = () => {
        if (open === undefined) {
            setInternal(!expanded);
        }
        onChange?.(!expanded);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        toggle();
        onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
        onKeyDown?.(e);
    };

    return (
        <>
            <Item
                {...props}
                aria-controls={id}
                aria-expanded={expanded}
                className={cn(expanded && 'uui-open', className)}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                trailing={
                    <>
                        {trailing}
                        <Icon className="uui-item-expander" icon={ExpandIcon} />
                    </>
                }
            />
            <Collapse className="uui-item-group" direction="col" id={id} open={expanded}>
                {children}
            </Collapse>
        </>
    );
};

ItemGroup.displayName = 'ItemGroup';
