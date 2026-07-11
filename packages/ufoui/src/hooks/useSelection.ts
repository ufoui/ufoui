import { useContext } from 'react';

import { SelectionContext, SelectionContextValue } from '../context';

/**
 * Provides typed access to SelectionContext including selection state
 * and the optional configuration object provided by the parent.
 *
 * @typeParam T Optional configuration object type provided by the parent.
 *
 * @returns The current selection context value.
 *
 * @example
 * const { values, toggle, config } = useSelection<MyConfig>();
 *
 * @category Hooks
 */
export function useSelection<T = unknown>() {
    const ctx = useContext(SelectionContext);

    if (!ctx) {
        throw new Error('useSelection must be used within SelectionContext provider');
    }

    return ctx as SelectionContextValue<T>;
}
