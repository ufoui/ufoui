import { Children, ReactElement, ReactNode, useMemo, useState } from 'react';

import { SelectionContext } from '../../context';
import { BoxBase, BoxBaseProps } from '../base/boxBase';
import { isTab } from './tab.guards';
import { TabProps } from './tab';

export interface TabsProps extends BoxBaseProps {
  defaultValue: string;
  children: ReactNode;
}

export const Tabs = ({ defaultValue, children, ...rest }: TabsProps) => {
  const [values, setValues] = useState<string[]>([defaultValue]);
  const tabItems: ReactElement<TabProps>[] =
    Children.toArray(children).filter(isTab);

  function set(value: string) {
    setValues([value]);
  }

  const contextValue = useMemo(
    () => ({
      values,
      mode: 'single' as const,
      toggle: set,
      set,
      clear: () => {
        setValues([]);
      },
    }),
    [values],
  );

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const currentIndex = tabItems.findIndex((tab) =>
      values.includes(tab.props.value),
    );

    if (currentIndex === -1) {
      return;
    }

    let nextIndex: number;

    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % tabItems.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + tabItems.length) % tabItems.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabItems.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    const nextValue = tabItems[nextIndex].props.value;
    set(nextValue);

    const el = document.getElementById(`uui-tab-${nextValue}-trigger`);
    el?.focus();
  }

  const buttons = tabItems
    .map((tab) => {
      return {
        label: tab.props.label,
        value: tab.props.value,
      };
    })
    .map(({ label, value }) => (
      <button
        aria-controls={`uui-tab-${value}-panel`}
        aria-selected={values.includes(value)}
        className="uui-tabs-trigger"
        id={`uui-tab-${value}-trigger`}
        key={value}
        onClick={() => {
          set(value);
        }}
        role="tab"
        tabIndex={values.includes(value) ? 0 : -1}
      >
        {label}
      </button>
    ));

  return (
    <SelectionContext.Provider value={contextValue}>
      <BoxBase direction="col" gap={2} {...rest}>
        <div
          aria-orientation="horizontal"
          className="uui-tabs-list"
          onKeyDown={onKeyDown}
          role="tablist"
        >
          {buttons}
        </div>
        <div className="uui-tabs-panels">{tabItems}</div>
      </BoxBase>
    </SelectionContext.Provider>
  );
};
