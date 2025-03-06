import {DemoPath} from '@demo/constants';

describe('Plugins | Reject', () => {
    const original = 'reject--1';
    const rejected = 'reject-0';

    beforeEach(() => {
        cy.visit(DemoPath.KitPlugins);
        cy.get('#reject input')
            .should('be.visible')
            .first()
            .should('have.value', '')
            .focus()
            .as('input');
        cy.get('#reject tui-input')
            .should('have.css', 'animation-name', original)
            .as('control');
    });

    it('Allows digits', () => {
        cy.get('@input').type('1').should('have.value', '1');

        cy.get('@control').should('have.css', 'animation-name', original);
    });

    it('Rejects letters', () => {
        cy.get('@input').type('1a').should('have.value', '1');

        cy.get('@control').should('have.css', 'animation-name', rejected);
    });
});
