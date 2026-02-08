const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.gray,
        white: '#fff',
        black: '#000',
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          DEFAULT: 'var(--uui-color-primary)',
          dark: 'var(--uui-color-primary-dark)',
          light: 'var(--uui-color-primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--uui-color-secondary)',
          dark: 'var(--uui-color-secondary-dark)',
          light: 'var(--uui-color-secondary-light)',
        },
        error: {
          DEFAULT: 'var(--uui-color-error)',
          dark: 'var(--uui-color-error-dark)',
          light: 'var(--uui-color-error-light)',
        },

        text: {
          primary: colors.white,
          secondary: colors.black,
          disabled: colors.gray['400'],
        },
        body: {
          DEFAULT: colors.white,
          dark: colors.black,
        },
        border: {
          DEFAULT: colors.black,
          dark: colors.white,
        },
      },
    },
  },
  plugins: [],
};
