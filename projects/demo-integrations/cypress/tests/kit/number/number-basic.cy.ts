import {openNumberPage} from './utils';

describe('Number | Basic', () => {
    beforeEach(() => {
        openNumberPage('thousandSeparator=_&precision=2');
    });

    describe('Invalid characters', () => {
        it('rejects redundant spaces', () => {
            cy.get('@input')
                .type('1 2  3   4    5')
                .should('have.value', '12_345')
                .should('have.prop', 'selectionStart', '12_345'.length)
                .should('have.prop', 'selectionEnd', '12_345'.length);
        });

        it('rejects lowercase latin letters', () => {
            cy.get('@input')
                .type('123abcdefghijklmnopqrstuvwxyz456')
                .should('have.value', '123_456')
                .should('have.prop', 'selectionStart', '123_456'.length)
                .should('have.prop', 'selectionEnd', '123_456'.length);
        });

        it('rejects uppercase latin letters', () => {
            cy.get('@input')
                .type('123ABCDEFGHIJKLMNOPQRSTUVWXYZ456')
                .should('have.value', '123_456')
                .should('have.prop', 'selectionStart', '123_456'.length)
                .should('have.prop', 'selectionEnd', '123_456'.length);
        });

        it('rejects lowercase cyrillics letters', () => {
            cy.get('@input')
                .type('123авгдеёжзийклмнопрстуфхцчшщъыьэя456') // without "б" and "ю"
                .should('have.value', '123_456')
                .should('have.prop', 'selectionStart', '123_456'.length)
                .should('have.prop', 'selectionEnd', '123_456'.length);
        });

        it('rejects uppercase cyrillics letters', () => {
            cy.get('@input')
                .type('123АВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЯ456')
                .should('have.value', '123_456')
                .should('have.prop', 'selectionStart', '123_456'.length)
                .should('have.prop', 'selectionEnd', '123_456'.length);
        });

        it('rejects punctuation', () => {
            cy.get('@input')
                .type('123!"№%:;()456') // without dot and comma
                .should('have.value', '123_456')
                .should('have.prop', 'selectionStart', '123_456'.length)
                .should('have.prop', 'selectionEnd', '123_456'.length);
        });
    });

    describe('Decimal separator (symbol used to separate the integer part from the fractional part)', () => {
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

    describe('minus sign', () => {
        it('can type minus sign', () => {
            cy.get('@input')
                .type('-')
                .should('have.value', '-')
                .should('have.prop', 'selectionStart', '-'.length)
                .should('have.prop', 'selectionEnd', '-'.length);
        });

        it('can type "-111"', () => {
            cy.get('@input')
                .type('-111')
                .should('have.value', '-111')
                .should('have.prop', 'selectionStart', '-111'.length)
                .should('have.prop', 'selectionEnd', '-111'.length);
        });

        it('can type "-3333"', () => {
            cy.get('@input')
                .type('-3333')
                .should('have.value', '-3_333')
                .should('have.prop', 'selectionStart', '-3_333'.length)
                .should('have.prop', 'selectionEnd', '-3_333'.length);
        });

        it('can type "-123.45"', () => {
            cy.get('@input')
                .type('-123.45')
                .should('have.value', '-123,45')
                .should('have.prop', 'selectionStart', '-123,45'.length)
                .should('have.prop', 'selectionEnd', '-123,45'.length);
        });
    });
});
