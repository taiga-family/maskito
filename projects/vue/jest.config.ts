export default {
    displayName: 'vue',
    preset: '../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/projects/vue',
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    },
};
