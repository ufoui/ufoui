import React, { ReactElement, ReactNode, useMemo, useState } from 'react';

import { SelectionContext } from '../../context';
import { BoxBaseProps } from '../base/boxBase';
import { ListItemProps } from './listItem';
import { isListItem } from './listItem.guards';

export interface ListProps extends Omit<BoxBaseProps, 'type'> {
  type?: 'single' | 'multiple';
  defaultValue?: string;
  children: ReactNode;
}

export const List = ({
  type = 'single',
  defaultValue,
  children,
}: ListProps) => {
  const [values, setValues] = useState<string[]>(
    defaultValue ? [defaultValue] : [],
  );

  const listItems: ReactElement<ListItemProps>[] =
    React.Children.toArray(children).filter(isListItem);

  function toggle(value: string) {
    setValues((prev) => {
      const isSelected = prev.includes(value);

      if (type === 'single') {
        return isSelected ? [] : [value];
      }

      return isSelected ? prev.filter((v) => v !== value) : [...prev, value];
    });
  }

  function set(value: string) {
    setValues(type === 'single' ? [value] : [value]);
  }

  function clear() {
    setValues([]);
  }

  const contextValue = useMemo(
    () => ({
      values,
      mode: type,
      toggle,
      set,
      clear,
    }),
    [values, type],
  );

  return (
    <SelectionContext.Provider value={contextValue}>
      <div
        aria-orientation="vertical"
        className="uui-list uui-flex uui-flex-col"
        role="listbox"
      >
        {listItems}
      </div>
    </SelectionContext.Provider>
  );
};
