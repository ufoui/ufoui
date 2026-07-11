import React, { ReactNode, useCallback, useState } from 'react';

import { SelectionContext } from '../../context/selectionContext';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';
import { cn, ElementDensity } from '../../utils';
import { BoxBase, BoxBaseProps } from '../base/boxBase';

/** @category List */
export type ListVariant = 'list' | 'listbox';

/** @category List */
export interface ListConfig {
    density?: ElementDensity;
    itemRole: 'listitem' | 'option';

    /** Keyboard focus controller shared with the child items. */
    nav?: ReturnType<typeof useFocusNavigation>;
    variant: ListVariant;
}

/**
 * Props for the {@link List} component.
 *
 * @category List
 */
export interface ListProps extends Omit<BoxBaseProps, 'type' | 'onChange'> {
    children: ReactNode;

    /** Uncontrolled initial selected value(s). */
    defaultValue?: string | string[];

    /** Density preset propagated to all child items. */
    density?: ElementDensity;

    /** Change handler called with the new selected values array. */
    onChange?: (values: string[]) => void;

    /** Selection type for listbox variant. */
    type?: 'single' | 'multiple';

    /** Controlled selected value(s). */
    value?: string | string[];

    /** Switches between display list and selectable listbox. */
    variant?: ListVariant;
}

function toArray(v?: string | string[]): string[] {
    if (!v) {
        return [];
    }
    return Array.isArray(v) ? v : [v];
}

/**
 * **List** — vertical container for {@link Item} elements.
 *
 * When `variant="listbox"` is set, enables keyboard navigation and
 * selection via {@link SelectionContext}. Supports both controlled
 * (`value` + `onChange`) and uncontrolled (`defaultValue`) modes.
 *
 * @example
 * ```tsx
 * <List variant="listbox" type="single" defaultValue="a">
 *   <Item value="a" label="Apple" />
 *   <Item value="b" label="Banana" />
 * </List>
 * ```
 *
 * @category List
 */
export const List = ({
    children,
    className,
    variant = 'list',
    type = 'single',
    value,
    defaultValue,
    onChange,
    density,
    ...props
}: ListProps) => {
    const isControlled = value !== undefined;
    const [internalValues, setInternalValues] = useState<string[]>(() => toArray(defaultValue));
    const currentValues = isControlled ? toArray(value) : internalValues;

    const nav = useFocusNavigation('vertical');

    const toggle = useCallback(
        (v: string) => {
            const isSelected = currentValues.includes(v);
            const newValues =
                type === 'single'
                    ? isSelected
                        ? []
                        : [v]
                    : isSelected
                      ? currentValues.filter(x => x !== v)
                      : [...currentValues, v];

            if (!isControlled) {
                setInternalValues(newValues);
            }
            onChange?.(newValues);
        },
        [currentValues, type, isControlled, onChange]
    );

    const set = useCallback(
        (v: string) => {
            const newValues = [v];
            if (!isControlled) {
                setInternalValues(newValues);
            }
            onChange?.(newValues);
        },
        [isControlled, onChange]
    );

    const clear = useCallback(() => {
        if (!isControlled) {
            setInternalValues([]);
        }
        onChange?.([]);
    }, [isControlled, onChange]);

    const config: ListConfig = {
        itemRole: variant === 'listbox' ? 'option' : 'listitem',
        density,
        nav,
        variant,
    };

    return (
        <SelectionContext.Provider value={{ values: currentValues, toggle, set, clear, type, config }}>
            <BoxBase
                {...props}
                aria-orientation="vertical"
                as="div"
                className={cn('uui-list', className)}
                role={variant === 'listbox' ? 'listbox' : 'list'}>
                <div className="uui-list-scroll uui-flex uui-flex-col">{children}</div>
            </BoxBase>
        </SelectionContext.Provider>
    );
};
