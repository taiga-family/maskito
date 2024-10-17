import {DemoPath} from '@demo/constants';

export function openNumberPage(queryParams = ''): void {
    cy.visit(`/${DemoPath.Number}/API?${queryParams}`);
    cy.get('#demo-content input')
        .should('be.visible')
        .first()
        .focus()
        .clear()
        .as('input');
}
