import React, { isValidElement } from 'react';

import { type DividerProps } from './divider';

export const IS_DIVIDER = Symbol.for('uui.divider');

type DividerMarker = {
  [IS_DIVIDER]?: true;
};

/**
 * Type guard that checks whether a React node is a Divider component.
 *
 * Identifies Divider elements by the presence of the internal
 * {@link IS_DIVIDER} symbol marker on the component type.
 *
 * @param el - React node to test.
 * @returns `true` if the node is a Divider element.
 *
 * @internal
 */
export function isDivider(
  el: React.ReactNode,
): el is React.ReactElement<DividerProps> {
  return (
    isValidElement(el) &&
    typeof el.type !== 'string' &&
    !!(el.type as DividerMarker)[IS_DIVIDER]
  );
}
