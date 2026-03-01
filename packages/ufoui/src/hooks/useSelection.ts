import { useContext } from 'react';

import { SelectionContext, SelectionContextValue } from '../context';

/**
 * Provides typed access to SelectionContext including selection state,
 * optional configuration, and roving focus controller.
 *
 * @typeParam T Optional configuration object type provided by the parent.
 *
 * @returns The current selection context value.
 *
 * @example
 * const { values, toggle, config, roving } =
 *   useSelection<MyConfig>();
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
