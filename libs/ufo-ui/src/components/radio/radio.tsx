import { forwardRef } from 'react';

import { BorderColor, CheckboxBase, CheckboxBaseProps } from '@ufoui/core';

const checkedIcon = (
    <svg fill="none" viewBox="2 2 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 17C13.3833 17 14.5625 16.5125 15.5375 15.5375C16.5125 14.5625 17 13.3833 17 12C17 10.6167 16.5125 9.4375 15.5375 8.4625C14.5625 7.4875 13.3833 7 12 7C10.6167 7 9.4375 7.4875 8.4625 8.4625C7.4875 9.4375 7 10.6167 7 12C7 13.3833 7.4875 14.5625 8.4625 15.5375C9.4375 16.5125 10.6167 17 12 17Z"
            fill="currentColor"
        />
    </svg>
);

/**
 * Props for the Radio component.
 *
 * Extends {@link CheckboxBaseProps} with radio-specific defaults
 * and removes indeterminate-related options.
 *
 * @category Radio
 */
export type RadioProps = Omit<CheckboxBaseProps, 'type' | 'elementClass' | 'indeterminateIcon' | 'indeterminate'>;

/**
 * Radio button component built on top of {@link CheckboxBase}.
 *
 * Provides radio-specific defaults, circular shape,
 * and checked icon rendering.
 *
 * @param props Component properties.
 * @function
 *
 * @example
 * <Radio label="Option A" />
 *
 * @example
 * <Radio
 *   label="Option B"
 *   checked
 * />
 *
 * @category Radio
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    (
        {
            uncheckedBorder,
            border,
            color,
            borderColor,
            uncheckedBorderColor,
            shape = 'round',
            size = 'small',
            filled = false,
            icon,
            uncheckedIcon,
            animation,
            ...props
        }: RadioProps,
        ref
    ) => {
        const finalColor = color ?? 'primary';
        const finalBorder = !icon && border === undefined ? 2 : border;
        const finalUncheckedBorder = uncheckedBorder ?? border ?? (uncheckedIcon ? undefined : 2);
        const finalBorderColor = borderColor ?? finalColor;
        const finalUncheckedBorderColor = uncheckedBorderColor ?? borderColor ?? ('onSurfaceVariant' as BorderColor);
        return (
            <CheckboxBase
                animation={animation ?? 'scale'}
                border={finalBorder}
                borderColor={finalBorderColor}
                color={finalColor}
                elementClass="uui-radio"
                filled={filled}
                icon={icon ?? checkedIcon}
                indeterminateIcon={undefined}
                ref={ref}
                shape={shape}
                size={size}
                type="radio"
                uncheckedBorder={finalUncheckedBorder}
                uncheckedBorderColor={finalUncheckedBorderColor}
                uncheckedIcon={uncheckedIcon}
                {...props}
            />
        );
    }
);

Radio.displayName = 'Radio';
