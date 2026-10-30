import { forwardRef, ReactNode } from 'react';

import { Fieldset, FieldsetProps } from '../fieldset/fieldset';

/**
 * Props for the RadioGroup component.
 *
 * @category RadioGroup
 */
export interface RadioGroupProps extends Omit<FieldsetProps, 'selection' | 'role'> {
    /** Shared name attribute for all radio buttons in the group. */
    name: string;

    /** Radio buttons rendered inside the group. */
    children: ReactNode;
}

/**
 * Groups related radio buttons into a single selectable set.
 *
 * Supports controlled and uncontrolled usage.
 *
 * @remarks
 * Alias of {@link Fieldset} with `selection="single"` and `role="radiogroup"`.
 *
 * @category RadioGroup
 * @function
 * @param props Component properties.
 *
 * @example
 * // Uncontrolled
 * <RadioGroup name="options" defaultValue="a">
 *   <Radio value="a" label="Option A" />
 *   <Radio value="b" label="Option B" />
 * </RadioGroup>
 *
 * @example
 * // Controlled
 * const [value, setValue] = useState('a');
 *
 * <RadioGroup name="options" value={value} onChange={v => setValue(v[0])}>
 *   <Radio value="a" label="Option A" />
 *   <Radio value="b" label="Option B" />
 * </RadioGroup>
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>((props, ref) => (
    <Fieldset ref={ref} role="radiogroup" selection="single" {...props} />
));

RadioGroup.displayName = 'RadioGroup';
