/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    root: true,
    extends: ['plugin:@taiga-ui/experience/all'],
    overrides: [
        {
            files: ['projects/react/**/*.{js,ts,jsx,tsx}'],
            extends: ['@tinkoff/eslint-config-react'],
            rules: {
                'unicorn/filename-case': [
                    'error',
                    {
                        case: 'camelCase',
                    },
                ],
            },
        },
        {
            files: ['*'],
            rules: {
                '@typescript-eslint/quotes': ['error', 'single'],
                '@angular-eslint/pipe-prefix': 'off',
                '@taiga-ui/experience/strict-tui-doc-example': 'off',
                '@taiga-ui/experience/prefer-inject-decorator': 'off',
                '@taiga-ui/experience/no-typeof': 'off',
                '@typescript-eslint/naming-convention': 'off', // TODO
                '@typescript-eslint/consistent-type-assertions': 'off',
                'no-irregular-whitespace': 'off',
                'max-statements': 'off',
                'no-restricted-syntax': 'off', // TODO
            },
        },
        {
            files: ['*.spec.ts', '*.spec.tsx'],
            rules: {
                'no-undef': 'off',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: [require.resolve('./tsconfig.eslint.json')],
    },
};
