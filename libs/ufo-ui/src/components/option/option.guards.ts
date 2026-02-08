import React, { isValidElement, ReactElement } from 'react';

import { OptionProps } from './option';
import { MenuItemInternalProps } from '@ufoui/core';

export const IS_OPTION = Symbol.for('uui.option');

type OptionMarker = {
    [IS_OPTION]?: true;
};

/**
 * Type guard that checks whether a React node is an Option component.
 *
 * Identifies Option elements by the internal {@link IS_OPTION} symbol
 * attached to the component type.
 *
 * @param el - React node to test.
 * @returns `true` if the node is an Option element.
 *
 * @internal
 */
export function isOption(el: React.ReactNode): el is ReactElement<OptionProps & MenuItemInternalProps> {
    return isValidElement(el) && typeof el.type !== 'string' && !!(el.type as OptionMarker)[IS_OPTION];
}
