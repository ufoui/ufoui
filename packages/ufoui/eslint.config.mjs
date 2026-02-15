import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['@ufoui/*'],
              message:
                'Do not use package aliases inside this package. Use relative imports.',
            },
          ],
        },
      ],
    },
  },
];
