export default {
    displayName: 'demo',
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    coverageDirectory: '../../coverage/demo',
    transform: {
        '^.+.(ts|mjs|js|html)$': 'jest-preset-angular',
    },
    transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
    ],
};
