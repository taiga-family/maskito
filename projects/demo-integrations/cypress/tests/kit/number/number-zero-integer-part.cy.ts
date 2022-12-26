import {openNumberPage} from './utils';

describe('Number | Zero integer part', () => {
    describe('User types decimal separator when input is empty (decimalSeparator="," && precision=2)', () => {
        beforeEach(() => {
            openNumberPage('thousandSeparator=-&decimalSeparator=,&precision=2');
        });

        it('Empty input => Type "," (decimal separator) => value is equal "0,"', () => {
            cy.get('@input')
                .type(',')
                .should('have.value', '0,')
                .should('have.prop', 'selectionStart', '0,'.length)
                .should('have.prop', 'selectionEnd', '0,'.length);
        });

        it('Empty input => Type "." (pseudo decimal separator) => value is equal "0,"', () => {
            cy.get('@input')
                .type('.')
                .should('have.value', '0,')
                .should('have.prop', 'selectionStart', '0,'.length)
                .should('have.prop', 'selectionEnd', '0,'.length);
        });

        it('Empty input => Type "ю" (pseudo decimal separator) => value is equal "0,"', () => {
            cy.get('@input')
                .type('ю')
                .should('have.value', '0,')
                .should('have.prop', 'selectionStart', '0,'.length)
                .should('have.prop', 'selectionEnd', '0,'.length);
        });
    });

    describe('value cannot start with many digits', () => {
        it('precision = 2', () => {
            openNumberPage('precision=2');

            cy.get('@input')
                .type('0000000')
                .should('have.value', '0')
                .should('have.prop', 'selectionStart', '0'.length)
                .should('have.prop', 'selectionEnd', '0'.length);
        });

        it('precision = 0', () => {
            openNumberPage('precision=0');

            cy.get('@input')
                .type('0000000')
                .should('have.value', '0')
                .should('have.prop', 'selectionStart', '0'.length)
                .should('have.prop', 'selectionEnd', '0'.length);
        });
    });

    it('remove leading zeroes when decimal separator is removed', () => {
        openNumberPage('decimalSeparator=,&precision=5');

        cy.get('@input')
            .type('0,0005')
            .type('{moveToStart}{rightArrow}{rightArrow}')
            .type('{backspace}')
            .should('have.value', '5')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0);
    });
});
