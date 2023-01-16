import {DemoPath} from '@demo/routes';

export function openNumberPage(queryParams: string): void {
    cy.visit(`/${DemoPath.Number}/API?${queryParams}`);
    cy.get('#demo-content input')
        .should('be.visible')
        .first()
        .focus()
        .clear()
        .as('input');
}
