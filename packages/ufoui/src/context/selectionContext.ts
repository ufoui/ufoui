import { createContext } from 'react';

/**
 * Context value shared by components that rely on selection behavior.
 *
 * @typeParam T - Optional configuration object provided by the parent component.
 *
 * @remarks
 * Selection only. Keyboard focus is family-specific — components that need it
 * expose their own controller through {@link SelectionContextValue.config}.
 *
 * @category Contexts
 */
export interface SelectionContextValue<T = unknown> {
    /** Clears all selected values. */
    clear: () => void;

    /** Optional configuration object passed from the parent component. */
    config?: T;

    /** Selection type: single or multiple. */
    type: 'single' | 'multiple';

    /** Sets a value directly. */
    set: (value: string) => void;

    /** Toggles selection state for a given value. */
    toggle: (value: string) => void;

    /** Currently selected values. */
    values: string[];
}

/**
 * React context that exposes shared selection state and optional configuration.
 *
 * Returns `null` when accessed outside of a provider.
 *
 * @category Contexts
 */
export const SelectionContext = createContext<SelectionContextValue | null>(null);
