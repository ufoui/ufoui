import { forwardRef } from 'react';

import { ButtonBase, ButtonBaseOwnProps, ButtonElement } from '../base';
import { PolymorphicComponent, PolymorphicProps } from '../../utils';

type FabButtonOwnProps = Omit<ButtonBaseOwnProps, 'avatar' | 'elementClass'>;

/**
 * Props for {@link Fab}.
 * Extends {@link ButtonBaseProps}.
 *
 * @category Fab
 */
export type FabButtonProps<T extends ButtonElement = 'button'> = PolymorphicProps<T, FabButtonOwnProps>;

/**
 * Floating action button used for primary contextual actions.
 *
 * Use to highlight the main action on a screen, such as create, add,
 * or compose. Supports regular and extended variants (with label).
 *
 * @category Fab
 * @function
 * @param props - All FAB props inherited from {@link ButtonBase}.
 *
 * @example
 * <Fab icon={<AddIcon />} />
 *
 * @example
 * <Fab icon={<AddIcon />} label="Create" />
 */
export const Fab = forwardRef<HTMLButtonElement, FabButtonProps>(
    ({ elevation = 3, size = 'medium', shape = 'rounded', label, ...props }: FabButtonProps, ref) => {
        const elementClass = label ? 'uui-fab uui-fab-extended' : 'uui-fab';
        return (
            <ButtonBase
                ref={ref}
                {...props}
                elementClass={elementClass}
                elevation={elevation}
                label={label}
                shape={shape}
                size={size}
            />
        );
    }
) as PolymorphicComponent<FabButtonOwnProps, 'button', ButtonElement>;

Fab.displayName = 'Fab';
