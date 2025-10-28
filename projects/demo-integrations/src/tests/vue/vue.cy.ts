import {DemoPath} from '@demo/constants';

describe('@maskito/vue | Basic', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Vue);
        cy.get('#example input').should('be.visible').clear().as('input');
    });

    it('rejects invalid characters', () => {
        cy.get('@input').type('1a2b3c').should('have.value', '123');
    });

    it('accepts valid digits', () => {
        cy.get('@input').type('123456789').should('have.value', '123_456_789');
    });
});
