import { forwardRef } from 'react';

import { ButtonBase, ButtonBaseOwnProps, ButtonElement } from '../base';
import { cn, PolymorphicComponent, PolymorphicProps } from '../../utils';

export type ChipType = 'assist' | 'filter' | 'input' | 'suggestion';

interface ChipOwnProps extends Omit<ButtonBaseOwnProps, 'animation' | 'elementClass' | 'open' | 'type'> {
    /** Defines the visual style and behavior of the chip. @default 'assist' */
    type?: ChipType;
}

/**
 * Props for {@link Chip}.
 * Extends {@link ButtonBaseProps}.
 *
 * @category Chip
 */
export type ChipProps<T extends ButtonElement = 'button'> = PolymorphicProps<T, ChipOwnProps>;

/**
 * Compact element for filters, choices, suggestions, or short actions.
 *
 * Use to represent tags, input tokens, or selectable filter options.
 * Supports toggle selection, leading icon, and trailing content.
 *
 * @category Chip
 * @function
 * @param props - All chip props inherited from {@link ButtonBase}.
 *
 * @example
 * <Chip label="Recent" toggle />
 *
 * @example
 * <Chip label="Person" icon={<PersonIcon />} trailing={<CloseIcon />} />
 */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
    (
        {
            shape = 'smooth',
            selectedShape = 'smooth',
            borderColor = 'outlineVariant',
            outlined = true,
            type = 'assist',
            ...props
        }: ChipProps,
        ref
    ) => {
        return (
            <ButtonBase
                borderColor={borderColor}
                outlined={outlined}
                ref={ref}
                selectedShape={selectedShape}
                {...props}
                elementClass={cn('uui-chip', `uui-chip-${type}`)}
                shape={shape}
            />
        );
    }
) as PolymorphicComponent<ChipOwnProps, 'button', ButtonElement>;

Chip.displayName = 'Chip';
