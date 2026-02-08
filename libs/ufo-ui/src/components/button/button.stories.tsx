import type { Meta, StoryObj } from '@storybook/react';
import { FaArrowRight } from 'react-icons/fa';

import { Button } from './button';
import type { ButtonProps } from './button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Renders a styled button using the base button system. Applies `uui-button` class for consistent theming.',
            },
        },
    },
    argTypes: {
        onClick: { table: { disable: true } },
        onChange: { table: { disable: true } },
        onBlur: { table: { disable: true } },
        onUploadChange: { table: { disable: true } },
        iconClass: { table: { disable: true } },
        elementClass: { table: { disable: true } },
        icon: { table: { disable: true } },

        iconEnabled: {
            control: 'boolean',
            name: 'Show icon',
        },

        color: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'black', 'white'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        shape: {
            control: 'select',
            options: ['rounded', 'round', 'rect'],
        },
        type: {
            control: 'select',
            options: ['button', 'submit', 'reset'],
        },
        elevation: {
            control: 'select',
            options: [0, 1, 2, 3, 4],
        },
        border: {
            control: 'select',
            options: [0, 1, 2, 3, 4],
        },

        outlined: { control: 'boolean' },
        filled: { control: 'boolean' },
        tonal: { control: 'boolean' },
        elevated: { control: 'boolean' },
        raised: { control: 'boolean' },
        disabled: { control: 'boolean' },
        upload: { control: 'boolean' },
        uploadMultiple: { control: 'boolean' },

        label: { control: 'text' },
        title: { control: 'text' },
        name: { control: 'text' },
        uploadAccept: { control: 'text' },
        children: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        iconEnabled: true,
        label: 'Click me',
        color: 'primary',
        size: 'medium',
        shape: 'rounded',
        elevation: 1,
        border: 1,
        outlined: false,
        filled: false,
        tonal: false,
        elevated: false,
        raised: false,
        disabled: false,
        upload: false,
        uploadMultiple: false,
        type: 'button',
        name: '',
        title: '',
        uploadAccept: '',
    },
    render: (args: ButtonProps & { iconEnabled?: boolean }) => {
        const { iconEnabled, ...rest } = args;
        return <Button {...rest} icon={iconEnabled ? <FaArrowRight /> : undefined} />;
    },
};
