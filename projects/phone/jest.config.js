module.exports = {
    displayName: 'phone',
    preset: '../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/phone',
};
