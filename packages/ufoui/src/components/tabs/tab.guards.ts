import React, { isValidElement, ReactElement } from 'react';

import { TabProps } from './tab';

export const IS_TAB = Symbol.for('uui.tab');

type TabMarker = {
  [IS_TAB]?: true;
};

/**
 * Type guard that checks whether a React node is a Tab component.
 *
 * Identifies Tab elements by the internal {@link IS_TAB} symbol
 * attached to the component type.
 *
 * @param el - React node to test.
 * @returns `true` if the node is a Tab element.
 *
 * @internal
 */
export function isTab(el: React.ReactNode): el is ReactElement<TabProps> {
  return (
    isValidElement(el) &&
    typeof el.type !== 'string' &&
    !!(el.type as TabMarker)[IS_TAB]
  );
}
