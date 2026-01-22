export default {
    displayName: 'vue',
    preset: '../../jest.preset.js',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/projects/vue',
    testEnvironmentOptions: {customExportConditions: ['node', 'node-addons']},
};
