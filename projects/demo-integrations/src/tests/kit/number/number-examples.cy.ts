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

    describe('Example "Thousand separator pattern" (Japanese yen, manual)', () => {
        beforeEach(() => {
            cy.get('#thousand-separator-pattern input')
                .should('be.visible')
                .first()
                .focus()
                .clear()
                .as('input');
        });

        it('groups 8 digits in sets of 4: ¥1234,5678', () => {
            cy.get('@input').type('12345678').should('have.value', '¥1234,5678');
        });

        it('groups 9 digits in sets of 4: ¥1,2345,6789', () => {
            cy.get('@input').type('123456789').should('have.value', '¥1,2345,6789');
        });

        it('regroups after backspace: ¥1,2345,6789 => ¥1234,5678', () => {
            cy.get('@input')
                .type('123456789')
                .type('{backspace}')
                .should('have.value', '¥1234,5678');
        });
    });

    describe('Example "Thousand separator pattern uses Intl.NumberFormat" (Indian, via Intl)', () => {
        beforeEach(() => {
            cy.get('#thousand-separator-pattern-intl input')
                .should('be.visible')
                .first()
                .focus()
                .clear()
                .as('input');
        });

        it('groups 7 digits as 2+2+3 from right: ₹12,34,567', () => {
            cy.get('@input').type('1234567').should('have.value', '₹12,34,567');
        });

        it('regroups after backspace: ₹12,34,567 => ₹1,23,456', () => {
            cy.get('@input')
                .type('1234567')
                .type('{backspace}')
                .should('have.value', '₹1,23,456');
        });

        it('groups 9 digits as 3+2+2+2 from right: ₹12,34,56,789', () => {
            cy.get('@input').type('123456789').should('have.value', '₹12,34,56,789');
        });
    });
});
