import './commands';

import {mount} from 'cypress/angular';

declare global {
    namespace Cypress {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Chainable<Subject> {
            mount: typeof mount;
        }
    }
}

Cypress.Commands.add('mount', mount);
