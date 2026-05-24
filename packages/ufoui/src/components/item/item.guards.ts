import React, { isValidElement, ReactElement } from 'react';

import { ItemProps } from './item';

export const IS_ITEM = Symbol.for('uui.item');

type ItemMarker = { [IS_ITEM]?: true };

/**
 * Type guard that checks whether a React node is an Item component.
 *
 * @param el - React node to test.
 * @returns `true` if the node is an Item element.
 *
 * @internal
 */
export function isItem(el: React.ReactNode): el is ReactElement<ItemProps> {
    return (
        isValidElement(el) &&
        typeof el.type !== 'string' &&
        !!(el.type as ItemMarker)[IS_ITEM]
    );
}
