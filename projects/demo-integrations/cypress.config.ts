import {nxComponentTestingPreset} from '@nx/angular/plugins/component-testing';
import {nxE2EPreset} from '@nx/cypress/plugins/cypress-preset';
import {defineConfig} from 'cypress';

export const CYPRESS_CONFIG: Cypress.ConfigOptions = {
    video: false,
    fixturesFolder: 'src/fixtures',
    viewportWidth: 500,
    viewportHeight: 900,
    responseTimeout: 60000,
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,
    e2e: {
        ...nxE2EPreset(__filename, {cypressDir: 'src'}),
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            return require('./src/plugins/index.js')(on, config);
        },
        baseUrl: 'http://localhost:3333',
        specPattern: 'src/tests/!(component-testing)/**/*.cy.ts',
    },
    component: {
        ...nxComponentTestingPreset(__filename),
        supportFile: 'src/support/component.ts',
        indexHtmlFile: 'src/support/component-index.html',
        specPattern: 'src/tests/component-testing/**/*.cy.ts',
        // No need to recompile empty sandbox before each test spec
        justInTimeCompile: false,
    },
};

export default defineConfig(CYPRESS_CONFIG);
