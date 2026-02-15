import { ReactNode } from 'react';

import { Collapse } from '../collapse/collapse';
import { useSelection } from '../../hooks/useSelection';

/**
 * Props for {@link AccordionItem}.
 *
 * @category Accordion
 */
export interface AccordionItemProps {
  /** Unique item value used to control selection state. */
  value: string;

  /** Item header content rendered inside the trigger button. */
  title: ReactNode;

  /** Panel content displayed when the item is expanded. */
  children: ReactNode;
}

/**
 * Single accordion item consisting of a trigger and collapsible content.
 *
 * Integrates with shared selection behavior to determine
 * whether the panel is expanded and to toggle its state.
 *
 * @function
 *
 * @category Accordion
 */
export const AccordionItem = ({
  value,
  title,
  children,
}: AccordionItemProps) => {
  const { values, toggle } = useSelection();
  const isOpen = values.includes(value);

  const id = `accordion-${value}`;

  return (
    <div>
      <button
        aria-controls={`${id}-content`}
        aria-expanded={isOpen}
        id={`${id}-trigger`}
        onClick={() => {
          toggle(value);
        }}
      >
        {title}
      </button>

      <Collapse open={isOpen}>
        <div
          aria-labelledby={`${id}-trigger`}
          id={`${id}-content`}
          role="region"
        >
          {children}
        </div>
      </Collapse>
    </div>
  );
};
