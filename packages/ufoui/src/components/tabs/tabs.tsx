import { ReactNode, useMemo, useState } from 'react';

import { SelectionContext } from '../../context/selectionContext';
import { BoxBase, BoxBaseProps } from '../base/boxBase/boxBase';

/**
 * Props for {@link Tabs}.
 *
 * @category Tabs
 */
export interface TabsProps extends BoxBaseProps {
  /** Initially selected tab value. */
  defaultValue: string;

  /** Tab items. */
  children: ReactNode;
}

/**
 * Container component that manages single tab selection state.
 *
 * Provides selection behavior to child Tab components.
 *
 * @function
 *
 * @category Tabs
 */
export const Tabs = ({ defaultValue, children, ...rest }: TabsProps) => {
  const [values, setValues] = useState<string[]>([defaultValue]);

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

  return (
    <SelectionContext.Provider value={contextValue}>
      <BoxBase direction="row" gap={2} {...rest}>
        <div role="tablist">{children}</div>
      </BoxBase>
    </SelectionContext.Provider>
  );
};
