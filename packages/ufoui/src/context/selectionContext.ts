import { createContext } from 'react';

/**
 * Context value shared by components that rely on selection behavior.
 *
 * Provides state and control logic for managing single or multiple
 * selected values.
 *
 * @category Contexts
 */
export interface SelectionContextValue {
  /** Currently selected values. */
  values: string[];

  /** Selection mode: single or multiple. */
  mode: 'single' | 'multiple';

  /** Toggles selection state for a given value. */
  toggle: (value: string) => void;

  /** Sets a value directly (primarily for single mode). */
  set: (value: string) => void;

  /** Clears all selected values. */
  clear: () => void;
}

/**
 * SelectionContext provides access to shared selection state.
 *
 * Used by components such as Accordion, Tabs, RadioGroup,
 * and similar patterns that require controlled selection logic.
 *
 * Returns `null` if used outside a provider.
 *
 * @category Contexts
 */
export const SelectionContext = createContext<SelectionContextValue | null>(
  null,
);
