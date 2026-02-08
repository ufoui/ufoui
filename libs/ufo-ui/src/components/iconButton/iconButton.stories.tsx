// iconButton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { ElementShape, ElementSize } from '@ufoui/utils'; // lub gdzie masz typy
import { ButtonBaseProps } from '@ufoui/core';

import { IconButton } from './iconButton';
import { SemanticColor } from '../../utils/color';

interface IconButtonVisibleProps extends ButtonBaseProps {
    icon: React.ReactNode;
    color?: SemanticColor;
    disabled?: boolean;
    size?: ElementSize;
    shape?: ElementShape;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const meta: Meta<typeof IconButton> = {
    title: 'Components/IconButton',
    component: IconButton,
    tags: ['autodocs'],
    argTypes: {
        icon: { control: 'text' },
        color: { control: 'select', options: ['primary', 'secondary'] },
        size: { control: 'select', options: ['small', 'medium', 'large'] },
        shape: { control: 'select', options: ['rounded', 'square'] },
        disabled: { control: 'boolean' },
    },
};

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
    args: {},
};
export default meta;
