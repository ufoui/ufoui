import { forwardRef, ReactElement } from 'react';

import { ButtonBase, ButtonBaseProps } from '../base';
import { cn } from '../../utils';

export type ChipType = 'assist' | 'filter' | 'input' | 'suggestion';

/**
 * Props for {@link Chip}.
 * Extends {@link ButtonBaseProps}.
 *
 * @category Chip
 */
export interface ChipProps extends Omit<ButtonBaseProps, 'elementClass' | 'type'> {
    /** Avatar placed in the leading slot. */
    avatar?: ReactElement;
    /** Defines the visual style and behavior of the chip. @default 'assist' */
    type?: ChipType;
}

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
);

Chip.displayName = 'Chip';
