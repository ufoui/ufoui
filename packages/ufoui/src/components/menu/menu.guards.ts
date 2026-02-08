import React, { isValidElement, ReactElement } from 'react';

import { type MenuInternalProps, type MenuProps } from '@ufoui/core';

export const IS_MENU = Symbol.for('uui.menu');

type MenuMarker = {
  [IS_MENU]?: true;
};

/**
 * Type guard that checks whether a React node is a Menu component.
 *
 * Identifies Menu elements by the internal {@link IS_MENU} symbol
 * attached to the component type.
 *
 * @param el - React node to test.
 * @returns `true` if the node is a Menu element.
 *
 * @internal
 */
export function isMenu(
  el: React.ReactNode,
): el is ReactElement<MenuProps & MenuInternalProps> {
  return (
    isValidElement(el) &&
    typeof el.type !== 'string' &&
    !!(el.type as MenuMarker)[IS_MENU]
  );
}
