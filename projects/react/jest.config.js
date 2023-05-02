const {resolve} = require('path');
module.exports = {
    displayName: 'react',
    preset: '../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/projects/react',
    globals: {
        'ts-jest': {
            tsconfig: resolve(__dirname, 'tsconfig.spec.json'),
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
