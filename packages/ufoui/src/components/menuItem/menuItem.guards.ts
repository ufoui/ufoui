import React, { isValidElement, ReactElement } from 'react';

import { type MenuItemInternalProps, type MenuItemProps } from '@ufoui/core';

export const IS_MENU_ITEM = Symbol.for('uui.menuitem');

type MenuItemMarker = {
  [IS_MENU_ITEM]?: true;
};

/**
 * Type guard that checks whether a React node is a MenuItem component.
 *
 * Identifies MenuItem elements by the internal {@link IS_MENU_ITEM} symbol
 * attached to the component type.
 *
 * @param el - React node to test.
 * @returns `true` if the node is a MenuItem element.
 *
 * @internal
 */
export function isMenuItem(
  el: React.ReactNode,
): el is ReactElement<MenuItemProps & MenuItemInternalProps> {
  return (
    isValidElement(el) &&
    typeof el.type !== 'string' &&
    !!(el.type as MenuItemMarker)[IS_MENU_ITEM]
  );
}
