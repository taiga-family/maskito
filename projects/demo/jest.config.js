module.exports = {
    preset: 'jest-preset-angular',
    testMatch: ['<rootDir>/**/*.spec.ts'],
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    coverageDirectory: '<rootDir>/../../coverage/demo',
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/**/*.spec.ts'],
    coverageReporters: ['html', 'lcov', 'json', 'text', 'lcov', 'clover'],
};
