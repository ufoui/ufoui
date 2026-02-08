import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { MenuItem, MenuItemInternalProps, MenuItemProps } from '@ufoui/core';
import { IS_OPTION } from './option.guards';

export interface OptionProps extends Omit<MenuItemProps, 'type' | 'checked'> {
    selected?: boolean;
}

export const Option = forwardRef<HTMLDivElement, OptionProps & MenuItemInternalProps>(({ selected, ...props }, ref) => (
    <MenuItem {...props} aria-selected={selected ?? false} ref={ref} role="option" type="option" />
));

type OptionComponent = ForwardRefExoticComponent<
    OptionProps & MenuItemInternalProps & RefAttributes<HTMLDivElement>
> & {
    [IS_OPTION]?: true;
};

/**
 * Marks this component as an Option for runtime type guards.
 *
 * Used internally to identify Option elements via a shared Symbol.
 * Not part of the public API.
 *
 * @internal
 */
(Option as OptionComponent)[IS_OPTION] = true;

/**
 * Display name used by React DevTools.
 *
 * @internal
 */
Option.displayName = 'Option';
