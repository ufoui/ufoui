import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { Fieldset, FieldsetProps } from '../fieldset/fieldset';
import { RadioGroupContext } from '../../context';

/**
 * Props for the RadioGroup component.
 *
 * @category RadioGroup
 */
export interface RadioGroupProps
  extends Omit<
    FieldsetProps,
    'component' | 'elementClass' | 'defaultChecked' | 'onChange'
  > {
  /** Shared name attribute for all radio buttons in the group. */
  name: string;

  /** Initial selected value for uncontrolled usage. */
  defaultValue?: string;

  /** Controlled selected value. */
  value?: string;

  /** Called when the selected value changes. */
  onChange?: (value: string) => void;

  /** Radio buttons rendered inside the group. */
  children: ReactNode;
}

/**
 * Groups related radio buttons into a single selectable set.
 *
 * Supports controlled and uncontrolled usage.
 *
 * @category RadioGroup
 * @function
 * @param props RadioGroupProps
 *
 *
 * @example
 * // Uncontrolled
 * <RadioGroup name="options" defaultValue="a">
 *   <Radio value="a" label="Option A" />
 *   <Radio value="b" label="Option B" />
 * </RadioGroup>
 *
 *
 * @example
 * // Controlled
 * const [value, setValue] = useState('a');
 *
 * <RadioGroup name="options" value={value} onChange={setValue}>
 *   <Radio value="a" label="Option A" />
 *   <Radio value="b" label="Option B" />
 * </RadioGroup>
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      name,
      disabled,
      onChange,
      value,
      defaultValue,
      children,
      ...props
    }: RadioGroupProps,
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);

    const isControlled = value !== undefined;
    const groupValue = isControlled ? value : internalValue;

    const handleSetValue = useCallback(
      (v: string) => {
        if (!isControlled) {
          setInternalValue(v);
        }
        onChange?.(v);
      },
      [isControlled, onChange],
    );

    const contextValue = useMemo(
      () => ({ name, value: groupValue, setValue: handleSetValue, disabled }),
      [name, groupValue, handleSetValue, disabled],
    );
    return (
      <Fieldset disabled={disabled} ref={ref} {...props}>
        <RadioGroupContext.Provider value={contextValue}>
          {children}
        </RadioGroupContext.Provider>
      </Fieldset>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
