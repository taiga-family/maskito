describe('Server side rendering', () => {
    const baseUrl: string = Cypress.config('baseUrl') ?? '/';

    it('should serve statics and favicon.ico', () => {
        cy.request(`${baseUrl}/favicon.ico`).its('status').should('equal', 200);
    });

    it('should successfully render lazy url', () => {
        cy.request(`${baseUrl}/lazy`)
            .its('body')
            .should('include', 'This is a lazy route');
    });
});
