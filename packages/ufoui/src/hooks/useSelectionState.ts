import { useCallback, useMemo, useState } from 'react';

/**
 * Options for {@link useSelectionState}.
 *
 * @category Hooks
 */
export interface SelectionStateOptions {
    /** Selection type controlling whether one or multiple values can be active. Default: 'single'. */
    type?: 'single' | 'multiple';

    /** Controlled selected value(s). */
    value?: string | string[];

    /** Initial selected value(s) for uncontrolled usage. */
    defaultValue?: string | string[];

    /** Called whenever the selection changes. */
    onChange?: (values: string[]) => void;

    /** Whether the active value can be unselected in `single` mode. Default: true. */
    deselectable?: boolean;
}

const toValues = (value?: string | string[]) => (value === undefined ? [] : Array.isArray(value) ? value : [value]);

/**
 * Hook that provides shared selection state for components
 * such as Accordion, Tabs or List.
 *
 * Manages selected values and exposes selection helpers. Supports both
 * controlled (`value` + `onChange`) and uncontrolled (`defaultValue`) usage.
 *
 * @function
 *
 * @remarks
 * Selection only — keyboard focus is a separate concern, handled by
 * {@link useFocusNavigation} where the component needs it.
 *
 * @param options Selection configuration.
 *
 * @returns Object containing selection state and helper functions.
 *
 * @example
 * const { values, toggle } = useSelectionState({ type: 'multiple', defaultValue: 'a' });
 *
 * @category Hooks
 */
export function useSelectionState({
    type = 'single',
    value,
    defaultValue,
    onChange,
    deselectable = true,
}: SelectionStateOptions = {}) {
    const [internal, setInternal] = useState(() => toValues(defaultValue));
    const values = useMemo(() => (value === undefined ? internal : toValues(value)), [internal, value]);

    const commit = useCallback(
        (next: string[]) => {
            if (value === undefined) {
                setInternal(next);
            }
            onChange?.(next);
        },
        [onChange, value]
    );

    const toggle = useCallback(
        (v: string) => {
            const isSelected = values.includes(v);

            if (type === 'single') {
                if (isSelected && !deselectable) {
                    return;
                }

                commit(isSelected ? [] : [v]);
                return;
            }

            commit(isSelected ? values.filter(x => x !== v) : [...values, v]);
        },
        [commit, deselectable, type, values]
    );

    const set = useCallback(
        (v: string) => {
            commit([v]);
        },
        [commit]
    );

    const clear = useCallback(() => {
        commit([]);
    }, [commit]);

    return {
        values,
        toggle,
        set,
        clear,
        type,
    };
}
