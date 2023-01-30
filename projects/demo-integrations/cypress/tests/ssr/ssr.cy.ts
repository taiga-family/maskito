import {DemoPath} from '@demo/path';

describe('Server side rendering', () => {
    const baseUrl: string = Cypress.config('baseUrl') ?? '/';

    it('should serve statics and favicon.ico', () => {
        cy.request(`${baseUrl}/favicon.ico`).its('status').should('equal', 200);
    });

    it('should successfully render lazy url', () => {
        cy.request(`${baseUrl}/${DemoPath.Time}`)
            .its('body')
            .should('include.match', /<h1.*>\s+Time/);
    });
});
