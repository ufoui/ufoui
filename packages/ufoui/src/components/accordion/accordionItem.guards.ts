import React, { isValidElement, ReactElement } from 'react';

import { AccordionItemProps } from './accordionItem';

export const IS_ACCORDION_ITEM = Symbol.for('uui.accordionItem');

type AccordionItemMarker = {
  [IS_ACCORDION_ITEM]?: true;
};

/**
 * Type guard that checks whether a React node is an AccordionItem component.
 *
 * Identifies AccordionItem elements by the internal {@link IS_ACCORDION_ITEM} symbol
 * attached to the component type.
 *
 * @param el - React node to test.
 * @returns `true` if the node is an AccordionItem element.
 *
 * @internal
 */
export function isAccordionItem(
  el: React.ReactNode,
): el is ReactElement<AccordionItemProps> {
  return (
    isValidElement(el) &&
    typeof el.type !== 'string' &&
    !!(el.type as AccordionItemMarker)[IS_ACCORDION_ITEM]
  );
}
