import { isValidElement, ReactElement, ReactNode } from 'react';

import { ActionProps } from './actions';

export const IS_ACTION = Symbol.for('uui.action');

type ActionMarker = {
    [IS_ACTION]?: true;
};

/**
 * Type guard that checks whether a React node is an action component.
 *
 * Identifies action elements by the internal {@link IS_ACTION} symbol
 * attached to the component type.
 *
 * @param el - React node to test.
 * @returns `true` if the node is an action element.
 *
 * @internal
 */
export function isAction(el: ReactNode): el is ReactElement<ActionProps> {
    return isValidElement(el) && typeof el.type !== 'string' && !!(el.type as ActionMarker)[IS_ACTION];
}
