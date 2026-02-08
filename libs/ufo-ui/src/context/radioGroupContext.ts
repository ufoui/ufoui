import { createContext } from 'react';

/**
 * Context value shared by {@link RadioGroup} and radio controls.
 *
 * Provides group-level state and behavior for radio button collections.
 *
 * @category Contexts
 */
export interface RadioGroupContextValue {
    /** Whether all radio controls inside the group are disabled. */
    disabled?: boolean;

    /** Shared name attribute applied to all radio inputs in the group. */
    name: string;

    /** Updates the selected value of the radio group. */
    setValue?: (v: string) => void;

    /** Currently selected value of the radio group. */
    value?: string;
}

/**
 * RadioGroupContext provides access to the current radio group state.
 *
 * Used by radio controls to inherit group-level properties such as
 * `name`, `value`, `disabled`, and selection behavior.
 *
 * Returns `null` if used outside a {@link RadioGroup}.
 *
 * @category Contexts
 */
export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);
