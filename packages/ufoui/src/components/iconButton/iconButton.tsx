import { forwardRef, ReactNode } from 'react';

import { ButtonBase, ButtonBaseOwnProps, ButtonElement } from '../base';
import { PolymorphicComponent, PolymorphicProps } from '../../utils';

type IconButtonOwnProps = Omit<ButtonBaseOwnProps, 'avatar' | 'elementClass' | 'endIcon' | 'trailing'>;

/**
 * Props for {@link IconButton}.
 * Extends {@link ButtonBaseProps} except for text and trailing content.
 *
 * @category IconButton
 */
export type IconButtonProps<T extends ButtonElement = 'button'> = PolymorphicProps<T, IconButtonOwnProps>;

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
            label,
            children,
            content,
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
                content={loading ? undefined : content}
                elementClass="uui-icon-button"
                loading={loading}>
                {loading ? undefined : children}
            </ButtonBase>
        );
    }
) as PolymorphicComponent<IconButtonOwnProps, 'button', ButtonElement>;

IconButton.displayName = 'IconButton';
