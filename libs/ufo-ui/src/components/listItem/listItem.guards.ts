import React, { isValidElement, ReactElement } from 'react';
import { ListItemInternalProps, ListItemProps } from '@ufoui/core';



export const IS_LIST_ITEM = Symbol.for('uui.listItem');

type ListItemMarker = {
    [IS_LIST_ITEM]?: true;
};

/**
 * Type guard that checks whether a React node is a MenuItem component.
 *
 * Identifies MenuItem elements by the internal {@link IS_LIST_ITEM} symbol
 * attached to the component type.
 *
 * @param el - React node to test.
 * @returns `true` if the node is a MenuItem element.
 *
 * @internal
 */
export function isListItem(el: React.ReactNode): el is ReactElement<ListItemProps & ListItemInternalProps> {
    return isValidElement(el) && typeof el.type !== 'string' && !!(el.type as ListItemMarker)[IS_LIST_ITEM];
}
