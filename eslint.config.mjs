import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import sonarjs from 'eslint-plugin-sonarjs';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier';
import tailwindcss from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import tsdoc from 'eslint-plugin-tsdoc';
import noSecrets from 'eslint-plugin-no-secrets';
import preferArrow from 'eslint-plugin-prefer-arrow-functions';
import filenameRules from 'eslint-plugin-filename-rules';
import reactRefresh from 'eslint-plugin-react-refresh';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
    {
        ignores: ['dist', 'node_modules', '.eslintrc.cjs', 'vite.config.ts', '**/*.config.*'],
    },
    js.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: path.resolve(__dirname, 'tsconfig.eslint.json').replace(/\\/g, '/'),
                ecmaVersion: 2021,
                sourceType: 'module',
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
            import: importPlugin,
            sonarjs,
            jest,
            prettier,
            tailwindcss,
            'unused-imports': unusedImports,
            tsdoc,
            'no-secrets': noSecrets,
            'prefer-arrow-functions': preferArrow,
            'filename-rules': filenameRules,
            'react-refresh': reactRefresh,
        },
        settings: {
            react: { version: 'detect' },
            jest: { version: 27 },
            'import/resolver': {
                typescript: { project: './tsconfig.json' },
            },
        },
        rules: {
            '@typescript-eslint/array-type': 'off',
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-return': 'warn',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-var-requires': 'warn',
            '@typescript-eslint/require-await': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/naming-convention': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'warn',
            '@typescript-eslint/no-use-before-define': 'warn',
            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/prefer-optional-chain': 'warn',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/no-shadow': 'warn',
            'no-shadow': 'off',
            'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
            'dot-notation': 'error',
            'no-else-return': 'error',
            'no-floating-decimal': 'error',
            'no-sequences': 'error',
            'array-bracket-spacing': 'error',
            'computed-property-spacing': ['error', 'never'],
            curly: 'error',
            'no-lonely-if': 'error',
            'no-unneeded-ternary': 'error',
            'one-var-declaration-per-line': 'error',
            quotes: ['error', 'single', { allowTemplateLiterals: false, avoidEscape: true }],
            'jsx-quotes': ['error', 'prefer-double'],
            'array-callback-return': 'off',
            'prefer-const': 'error',
            'no-unused-expressions': 'off',
            'no-prototype-builtins': 'off',
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'jsx-a11y/no-autofocus': [1, { 'ignoreNonDOM': true }],
            'react/no-deprecated': 'error',
            'react/no-unsafe': ['error', { checkAliases: true }],
            'react/jsx-sort-props': ['error', { ignoreCase: true }],
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'tailwindcss/no-custom-classname': 'off',
            'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
            'import/no-extraneous-dependencies': 'off',
            'sonarjs/no-duplicate-string': 'off',
            'sonarjs/cognitive-complexity': ['warn', 18],
            'sonarjs/no-extra-arguments': 'warn',
            'sonarjs/no-gratuitous-expressions': 'warn',
            'sonarjs/no-commented-code': 'warn',
            'sonarjs/no-dead-store': 'error',
            'sonarjs/no-unused-collection': 'error',
            'sonarjs/no-unused-vars': 'error',
            'sonarjs/pseudo-random': 'error',
            'sonarjs/no-redundant-assignments': 'error',
            'sonarjs/no-nested-conditional': 'error',
            'sonarjs/todo-tag': 'warn',
            'prettier/prettier': 'error',
            'react/jsx-props-no-spreading': 'off',
            'no-void': 'off',
            'react/require-default-props': 'off',
            'react/no-array-index-key': 'warn',
            'react/destructuring-assignment': 'warn',
            'react/no-unstable-nested-components': 'warn',
            'prefer-destructuring': 'warn',
            'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
            'global-require': 'warn',
            'no-restricted-globals': 'warn',
            'no-nested-ternary': 'warn',
            'no-undef': 'error',
            'react/forbid-prop-types': 'warn',
            'react/button-has-type': 'off',
            'react/jsx-no-bind': 'off',
            'react/jsx-no-constructed-context-values': 'warn',
            'react/no-unused-prop-types': 'warn',
            'react/jsx-no-useless-fragment': 'warn',
            'react/jsx-no-undef': 'warn',
            'jsx-a11y/control-has-associated-label': 'warn',
            'jsx-a11y/media-has-caption': 'off',
            'jsx-a11y/click-events-have-key-events': 'warn',
            'jsx-a11y/no-noninteractive-element-interactions': 'warn',
            'jsx-a11y/img-redundant-alt': 'warn',
            'jsx-a11y/label-has-associated-control': 'warn',
            'jsx-a11y/no-static-element-interactions': 'warn',
            'jsx-a11y/anchor-is-valid': 'warn',

            '@next/next/no-img-element': 'off',
            'react/function-component-definition': 'off',
            'spaced-comment': 'warn',
            camelcase: 'off',
            'react/prop-types': ['warn', { skipUndeclared: true }],
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
            'react/jsx-boolean-value': ['error', 'never'],
            'react/no-unknown-property': 'error',
            'react/display-name': 'error',
            'no-param-reassign': ['error', { props: true }],
            'no-multi-assign': 'error',
            eqeqeq: ['error', 'always'],
            'no-debugger': 'error',
            'unused-imports/no-unused-imports': 'warn',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            'import/no-unresolved': 'error',
            'import/no-cycle': 'error',
            'import/no-duplicates': 'warn',
            'import/prefer-default-export': 'off',
            'import/extensions': [
                'error',
                'ignorePackages',
                {
                    ts: 'never',
                    tsx: 'never',
                    js: 'never',
                    jsx: 'never',
                },
            ],
            'import/order': [
                'error',
                {
                    groups: [['builtin', 'external'], 'internal', ['sibling', 'parent', 'index']],
                    'newlines-between': 'always',
                },
            ],
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            'no-undef': 'off',
        },
    },
];
