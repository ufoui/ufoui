import { useContext } from 'react';

import { SelectionContext, SelectionContextValue } from '../context';

/**
 * Provides typed access to SelectionContext including selection state
 * and the optional configuration object provided by the parent.
 *
 * @typeParam T Optional configuration object type provided by the parent.
 *
 * @returns The current selection context value, or `null` outside a provider.
 *
 * @example
 * const selection = useSelection<MyConfig>();
 *
 * @category Hooks
 */
export function useSelection<T = unknown>() {
    return useContext(SelectionContext) as SelectionContextValue<T> | null;
}
