import { forwardRef, ReactNode } from 'react';

import { ButtonBase, ButtonBaseProps } from '@ufoui/core';

/**
 * Props for {@link IconButton}.
 * Extends {@link ButtonBaseProps} except for text and trailing content.
 *
 * @category IconButton
 */
export type IconButtonProps = Omit<ButtonBaseProps, 'elementClass' | 'endIcon' | 'trailing'>;

/**
 * Icon-only button used for compact or secondary actions.
 *
 * Use when an action is represented by an icon instead of text.
 * An accessible label (`aria-label` or `label`) is required.
 *
 * @category IconButton
 * @function
 * @param props - All icon button props inherited from {@link ButtonBase}.
 *
 * @example
 * <IconButton label="Add" icon={<AddIcon />} />
 *
 * @example
 * <IconButton aria-label="Close">
 *   <CloseIcon />
 * </IconButton>
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            'aria-label': ariaLabel,
            endIcon: _,
            trailing: __,
            loading,
            size = 'small',
            shape = 'round',
            label,
            title,
            children,
            ...props
        }: IconButtonProps & { endIcon?: ReactNode; trailing?: ReactNode },
        ref
    ) => {
        const altLabel = ariaLabel ?? label;
        return (
            <ButtonBase
                ref={ref}
                {...props}
                aria-label={altLabel}
                elementClass="uui-icon-button"
                loading={loading}
                shape={shape}
                size={size}
                title={title}>
                {!loading && children}
            </ButtonBase>
        );
    }
);

IconButton.displayName = 'IconButton';
