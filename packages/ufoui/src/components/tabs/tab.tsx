import { ReactNode } from 'react';

import { useSelection } from '../../hooks/useSelection';

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
  const { values, set } = useSelection();
  const isSelected = values.includes(value);

  const id = `tab-${value}`;

  return (
    <>
      <button
        aria-controls={`${id}-panel`}
        aria-selected={isSelected}
        id={`${id}-trigger`}
        onClick={() => {
          set(value);
        }}
        role="tab"
        tabIndex={isSelected ? 0 : -1}
      >
        {label}
      </button>

      {isSelected && (
        <div
          aria-labelledby={`${id}-trigger`}
          id={`${id}-panel`}
          role="tabpanel"
        >
          {children}
        </div>
      )}
    </>
  );
};
