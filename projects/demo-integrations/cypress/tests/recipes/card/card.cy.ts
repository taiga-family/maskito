import {DemoPath} from '@demo/path';

describe('Card', () => {
    describe('Card number input', () => {
        beforeEach(() => {
            cy.visit(DemoPath.Card);
            cy.get('#Card input').should('be.visible').first().focus().as('input');
        });

        it('accepts 16-digits card number', () => {
            cy.get('@input')
                .type('1234567890123456')
                .should('have.value', '1234 5678 9012 3456');
        });

        it('accepts 18-digits card number', () => {
            cy.get('@input')
                .type('123456789012345678')
                .should('have.value', '1234 5678 9012 3456 78');
        });

        it('accepts 19-digits card number', () => {
            cy.get('@input')
                .type('1234567890123456789')
                .should('have.value', '1234 5678 9012 3456 789');
        });

        it('does not accept more than 19-digits', () => {
            cy.get('@input')
                .type('0'.repeat(25))
                .should('have.value', '0000 0000 0000 0000 000');
        });
    });

    describe('Expiration date', () => {
        beforeEach(() => {
            cy.visit(DemoPath.Card);
            cy.get('#Card input').should('be.visible').eq(2).focus().as('input');
        });

        it('input 321 => 03/21', () => {
            cy.get('@input')
                .type('321')
                .should('have.value', '03/21')
                .should('have.prop', 'selectionStart', '03/21'.length)
                .should('have.prop', 'selectionEnd', '03/21'.length);
        });
    });

    describe('CVV', () => {
        beforeEach(() => {
            cy.visit(DemoPath.Card);
            cy.get('#Card input').should('be.visible').eq(4).focus().as('input');
        });

        it('input 4321 => 432', () => {
            cy.get('@input')
                .type('4321')
                .should('have.value', '432')
                .should('have.prop', 'selectionStart', '432'.length)
                .should('have.prop', 'selectionEnd', '432'.length);
        });
    });
});
