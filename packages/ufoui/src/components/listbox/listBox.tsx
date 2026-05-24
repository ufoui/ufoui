import React, { KeyboardEvent, ReactElement, ReactNode, useMemo, useState } from 'react';

import { BoxBaseProps } from '../base/boxBase';
import { List } from '../list/list';
import { ListItem, ListItemProps } from '../list/listItem';
import { isListItem } from '../list/listItem.guards';

export interface ListBoxProps extends Omit<BoxBaseProps, 'type'> {
    type?: 'single' | 'multiple';
    defaultValue?: string;
    children: ReactNode;
}

export const ListBox = ({ type = 'single', defaultValue, children, ...props }: ListBoxProps) => {
    const [values, setValues] = useState<string[]>(defaultValue ? [defaultValue] : []);
    const listItems: ReactElement<ListItemProps>[] = React.Children.toArray(children).filter(isListItem);
    const [activeIndex, setActiveIndex] = useState<number>(() => {
        const firstEnabledIndex = listItems.findIndex(item => !item.props.disabled);
        return firstEnabledIndex >= 0 ? firstEnabledIndex : -1;
    });

    function toggle(value: string) {
        setValues(prev => {
            const isSelected = prev.includes(value);

            if (type === 'single') {
                return isSelected ? [] : [value];
            }

            return isSelected ? prev.filter(v => v !== value) : [...prev, value];
        });
    }

    const enabledIndexes = useMemo(
        () =>
            listItems.map((item, index) => ({ disabled: item.props.disabled, index })).filter(entry => !entry.disabled),
        [listItems]
    );

    function moveActive(delta: 1 | -1) {
        if (enabledIndexes.length === 0) {
            return;
        }

        const currentEnabled = enabledIndexes.findIndex(entry => entry.index === activeIndex);
        const current = currentEnabled >= 0 ? currentEnabled : 0;
        const next = (current + delta + enabledIndexes.length) % enabledIndexes.length;
        setActiveIndex(enabledIndexes[next].index);
    }

    function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            moveActive(1);
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            moveActive(-1);
            return;
        }

        if (e.key === 'Home') {
            e.preventDefault();
            if (enabledIndexes.length > 0) {
                setActiveIndex(enabledIndexes[0].index);
            }
            return;
        }

        if (e.key === 'End') {
            e.preventDefault();
            if (enabledIndexes.length > 0) {
                setActiveIndex(enabledIndexes[enabledIndexes.length - 1].index);
            }
            return;
        }

        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const item = listItems[activeIndex];
            const value = item?.props.value;
            if (item && !item.props.disabled && value) {
                toggle(value);
            }
        }
    }

    return (
        <div onKeyDown={onKeyDown} role="listbox" tabIndex={0}>
            <List {...props}>
                {listItems.map((item, index) => {
                    const { value } = item.props;
                    const selected = value ? values.includes(value) : false;

                    return (
                        <ListItem
                            {...item.props}
                            active={index === activeIndex}
                            aria-selected={selected}
                            key={item.key ?? value ?? `list-item-${index}`}
                            onClick={e => {
                                item.props.onClick?.(e);
                                if (item.props.disabled || !value) {
                                    return;
                                }
                                setActiveIndex(index);
                                toggle(value);
                            }}
                            role="option"
                            selected={selected}
                        />
                    );
                })}
            </List>
        </div>
    );
};
