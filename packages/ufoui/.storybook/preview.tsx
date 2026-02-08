import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@ufoui/core';

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <ThemeProvider themeMode={context.globals.theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1e1e1e' },
      ],
    },
  },
  globals: {
    theme: 'light', // domyślny
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        showName: false,
        dynamicTitle: false,
      },
    },
  },
};

export default preview;
