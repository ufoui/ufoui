import { useContext } from 'react';

import {
  SelectionContext,
  SelectionContextValue,
} from '../context/selectionContext';

/**
 * Hook to access the current selection context.
 *
 * Must be used within a component that provides SelectionContext.
 * If used outside, it will throw an error.
 *
 * @throws Error if the context is unavailable.
 * @returns The current SelectionContextValue.
 *
 * @category Hooks
 */
export function useSelection(): SelectionContextValue {
  const context = useContext(SelectionContext);

  if (!context) {
    throw new Error(
      'useSelection must be used within a SelectionContext provider',
    );
  }

  return context;
}
