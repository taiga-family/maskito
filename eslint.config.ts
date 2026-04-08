import taiga from '@taiga-ui/eslint-plugin-experience-next';

export default [
    ...taiga.configs.recommended,
    {
        files: ['*.tsx'],
        rules: {
            'react/display-name': 'off',
            'react/react-in-jsx-scope': 'off',
            'no-irregular-whitespace': 'off',
        },
    },
    {
        files: ['*.spec.tsx'],
        rules: {
            'jest/prefer-ending-with-an-expect': [
                'error',
                {assertFunctionNames: ['expect', 'check']},
            ],
        },
    },
    // TODO: fix later
    {
        files: ['**/*'],
        rules: {
            '@typescript-eslint/no-unused-private-class-members': 'off',
            '@typescript-eslint/prefer-function-type': 'off',
            '@typescript-eslint/no-restricted-types': 'off',
            '@typescript-eslint/non-nullable-type-assertion-style': 'off',
            '@angular-eslint/template/alt-text': 'off',
            '@angular-eslint/prefer-signals': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',
            'no-irregular-whitespace': 'off',
            'de-morgan/no-negated-disjunction': 'off',
            '@angular-eslint/template/no-interpolation-in-attributes': 'off',
            '@typescript-eslint/no-invalid-this': 'off',
            '@angular-eslint/consistent-component-styles': 'off',
            '@typescript-eslint/no-useless-default-assignment': 'off',
            'import/consistent-type-specifier-style': 'off',
            '@typescript-eslint/no-unnecessary-type-conversion': 'off',
            '@typescript-eslint/consistent-type-exports': 'off',
            '@typescript-eslint/method-signature-style': 'off',
            '@typescript-eslint/strict-void-return': 'off',
        },
    },
];
