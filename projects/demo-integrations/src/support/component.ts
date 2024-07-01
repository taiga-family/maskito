import './assertions';
import './commands';
import 'cypress-real-events'; // https://github.com/cypress-io/cypress/issues/2839

import {mount} from 'cypress/angular';

declare global {
    namespace Cypress {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Chainable<Subject> {
            mount: typeof mount;
        }
    }
}

export const stableMount: typeof mount = (...mountArgs) =>
    mount(...mountArgs).then(async (mountResponse) =>
        mountResponse.fixture.whenStable().then(() => mountResponse),
    );

Cypress.Commands.add('mount', stableMount);
