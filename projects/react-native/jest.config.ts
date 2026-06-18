/// <reference types="jest" />
/// <reference types="node" />
module.exports = {
    displayName: 'react-native',
    preset: '@react-native/jest-preset',
    resolver: '@nx/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
    moduleNameMapper: {'[.]svg$': '@nx/react-native/plugins/jest/svg-mock'},
    transform: {
        '^.+[.](js|ts|tsx)$': ['babel-jest', {configFile: `${__dirname}/.babelrc.js`}],
        '^.+[.](bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$':
            require.resolve('@react-native/jest-preset/jest/assetFileTransformer.js'),
    },
    transformIgnorePatterns: [
        'node_modules/(?!(.pnpm/.+/node_modules/)?(react-native|@react-native(-community)?)/)',
    ],
    coverageDirectory: '../../coverage/projects/react-native',
};
