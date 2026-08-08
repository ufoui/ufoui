import { forwardRef, useState } from 'react';

import { FieldBase, FieldBaseProps } from '../base/fieldBase';
import { IconButton } from '../iconButton/iconButton';
import { VisibilityIcon, VisibilityOffIcon } from '../../assets';

/**
 * Props for {@link PasswordField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category PasswordField
 */
export interface PasswordFieldProps extends Omit<FieldBaseProps, 'elementClass' | 'type' | 'multiline' | 'lines'> {
    /** When true, renders the control that reveals the password. */
    showReveal?: boolean;

    /** Accessible label of the reveal control while the password is hidden. Default: Show password */
    revealLabel?: string;

    /** Accessible label of the reveal control while the password is revealed. Default: Hide password */
    concealLabel?: string;
}

/**
 * Password field component used to enter secure text input.
 *
 * Use for authentication and protected form data.
 *
 * @category PasswordField
 * @function
 * @param props - All field props inherited from {@link FieldBase}.
 *
 * @example
 * <PasswordField label="Label" />
 *
 * @example
 * <PasswordField required />
 *
 * @example
 * <PasswordField label="Password" showReveal />
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>((props: PasswordFieldProps, ref) => {
    const {
        showReveal = true,
        revealLabel = 'Show password',
        concealLabel = 'Hide password',
        endIcon,
        ...other
    } = props;
    const [revealed, setRevealed] = useState(false);
    const revealButton = showReveal && (
        <IconButton
            aria-label={revealed ? concealLabel : revealLabel}
            aria-pressed={revealed}
            icon={revealed ? VisibilityOffIcon : VisibilityIcon}
            onClick={() => {
                setRevealed(value => !value);
            }}
        />
    );

    const finalEndIcon = revealButton ? (
        <>
            {endIcon}
            {revealButton}
        </>
    ) : (
        endIcon
    );

    return (
        <FieldBase
            ref={ref}
            {...other}
            elementClass="uui-password-field"
            endIcon={finalEndIcon}
            type={revealed ? 'text' : 'password'}
        />
    );
});

PasswordField.displayName = 'PasswordField';
