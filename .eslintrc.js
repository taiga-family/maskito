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
            files: ['*.{ts,tsx}'],
            rules: {
                'react/display-name': 'off',
                'react/react-in-jsx-scope': 'off',
                'no-irregular-whitespace': 'off',
            },
        },
        {
            files: ['*.spec.ts'],
            rules: {
                'jest/prefer-ending-with-an-expect': [
                    'error',
                    {
                        assertFunctionNames: ['expect', 'check'],
                    },
                ],
            },
        },
        {
            files: ['*.html'],
            rules: {
                '@angular-eslint/template/prefer-control-flow': 'off', // TODO
            },
        },
    ],
};
