import React, { Children, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ExpandIcon } from '../../assets';
import { useClickOutside } from '../../hooks';
import { calculateFloatingPosition, renderPortal } from '../../utils';
import { FieldBase, FieldBaseProps } from '../base/fieldBase';
import { isItem } from '../item/item.guards';
import { List } from '../list/list';

/**
 * Props for the {@link Select} component.
 *
 * @category Field
 */
export interface SelectProps
    extends Omit<FieldBaseProps, 'elementClass' | 'value' | 'onChange' | 'trailing' | 'defaultValue'> {
    /** Select options — `Item` or `Option` elements. */
    children?: ReactNode;

    /** Change handler called with the new selected value. */
    onChange?: (value: string | string[] | undefined) => void;

    /** Uncontrolled initial selected value. */
    defaultValue?: string | string[];

    /** Enables multiple value selection. */
    multiple?: boolean;

    /** Placeholder displayed when no value is selected. */
    placeholder?: string;

    /** Controlled selected value. */
    value?: string | string[];
}

/**
 * **Select** — field control that opens a listbox dropdown for picking values.
 *
 * Composes `FieldBase` (trigger) with `List variant="listbox"` (dropdown).
 * Supports single and multiple selection, controlled and uncontrolled modes.
 *
 * @example
 * ```tsx
 * <Select label="Fruit" value={fruit} onChange={v => setFruit(v as string)}>
 *   <Item value="apple" label="Apple" />
 *   <Item value="banana" label="Banana" />
 * </Select>
 * ```
 *
 * @category Field
 */
export const Select = ({
    value,
    defaultValue,
    onChange,
    multiple,
    placeholder,
    children,
    density,
    ...props
}: SelectProps) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string | string[] | undefined>(defaultValue);
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({
        position: 'fixed',
        opacity: 0,
        width: '100%',
        left: '0',
    });

    const currentValue = isControlled ? value : internalValue;

    useClickOutside(open, [wrapperRef, listRef], () => {
        setOpen(false);
    });

    useEffect(() => {
        if (!open || !wrapperRef.current || !listRef.current) {
            return;
        }
        const pos = calculateFloatingPosition(wrapperRef, listRef, { mode: 'dropdown', placement: 'auto', offset: 4 });
        const { width } = wrapperRef.current.getBoundingClientRect();
        setDropdownStyle({
            position: 'fixed',
            left: pos?.x ?? 0,
            top: pos?.y ?? 0,
            minWidth: width,
            zIndex: 1000,
            opacity: 1,
        });
    }, [open]);

    const handleChange = useCallback(
        (values: string[]) => {
            const newValue = multiple ? values : values[0];
            if (!isControlled) {
                setInternalValue(newValue);
            }
            onChange?.(newValue);
            if (!multiple) {
                setOpen(false);
            }
        },
        [isControlled, multiple, onChange]
    );

    const currentValues = Array.isArray(currentValue) ? currentValue : currentValue !== undefined ? [currentValue] : [];

    const labels = useMemo(() => {
        const map = new Map<string, string>();
        Children.forEach(children, child => {
            if (isItem(child) && child.props.value) {
                map.set(child.props.value, child.props.label ?? child.props.value);
            }
        });
        return map;
    }, [children]);

    const displayValue = currentValues.map(v => labels.get(v) ?? v).join(', ');

    return (
        <div
            onClick={() => {
                setOpen(v => !v);
            }}
            ref={wrapperRef}>
            <FieldBase
                {...props}
                density={density}
                elementClass="uui-select"
                onClick={() => {
                    setOpen(v => !v);
                }}
                placeholder={placeholder}
                readOnly
                trailing={ExpandIcon}
                value={displayValue}
            />
            {open &&
                renderPortal(
                    'select-root',
                    <div className="uui-popup-list" ref={listRef} style={dropdownStyle}>
                        <List
                            className="uui-select-list"
                            color="surfaceContainer"
                            density={density}
                            elevation={3}
                            onChange={handleChange}
                            type={multiple ? 'multiple' : 'single'}
                            value={currentValues}
                            variant="listbox">
                            {children}
                        </List>
                    </div>
                )}
        </div>
    );
};

Select.displayName = 'Select';
