import { forwardRef } from 'react';

import { ButtonBase, ButtonBaseProps } from '@ufoui/core';

export interface ToggleButtonProps extends Omit<ButtonBaseProps, 'filled' | 'controlClass' | 'iconClass'> {
    selected?: boolean;
    iconPosition?: 'start' | 'end';
}

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
    ({ selected = false, shape = 'rounded', size = 'medium', ...props }: ToggleButtonProps, ref) => {
        // const iconClass = `uui-icon-${size}`;
        const controlClass = `uui-toggle-button${selected ? ' uui-selected' : ''}`;

        return (
            <ButtonBase
                ref={ref}
                {...props}
                aria-pressed={selected}
                elementClass={controlClass}
                filled={selected}
                shape={shape}
                size={size}
            />
        );
    }
);

ToggleButton.displayName = 'ToggleButton';
