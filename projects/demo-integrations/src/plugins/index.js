const {CYPRESS_CONFIG} = require('../../cypress.config');

module.exports = on => {
    on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
            launchOptions.args.push(
                `--window-size=${CYPRESS_CONFIG.viewportWidth},${CYPRESS_CONFIG.viewportHeight}`,
                '--force-device-scale-factor=2',
                '--high-dpi-support=1',
                '--disable-dev-shm-usage',
                '--incognito',
            );
        }

        if (browser.isHeadless) {
            launchOptions.args.push('--disable-gpu');
        }

        return launchOptions;
    });
};
