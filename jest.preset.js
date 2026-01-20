const nxPreset = require('@nx/jest/preset').default;
const {resolve} = require('path');

module.exports = {
    ...nxPreset,
    transform: {
        '^.+\\.(ts|tsx|js|jsx|mjs|html|svg)$': [
            'jest-preset-angular',
            {
                diagnostics: true,
                stringifyContentPathRegex: String.raw`\.html$`,
                tsconfig: resolve(__dirname, 'tsconfig.spec.json'),
            },
        ],
    },
};
