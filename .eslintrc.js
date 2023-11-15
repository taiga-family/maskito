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
                '@taiga-ui/experience/strict-tui-doc-example': 'off',
                '@taiga-ui/experience/prefer-inject-decorator': 'off',
                '@taiga-ui/experience/no-typeof': 'off',
                '@typescript-eslint/consistent-type-assertions': 'off',
                'no-irregular-whitespace': 'off',
                'no-restricted-syntax': 'off', // TODO
            },
        },
    ],
};
