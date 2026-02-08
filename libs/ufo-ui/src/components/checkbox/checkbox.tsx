import { forwardRef } from 'react';

import { CheckboxBase, CheckboxBaseProps } from '@ufoui/base/checkboxBase/checkboxBase';

import { BorderColor } from '../../utils/color';

const defCheckedIcon = (
    <svg fill="none" viewBox="3 3 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z" fill="currentColor" />
    </svg>
);

const defIndeterminateIcon = (
    <svg fill="none" viewBox="3 3 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 13V11H18V13H6Z" fill="currentColor" />
    </svg>
);

/**
 * Props for the Checkbox component.
 *
 * Extends {@link CheckboxBaseProps} with preset defaults
 * for checkbox-specific behavior.
 *
 * @category Checkbox
 */
export type CheckboxProps = Omit<CheckboxBaseProps, 'type' | 'elementClass'>;

/**
 * Checkbox component built on top of {@link CheckboxBase}.
 *
 * Provides default checkbox icons, filled style,
 * and sensible border defaults.
 *
 * @param props Component properties.
 * @function
 *
 * @example
 * <Checkbox label="Accept terms" />
 *
 * @example
 * <Checkbox
 *   label="Select all"
 *   indeterminate
 * />
 *
 * @category Checkbox
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            shape = 'smooth',
            border,
            uncheckedBorder,
            color,
            borderColor,
            animation,
            uncheckedBorderColor,
            uncheckedIcon,
            indeterminateIcon,
            indeterminate,
            icon,
            size = 'small',
            filled = true,
            ...props
        }: CheckboxProps,
        ref
    ) => {
        const finalColor = color ?? 'primary';
        const finalBorder = !icon && border === undefined ? undefined : border;
        let finalUncheckedBorder;
        if (indeterminate) {
            finalUncheckedBorder = border;
        } else {
            finalUncheckedBorder = !uncheckedIcon && uncheckedBorder === undefined ? (border ?? 2) : uncheckedBorder;
        }
        const finalBorderColor = borderColor ?? finalColor;
        const finalUncheckedBorderColor = uncheckedBorderColor ?? borderColor ?? ('onSurfaceVariant' as BorderColor);
        return (
            <CheckboxBase
                animation={animation ?? 'scale'}
                border={finalBorder}
                borderColor={finalBorderColor}
                color={finalColor}
                elementClass="uui-checkbox"
                filled={filled}
                icon={icon ?? defCheckedIcon}
                indeterminate={indeterminate}
                indeterminateIcon={indeterminateIcon ?? defIndeterminateIcon}
                ref={ref}
                shape={shape}
                size={size}
                type="checkbox"
                uncheckedBorder={finalUncheckedBorder}
                uncheckedBorderColor={finalUncheckedBorderColor}
                uncheckedIcon={uncheckedIcon}
                {...props}
            />
        );
    }
);

Checkbox.displayName = 'Checkbox';
