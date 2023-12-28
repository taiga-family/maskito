import {DemoPath} from '@demo/constants';

describe('Documentation page "Number"', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Number);
    });

    describe('Example "Postfix"', () => {
        beforeEach(() => {
            cy.get('#postfix input').should('be.visible').first().as('input');
        });

        it('pads value without digits with zero on blur', () => {
            cy.get('@input')
                .focus()
                .should('have.prop', 'selectionStart', '97'.length)
                .should('have.prop', 'selectionEnd', '97'.length)
                .clear()
                .should('have.value', '%')
                .blur()
                .should('have.value', '0%');
        });
    });
});
