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
            files: ['*.ts'],
            rules: {
                '@taiga-ui/experience/strict-tui-doc-example': 'off',
                '@taiga-ui/experience/prefer-inject-decorator': 'off',
                '@typescript-eslint/consistent-type-assertions': 'off',
            },
        },
    ],
};
