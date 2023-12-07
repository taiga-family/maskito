const nxPreset = require('@nx/jest/preset').default;
const {resolve} = require('path');

module.exports = {
    ...nxPreset,
    globals: {
        'ts-jest': {
            tsconfig: resolve(__dirname, 'tsconfig.spec.json'),
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
