import { forwardRef, ReactElement } from 'react';

import { ElementFont, ElementSize } from '../../utils';
import { ButtonBase, ButtonBaseProps } from '../base';

export type ChipType = 'assist' | 'filter' | 'input' | 'suggestion';

export interface ChipProps extends Omit<ButtonBaseProps, 'elementClass' | 'iconClass' | 'labelClass' | 'type'> {
    /** Avatar placed in the leading slot. */
    avatar?: ReactElement;
    /** Defines the visual style and behavior of the chip. @default 'assist' */
    type?: ChipType;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
    (
        {
            font,
            size = 'small',
            shape = 'smooth',
            selectedShape = 'smooth',
            borderColor = 'outlineVariant',
            type,
            ...props
        }: ChipProps,
        ref
    ) => {
        const fontMap: Record<ElementSize, ElementFont> = {
            extraSmall: 'labelLarge',
            small: 'labelLarge',
            medium: 'titleMedium',
            large: 'headlineSmall',
            extraLarge: 'headlineLarge',
        };
        return (
            <ButtonBase
                borderColor={borderColor}
                font={font ?? fontMap[size]}
                ref={ref}
                selectedShape={selectedShape}
                {...props}
                elementClass="uui-chip"
                shape={shape}
                size={size}
            />
        );
    }
);

Chip.displayName = 'Chip';
