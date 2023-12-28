import {DemoPath} from '@demo/constants';

describe('@maskito/angular | Predicate', () => {
    it('can detect run-time changes', () => {
        cy.visit(DemoPath.Cypress);
        cy.get('#predicate input').should('be.visible').first().as('card');
        cy.get('#predicate input').should('be.visible').eq(1).as('name');

        cy.get('@card')
            .focus()
            .type('12341234abcd12341234')
            .should('have.value', '1234 1234 1234 1234');

        cy.get('@name').focus().type('12341234abcd12341234').should('have.value', 'ABCD');
    });
    it('supports asynchronous predicate', () => {
        cy.visit(DemoPath.Cypress);
        cy.get('#predicate #async-predicate input')
            .should('be.visible')
            .first()
            .as('card');

        cy.get('@card')
            .focus()
            .type('12341234abcd12341234')
            .should('have.value', '1234 1234 1234 1234');
    });
});
