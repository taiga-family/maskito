import {DemoPath} from '@demo/constants';

describe('Plugins | Reject', () => {
    const original = 'none';
    const rejected = 'reject-0';

    beforeEach(() => {
        cy.visit(DemoPath.KitPlugins);
        cy.get('#reject input')
            .should('be.visible')
            .first()
            .should('have.value', '')
            .should('have.css', 'animation-name', original)
            .focus()
            .as('input');
    });

    it('Allows digits', () => {
        cy.get('@input')
            .type('1')
            .should('have.value', '1')
            .should('have.css', 'animation-name', original);
    });

    it('Rejects letters', () => {
        cy.get('@input')
            .type('1a')
            .should('have.value', '1')
            .should('have.css', 'animation-name', rejected);
    });
});
