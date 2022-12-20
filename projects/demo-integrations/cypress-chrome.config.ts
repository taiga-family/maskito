import {defineConfig} from 'cypress';
import {CYPRESS_CONFIG} from './cypress.config';

export default defineConfig({
    ...CYPRESS_CONFIG,
    e2e: {
        ...CYPRESS_CONFIG.e2e,
        excludeSpecPattern: ['cypress/tests/electron-only/**/*.cy.ts'],
    },
});
