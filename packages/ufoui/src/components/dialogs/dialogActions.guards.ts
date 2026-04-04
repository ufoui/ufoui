import { isValidElement, ReactElement, ReactNode } from 'react';

import { DialogActionProps } from './dialogActions';

export const IS_DIALOG_ACTION = Symbol.for('uui.dialogAction');

type DialogActionMarker = {
    [IS_DIALOG_ACTION]?: true;
};

/**
 * Type guard that checks whether a React node is a dialog action component.
 *
 * Identifies dialog action elements by the internal {@link IS_DIALOG_ACTION} symbol
 * attached to the component type.
 *
 * @param el - React node to test.
 * @returns `true` if the node is a dialog action element.
 *
 * @internal
 */
export function isDialogAction(el: ReactNode): el is ReactElement<DialogActionProps> {
    return isValidElement(el) && typeof el.type !== 'string' && !!(el.type as DialogActionMarker)[IS_DIALOG_ACTION];
}
