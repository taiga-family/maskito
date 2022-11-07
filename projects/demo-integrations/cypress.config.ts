import {defineConfig} from 'cypress';

export const CYPRESS_CONFIG: Cypress.ConfigOptions = {
    video: false,
    fixturesFolder: 'cypress/fixtures',
    viewportWidth: 1440,
    viewportHeight: 900,
    responseTimeout: 60000,
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.js')(on, config);
        },
        baseUrl: 'http://localhost:4200',
        specPattern: 'cypress/tests/**/*.cy.ts',
    },
};

export default defineConfig(CYPRESS_CONFIG);
