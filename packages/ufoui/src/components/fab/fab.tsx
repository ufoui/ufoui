import { forwardRef } from 'react';

import { ButtonBase, ButtonBaseOwnProps, ButtonElement } from '../base';
import { PolymorphicComponent, PolymorphicProps } from '../../utils';

type FabButtonOwnProps = Omit<ButtonBaseOwnProps, 'avatar' | 'elementClass'> & {
    /** Collapses an extended FAB to its icons (needs one); the label stays as the accessible name. */
    collapsed?: boolean;
};

/**
 * Props for {@link Fab}.
 * Extends {@link ButtonBaseProps} except for `avatar`.
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
    ({ collapsed, elevation = 3, size = 'medium', shape = 'rounded', ...props }: FabButtonProps, ref) => {
        const elementClass = !(props.content ?? props.children ?? props.label)
            ? 'uui-fab'
            : collapsed && (props.icon ?? props.leading ?? props.trailing ?? props.endIcon)
              ? 'uui-fab uui-fab-collapsed'
              : 'uui-fab uui-fab-extended';
        return (
            <ButtonBase
                ref={ref}
                {...props}
                elementClass={elementClass}
                elevation={elevation}
                shape={shape}
                size={size}
            />
        );
    }
) as PolymorphicComponent<FabButtonOwnProps, 'button', ButtonElement>;

Fab.displayName = 'Fab';
