import { createContext } from 'react';

/**
 * Context value shared by {@link Fieldset} and its child controls.
 *
 * Provides semantic state for grouped form elements.
 *
 * @category Contexts
 */
export interface FieldsetContextValue {
  /** Whether all controls inside the fieldset should be disabled. */
  disabled?: boolean;
}

/**
 * FieldsetContext provides access to the current fieldset state.
 *
 * Used by form controls (e.g. Checkbox, Radio) to inherit
 * group-level properties such as `disabled`.
 *
 * Returns `null` if used outside a {@link Fieldset}.
 *
 * @category Contexts
 */
export const FieldsetContext = createContext<FieldsetContextValue | null>(null);
