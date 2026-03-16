import { useCallback, useState } from 'react';

import { useRovingFocus } from './useRovingFocus';

/**
 * Hook that provides shared selection state logic for components
 * such as Accordion, Tabs or List.
 *
 * Manages selected values, exposes selection helpers and optionally
 * enables roving focus for keyboard navigation.
 *
 * @function
 *
 * @param type Selection type controlling whether one or multiple values can be active.
 * @param orientation Orientation used by roving focus navigation.
 *
 * @returns Object containing selection state, helper functions and roving focus controller.
 *
 * @category Hooks
 */
export function useSelectionState(type: 'single' | 'multiple', orientation: 'vertical' | 'horizontal' = 'vertical') {
    const [values, setValues] = useState<string[]>([]);
    const roving = useRovingFocus(orientation);

    const toggle = useCallback(
        (value: string) => {
            setValues(prev => {
                const isSelected = prev.includes(value);

                if (type === 'single') {
                    return isSelected ? [] : [value];
                }

                return isSelected ? prev.filter(v => v !== value) : [...prev, value];
            });
        },
        [type]
    );

    const set = useCallback((value: string) => {
        setValues([value]);
    }, []);

    const clear = useCallback(() => {
        setValues([]);
    }, []);

    return {
        values,
        toggle,
        set,
        clear,
        roving,
        type,
        orientation,
    };
}
