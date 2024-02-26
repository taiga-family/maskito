import {PredicateTestComponent} from './predicate-test.component';

describe('@maskito/angular | Predicate', () => {
    beforeEach(() => {
        cy.mount(PredicateTestComponent);
    });
    it('can detect run-time changes', () => {
        cy.get('#predicate input')
            .first()
            .focus()
            .type('12341234abcd12341234')
            .should('have.value', '1234 1234 1234 1234');
        cy.get('#predicate input')
            .eq(1)
            .focus()
            .type('12341234abcd12341234')
            .should('have.value', 'ABCD');
    });
    it('supports asynchronous predicate', () => {
        cy.get('#async-predicate input').as('card');
        cy.get('@card')
            .focus()
            .type('12341234abcd12341234')
            .should('have.value', '1234 1234 1234 1234');
    });
});
