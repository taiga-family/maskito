import {BROWSER_SUPPORTS_REAL_EVENTS} from '../../../support/constants';
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
            openNumberPage('decimalSeparator=.&precision=2&decimalPseudoSeparators$=2');
        });

        it('accepts dot (as the last character)', () => {
            cy.get('@input')
                .type('123.')
                .should('have.value', '123.')
                .should('have.prop', 'selectionStart', '123.'.length)
                .should('have.prop', 'selectionEnd', '123.'.length);
        });

        it('accepts dot (in the middle)', () => {
            cy.get('@input')
                .type('42')
                .type('{leftArrow}')
                .type('.')
                .should('have.value', '4.2')
                .should('have.prop', 'selectionStart', '4.'.length)
                .should('have.prop', 'selectionEnd', '4.'.length);
        });

        it('accepts comma (as the last character) and transforms it to dot', () => {
            cy.get('@input')
                .type('123,')
                .should('have.value', '123.')
                .should('have.prop', 'selectionStart', '123.'.length)
                .should('have.prop', 'selectionEnd', '123.'.length);
        });

        it('accepts comma (in the middle) and transforms it to dot', () => {
            cy.get('@input')
                .type('42')
                .type('{leftArrow}')
                .type(',')
                .should('have.value', '4.2')
                .should('have.prop', 'selectionStart', '4.'.length)
                .should('have.prop', 'selectionEnd', '4.'.length);
        });

        it('rejects invalid characters', () => {
            cy.get('@input')
                .type('123')
                .type('{moveToStart}{rightArrow}')
                .type('F')
                .should('have.value', '123');
        });
    });

    describe('Attempt to enter decimal separator when it already exists in text field', () => {
        beforeEach(() => {
            openNumberPage('decimalSeparator=,&thousandSeparator=_&precision=2');
        });

        it('1|23,45 => Press comma (decimal separator) => 1|23,45 (no changes)', () => {
            cy.get('@input')
                .type('123,45')
                .type('{moveToStart}{rightArrow}')
                .type(',')
                .should('have.value', '123,45')
                .should('have.prop', 'selectionStart', '1'.length)
                .should('have.prop', 'selectionEnd', '1'.length);
        });

        it('1|23,45 => Press point (pseudo decimal separator) => 1|23,45 (no changes)', () => {
            cy.get('@input')
                .type('123.45')
                .type('{moveToStart}{rightArrow}')
                .type('.')
                .should('have.value', '123,45')
                .should('have.prop', 'selectionStart', '1'.length)
                .should('have.prop', 'selectionEnd', '1'.length);
        });

        it(
            '1|23,4|5 => Type decimal separator => 1,5',
            BROWSER_SUPPORTS_REAL_EVENTS,
            () => {
                cy.get('@input')
                    .type('123,45')
                    .realPress([
                        'ArrowLeft',
                        'Shift',
                        ...Array('23,4'.length).fill('ArrowLeft'),
                    ]);

                cy.get('@input')
                    .type(',')
                    .should('have.value', '1,5')
                    .should('have.prop', 'selectionStart', '1,'.length)
                    .should('have.prop', 'selectionEnd', '1,'.length);
            },
        );
    });
});
