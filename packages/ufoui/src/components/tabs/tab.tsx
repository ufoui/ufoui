import { ReactNode } from 'react';

import { useSelection } from '../../hooks/useSelection';
import { IS_TAB } from './tab.guards';

/**
 * Props for {@link Tab}.
 *
 * @category Tabs
 */
export interface TabProps {
  /** Unique tab value. */
  value: string;

  /** Tab label. */
  label: ReactNode;

  /** Tab panel content. */
  children: ReactNode;
}

/**
 * Tab component containing both trigger and panel.
 *
 * Displays its content when selected.
 *
 * @function
 *
 * @category Tabs
 */
export const Tab = ({ value, label, children }: TabProps) => {
  const { values } = useSelection();
  const isSelected = values.includes(value);
  return (
    <div
      aria-labelledby={`uui-tab-${value}-trigger`}
      className="uui-tabs-panel"
      hidden={!isSelected}
      id={`uui-tab-${value}-panel`}
      role="tabpanel"
    >
      {children}
    </div>
  );
};

/**
 * Marks this component as a Tab for runtime type guards.
 *
 * Used internally to identify Tab elements via a shared Symbol.
 * Not part of the public API.
 *
 * @internal
 */
Tab[IS_TAB] = true;

Tab.displayName = 'Tab';
