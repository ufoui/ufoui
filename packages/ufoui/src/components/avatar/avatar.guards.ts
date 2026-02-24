import React, { isValidElement, ReactElement } from 'react';

import { AvatarProps } from './avatar';

export const IS_AVATAR = Symbol.for('uui.avatar');

type AvatarMarker = {
  [IS_AVATAR]?: true;
};

/**
 * Type guard that checks whether a React node is an Avatar component.
 *
 * Identifies Avatar elements by the internal {@link IS_AVATAR} symbol
 * attached to the component type.
 *
 * @param el - React node to test.
 * @returns `true` if the node is an Avatar element.
 *
 * @internal
 */
export function isAvatar(el: React.ReactNode): el is ReactElement<AvatarProps> {
  return (
    isValidElement(el) &&
    typeof el.type !== 'string' &&
    !!(el.type as AvatarMarker)[IS_AVATAR]
  );
}
