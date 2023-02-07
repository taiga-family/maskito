module.exports = {
    displayName: 'kit',
    preset: '../../jest.preset.js',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.spec.json',
        },
    },
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/kit',
};
