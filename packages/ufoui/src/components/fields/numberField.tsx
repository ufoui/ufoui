import { forwardRef, ReactElement, useRef } from 'react';

import { FieldBase, FieldBaseProps } from '../base';
import { IconButton } from '../iconButton/iconButton';
import { CollapseIcon, ExpandIcon } from '../../assets';
import { mergeRefs } from '../../utils';

/**
 * Props for {@link NumberField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category NumberField
 */
export interface NumberFieldProps
    extends Omit<FieldBaseProps, 'elementClass' | 'type' | 'multiline' | 'lines' | 'maxLines'> {
    /** Lowest accepted value. */
    min?: number;

    /** Highest accepted value. */
    max?: number;

    /** Granularity of accepted values and of the stepper controls. Default: 1 */
    step?: number;

    /** When true, renders the controls that increment and decrement the value. */
    showStepper?: boolean;

    /** Icon of the control that increments the value. Default: CollapseIcon */
    incrementIcon?: ReactElement;

    /** Accessible label of the control that increments the value. Default: Increase value */
    incrementLabel?: string;

    /** Icon of the control that decrements the value. Default: ExpandIcon */
    decrementIcon?: ReactElement;

    /** Accessible label of the control that decrements the value. Default: Decrease value */
    decrementLabel?: string;
}

/**
 * Number field component used to enter numeric values.
 *
 * Use for quantities, amounts, and other number-based input.
 *
 * @category NumberField
 * @function
 * @param props - All field props inherited from {@link FieldBase}.
 *
 * @example
 * <NumberField label="Label" />
 *
 * @example
 * <NumberField required />
 *
 * @example
 * <NumberField label="Quantity" min={0} max={10} showStepper />
 */
export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>((props: NumberFieldProps, ref) => {
    const {
        showStepper = true,
        incrementIcon,
        incrementLabel = 'Increase value',
        decrementIcon,
        decrementLabel = 'Decrease value',
        endIcon,
        ...other
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const stepValue = (up: boolean) => {
        const input = inputRef.current;
        if (!input) {
            return;
        }
        if (up) {
            input.stepUp();
        } else {
            input.stepDown();
        }
        input.dispatchEvent(new Event('input', { bubbles: true }));
    };

    const stepperButtons = showStepper && !other.readOnly && (
        <>
            <IconButton
                aria-label={decrementLabel}
                icon={decrementIcon ?? ExpandIcon}
                onClick={() => {
                    stepValue(false);
                }}
            />
            <IconButton
                aria-label={incrementLabel}
                icon={incrementIcon ?? CollapseIcon}
                onClick={() => {
                    stepValue(true);
                }}
            />
        </>
    );

    const finalEndIcon = stepperButtons ? (
        <>
            {endIcon}
            {stepperButtons}
        </>
    ) : (
        endIcon
    );

    return (
        <FieldBase
            ref={mergeRefs(ref, inputRef)}
            {...other}
            elementClass="uui-number-field"
            endIcon={finalEndIcon}
            type="number"
        />
    );
});

NumberField.displayName = 'NumberField';
