import { ReactNode } from 'react';

import { FieldBaseProps } from '@ufoui/core';

/**
 * Props for {@link Select}.
 *
 * @category Field
 */
export interface SelectProps extends Omit<FieldBaseProps, 'elementClass' | 'value' | 'onChange'> {
    /** Current selected value. */
    value?: string | string[];

    /** Placeholder displayed when no value is selected. */
    placeholder?: string;

    /** Change handler called with the selected value. */
    onChange?: (value: string | string[] | undefined) => void;

    /** Enables multiple value selection. */
    multiple?: boolean;

    /** Makes the control read-only. */
    readOnly?: boolean;

    /** Custom renderer for the selected value. */
    renderValue?: (value: string | string[] | undefined) => ReactNode;

    /** Select options. */
    children?: ReactNode;
}

/**
 * **Select** – form control used to choose one or multiple values
 * from a predefined list of options.
 *
 * @param props
 *
 * @category Field
 * @function
 */
// export const Select = forwardRef<HTMLSelectElement, SelectProps>(
//     ({ value, placeholder, renderValue, children, ...props }, ref) => {
//         const content = value !== undefined ? (renderValue?.(value) ?? value) : placeholder;
//
//         return (
//             <FieldBase ref={ref} {...props} elementClass="uui-field">
//                 <div className="uui-select-value">{content}</div>
//                 {children}
//             </FieldBase>
//         );
//     }
// );
//
// Select.displayName = 'Select';
