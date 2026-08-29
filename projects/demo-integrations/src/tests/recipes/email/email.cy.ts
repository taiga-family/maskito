import {DemoPath} from '@demo/constants';

describe('Email', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Email);
        cy.get('#email input')
            .should('be.visible')
            .first()
            .should('have.value', '')
            .focus()
            .as('input');
    });

    it('accepts an email and its intermediate states', () => {
        cy.get('@input').type('john@').should('have.value', 'john@');
        cy.get('@input').type('example.com').should('have.value', 'john@example.com');
    });

    it('strips mailto prefix on paste', () => {
        cy.get('@input')
            .paste('mailto:john@example.com')
            .should('have.value', 'john@example.com');
    });

    it('rejects at sign as the first character', () => {
        cy.get('@input').type('@').should('have.value', '');
    });

    it('rejects the second at sign', () => {
        cy.get('@input')
            .type('john@@example.com')
            .should('have.value', 'john@example.com');
    });

    it('rejects whitespace', () => {
        cy.get('@input')
            .type('john doe@example.com')
            .should('have.value', 'johndoe@example.com');
    });

    it('supports editing', () => {
        cy.get('@input')
            .type('john@example.com')
            .type('{backspace}'.repeat(4))
            .should('have.value', 'john@example');
    });
});
