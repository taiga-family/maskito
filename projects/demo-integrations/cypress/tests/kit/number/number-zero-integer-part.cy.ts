import {openNumberPage} from './utils';

describe('Number | Zero integer part', () => {
    describe('User types decimal separator when input is empty (decimalSeparator="," && precision=2)', () => {
        beforeEach(() => {
            openNumberPage(
                'thousandSeparator=_&decimalSeparator=,&precision=2&isNegativeAllowed=true',
            );
        });

        it('Empty input => Type "," (decimal separator) => value is equal "0,"', () => {
            cy.get('@input')
                .type(',')
                .should('have.value', '0,')
                .should('have.prop', 'selectionStart', '0,'.length)
                .should('have.prop', 'selectionEnd', '0,'.length);
        });

        it('Input has only minus sign => Type "," (decimal separator) => value is equal "-0,|"', () => {
            cy.get('@input')
                .type('-,')
                .should('have.value', '−0,')
                .should('have.prop', 'selectionStart', '−0,'.length)
                .should('have.prop', 'selectionEnd', '−0,'.length);
        });

        it('Empty input => Type "." (pseudo decimal separator) => value is equal "0,"', () => {
            cy.get('@input')
                .type('.')
                .should('have.value', '0,')
                .should('have.prop', 'selectionStart', '0,'.length)
                .should('have.prop', 'selectionEnd', '0,'.length);
        });

        it('Input has only minus sign => Type "." (pseudo decimal separator) => value is equal "-0,|"', () => {
            cy.get('@input')
                .type('-.')
                .should('have.value', '−0,')
                .should('have.prop', 'selectionStart', '−0,'.length)
                .should('have.prop', 'selectionEnd', '−0,'.length);
        });

        it('Empty input => Type "ю" (pseudo decimal separator) => value is equal "0,"', () => {
            cy.get('@input')
                .type('ю')
                .should('have.value', '0,')
                .should('have.prop', 'selectionStart', '0,'.length)
                .should('have.prop', 'selectionEnd', '0,'.length);
        });

        it('Empty input => Type "ю" (pseudo decimal separator) => value is equal "-0,"', () => {
            cy.get('@input')
                .type('-ю')
                .should('have.value', '−0,')
                .should('have.prop', 'selectionStart', '−0,'.length)
                .should('have.prop', 'selectionEnd', '−0,'.length);
        });
    });

    describe('value cannot start with many leading zeroes', () => {
        it('precision = 2 & positive number', () => {
            openNumberPage('precision=2');

            cy.get('@input')
                .type('0000000')
                .should('have.value', '0')
                .should('have.prop', 'selectionStart', '0'.length)
                .should('have.prop', 'selectionEnd', '0'.length);
        });

        it('precision = 2 & negative number', () => {
            openNumberPage('precision=2');

            cy.get('@input')
                .type('-00000006')
                .should('have.value', '−6')
                .should('have.prop', 'selectionStart', '−6'.length)
                .should('have.prop', 'selectionEnd', '−6'.length);
        });

        it('precision = 0', () => {
            openNumberPage('precision=0');

            cy.get('@input')
                .type('0000000')
                .should('have.value', '0')
                .should('have.prop', 'selectionStart', '0'.length)
                .should('have.prop', 'selectionEnd', '0'.length);
        });

        it('1|-000-000 => Backspace => 0', () => {
            openNumberPage('thousandSeparator=_&precision=2');

            cy.get('@input')
                .type('1000000')
                .should('have.value', '1_000_000')
                .type('{moveToStart}{rightArrow}')
                .type('{backspace}')
                .should('have.value', '0')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });
    });

    it('remove leading zeroes when decimal separator is removed (positive number)', () => {
        openNumberPage('decimalSeparator=,&precision=5');

        cy.get('@input')
            .type('0,0005')
            .type('{moveToStart}{rightArrow}{rightArrow}')
            .type('{backspace}')
            .should('have.value', '5')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0);
    });

    it('remove leading zeroes when decimal separator is removed (negative number)', () => {
        openNumberPage('decimalSeparator=,&precision=5');

        cy.get('@input')
            .type('-0,0005')
            .type('{moveToStart}')
            .type('{rightArrow}'.repeat('-0,'.length))
            .type('{backspace}')
            .should('have.value', '−5')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1);
    });
});
