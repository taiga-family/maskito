import {DemoPath} from '@demo/path';

describe('Card', () => {
    describe('Input-card', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Card}`);
            cy.get('#Card input').should('be.visible').first().focus().as('input');
        });

        it('Card number input', () => {
            cy.get('@input')
                .type('1234567890123456')
                .should('have.value', '1234 5678 9012 3456')
                .type('9')
                .should('have.value', '1234 5678 9012 3456');
        });
    });

    describe('Expiration date', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Card}`);
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
            cy.visit(`/${DemoPath.Card}`);
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
