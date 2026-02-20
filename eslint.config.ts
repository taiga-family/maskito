import taiga from '@taiga-ui/eslint-plugin-experience-next';

export default [
    ...taiga.configs.recommended,
    {
        files: ['projects/react/**/*.{js,ts,jsx,tsx}'],
        rules: {'unicorn/filename-case': ['error', {case: 'camelCase'}]},
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
        files: ['*.spec.{ts,tsx}'],
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
            '@typescript-eslint/naming-convention': 'off',
            'markdown/fenced-code-language': 'off',
            'de-morgan/no-negated-conjunction': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            'package-json/valid-contributors': 'off',
            '@angular-eslint/no-async-lifecycle-method': 'off',
            'no-bitwise': 'off',
            'import/enforce-node-protocol-usage': 'off',
            'package-json/valid-scripts': 'off',
            'package-json/sort-collections': 'off',
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
            'import/no-duplicates': 'off',
            '@typescript-eslint/no-unnecessary-type-conversion': 'off',
            'unicorn/no-new-array': 'off',
            'unicorn/prefer-string-raw': 'off',
            '@typescript-eslint/consistent-type-exports': 'off',
            '@typescript-eslint/method-signature-style': 'off',
            '@typescript-eslint/strict-void-return': 'off',
        },
    },
];
