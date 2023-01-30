import {DemoPath} from '@demo/path';

import {openNumberPage} from './utils';

describe('Number | Decimal separator (symbol used to separate the integer part from the fractional part)', () => {
    describe('Decimal separator is a comma (default)', () => {
        beforeEach(() => {
            openNumberPage('decimalSeparator=,&thousandSeparator=_&precision=2');
        });

        it('accepts comma (as the last character)', () => {
            cy.get('@input')
                .type('123,')
                .should('have.value', '123,')
                .should('have.prop', 'selectionStart', '123,'.length)
                .should('have.prop', 'selectionEnd', '123,'.length);
        });

        it('accepts comma (in the middle)', () => {
            cy.get('@input')
                .type('42')
                .type('{leftArrow}')
                .type(',')
                .should('have.value', '4,2')
                .should('have.prop', 'selectionStart', '4,'.length)
                .should('have.prop', 'selectionEnd', '4,'.length);
        });

        it('accepts dot (as the last character) and transforms it to comma', () => {
            cy.get('@input')
                .type('123.')
                .should('have.value', '123,')
                .should('have.prop', 'selectionStart', '123,'.length)
                .should('have.prop', 'selectionEnd', '123,'.length);
        });

        it('accepts dot (in the middle) and transforms it to comma', () => {
            cy.get('@input')
                .type('42')
                .type('{leftArrow}')
                .type('.')
                .should('have.value', '4,2')
                .should('have.prop', 'selectionStart', '4,'.length)
                .should('have.prop', 'selectionEnd', '4,'.length);
        });

        it('accepts "б" (as the last character) and transforms it to comma', () => {
            cy.get('@input')
                .type('123б')
                .should('have.value', '123,')
                .should('have.prop', 'selectionStart', '123,'.length)
                .should('have.prop', 'selectionEnd', '123,'.length);
        });

        it('accepts "б" (in the middle) and transforms it to comma', () => {
            cy.get('@input')
                .type('42')
                .type('{leftArrow}')
                .type('б')
                .should('have.value', '4,2')
                .should('have.prop', 'selectionStart', '4,'.length)
                .should('have.prop', 'selectionEnd', '4,'.length);
        });

        it('accepts "Ю" (as the last character) and transforms it to comma', () => {
            cy.get('@input')
                .type('123Ю')
                .should('have.value', '123,')
                .should('have.prop', 'selectionStart', '123,'.length)
                .should('have.prop', 'selectionEnd', '123,'.length);
        });

        it('accepts "Ю" (in the middle) and transforms it to comma', () => {
            cy.get('@input')
                .type('42')
                .type('{leftArrow}')
                .type('Ю')
                .should('have.value', '4,2')
                .should('have.prop', 'selectionStart', '4,'.length)
                .should('have.prop', 'selectionEnd', '4,'.length);
        });
    });

    describe('Decimal separator is a dot', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Number}`);
            cy.get('#decimal-zero-padding input')
                .should('be.visible')
                .first()
                .focus()
                .clear()
                .as('input');

            // TODO https://github.com/Tinkoff/taiga-ui/issues/3474
            // openNumberPage('decimalSeparator=.&precision=2');
        });

        it('accepts dot (as the last character)', () => {
            cy.get('@input')
                .type('123.')
                .should('have.value', '123.00')
                .should('have.prop', 'selectionStart', '123.'.length)
                .should('have.prop', 'selectionEnd', '123.'.length);
        });

        it('accepts dot (in the middle)', () => {
            cy.get('@input')
                .type('42')
                .type('{leftArrow}')
                .type('.')
                .should('have.value', '4.20')
                .should('have.prop', 'selectionStart', '4.'.length)
                .should('have.prop', 'selectionEnd', '4.'.length);
        });

        it('accepts comma (as the last character) and transforms it to dot', () => {
            cy.get('@input')
                .type('123,')
                .should('have.value', '123.00')
                .should('have.prop', 'selectionStart', '123.'.length)
                .should('have.prop', 'selectionEnd', '123.'.length);
        });

        it('accepts comma (in the middle) and transforms it to dot', () => {
            cy.get('@input')
                .type('42')
                .type('{leftArrow}')
                .type(',')
                .should('have.value', '4.20')
                .should('have.prop', 'selectionStart', '4.'.length)
                .should('have.prop', 'selectionEnd', '4.'.length);
        });

        it('rejects invalid characters', () => {
            cy.get('@input')
                .type('123')
                .type('{moveToStart}{rightArrow}')
                .type('F')
                .should('have.value', '123.00');
        });
    });
});
