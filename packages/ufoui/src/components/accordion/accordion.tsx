import React, { ReactElement, ReactNode, useMemo, useState } from 'react';

import { SelectionContext } from '../../context/selectionContext';
import { BoxBaseProps } from '../base/boxBase';
import { AccordionItemProps } from './accordionItem';
import { isAccordionItem } from './accordionItem.guards';

/**
 * Props for {@link Accordion}.
 *
 * @category Accordion
 */
export interface AccordionProps extends Omit<BoxBaseProps, 'type'> {
  /** Accordion behavior mode. Default: 'single'. */
  type?: 'single' | 'multiple';

  /** Accordion items. */
  children: ReactNode;
}

/**
 * Container component that manages accordion selection state.
 *
 * Uses shared selection behavior and provides it
 * to child components through SelectionContext.
 *
 * @function
 *
 * @category Accordion
 */
export const Accordion = ({
  type = 'single',
  children,
  ...rest
}: AccordionProps) => {
  const [values, setValues] = useState<string[]>([]);
  const accordionItems: ReactElement<AccordionItemProps>[] =
    React.Children.toArray(children).filter(isAccordionItem);

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
      <div className="uui-accordion uui-flex uui-flex-col">
        {accordionItems}
      </div>
    </SelectionContext.Provider>
  );
};
