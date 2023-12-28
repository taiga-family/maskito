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

        it('rejects lowercase cyrillic letters', () => {
            cy.get('@input')
                .type('123авгдеёжзийклмнопрстуфхцчшщъыьэя456') // without "б" and "ю"
                .should('have.value', '123_456')
                .should('have.prop', 'selectionStart', '123_456'.length)
                .should('have.prop', 'selectionEnd', '123_456'.length);
        });

        it('rejects uppercase cyrillic letters', () => {
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

    describe('minus sign', () => {
        it('can type minus sign', () => {
            cy.get('@input')
                .type('−')
                .should('have.value', '−')
                .should('have.prop', 'selectionStart', '−'.length)
                .should('have.prop', 'selectionEnd', '−'.length);
        });

        it('replaces hyphen with minus sign', () => {
            cy.get('@input')
                .type('-')
                .should('have.value', '−')
                .should('have.prop', 'selectionStart', '−'.length)
                .should('have.prop', 'selectionEnd', '−'.length);
        });

        it('replaces en-dash with minus sign', () => {
            cy.get('@input')
                .type('–')
                .should('have.value', '−')
                .should('have.prop', 'selectionStart', '−'.length)
                .should('have.prop', 'selectionEnd', '−'.length);
        });

        it('replaces em-dash with minus sign', () => {
            cy.get('@input')
                .type('—')
                .should('have.value', '−')
                .should('have.prop', 'selectionStart', '−'.length)
                .should('have.prop', 'selectionEnd', '−'.length);
        });

        it('can type "−111" (minus)', () => {
            cy.get('@input')
                .type('−111')
                .should('have.value', '−111')
                .should('have.prop', 'selectionStart', '−111'.length)
                .should('have.prop', 'selectionEnd', '−111'.length);
        });

        it('can type "-3333" (hyphen)', () => {
            cy.get('@input')
                .type('-3333')
                .should('have.value', '−3_333')
                .should('have.prop', 'selectionStart', '−3_333'.length)
                .should('have.prop', 'selectionEnd', '−3_333'.length);
        });

        it('can type "–123.45" (en-dash)', () => {
            cy.get('@input')
                .type('–123.45')
                .should('have.value', '−123.45')
                .should('have.prop', 'selectionStart', '−123.45'.length)
                .should('have.prop', 'selectionEnd', '−123.45'.length);
        });

        it('can type "—0,12" (em-dash)', () => {
            cy.get('@input')
                .type('—0,12')
                .should('have.value', '−0.12')
                .should('have.prop', 'selectionStart', '−0.12'.length)
                .should('have.prop', 'selectionEnd', '−0.12'.length);
        });
    });

    it('"Backspace"-key does nothing when cursor at the START of element', () => {
        cy.get('@input')
            .type('111')
            .type('{moveToStart}')
            .type('{backspace}')
            .should('have.value', '111')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0)
            .type('{backspace}'.repeat(4))
            .should('have.value', '111')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0);
    });

    it('"Delete"-key does nothing when cursor at the END of element', () => {
        cy.get('@input')
            .type('111')
            .type('{moveToEnd}')
            .type('{del}')
            .should('have.value', '111')
            .should('have.prop', 'selectionStart', '111'.length)
            .should('have.prop', 'selectionEnd', '111'.length)
            .type('{del}'.repeat(4))
            .should('have.value', '111')
            .should('have.prop', 'selectionStart', '111'.length)
            .should('have.prop', 'selectionEnd', '111'.length);
    });
});
