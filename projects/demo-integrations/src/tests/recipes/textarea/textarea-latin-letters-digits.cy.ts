import {DemoPath} from '@demo/constants';

describe('Textarea (mask latin letters + digits)', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Textarea);
        cy.get('#latin textarea[autocomplete="street-address"]')
            .should('be.visible')
            .should('have.value', '')
            .focus()
            .as('textArea');
    });

    describe('Line break (Enter)', () => {
        it('can insert line break at the beginning', () => {
            cy.get('@textArea')
                .type('{enter}')
                .type('Taiga UI')
                .should('have.value', '\nTaiga UI');
        });

        it('can insert line break at the end', () => {
            cy.get('@textArea')
                .type('Taiga')
                .type('{enter}')
                .type('UI')
                .should('have.value', 'Taiga\nUI');
        });

        it('can insert line break at the middle', () => {
            cy.get('@textArea')
                .type('TaigaUI')
                .type('{leftArrow}{leftArrow}')
                .type('{enter}')
                .should('have.value', 'Taiga\nUI');
        });

        it('can insert many line breaks', () => {
            cy.get('@textArea')
                .type('Taiga')
                .type('{enter}{enter}{enter}')
                .type('UI')
                .should('have.value', 'Taiga\n\n\nUI');
        });

        it('`deleteSoftLineBackward` works', () => {
            cy.get('@textArea')
                .type('Taiga')
                .type('{enter}')
                .type('UI and Maskito')
                .trigger('beforeinput', {inputType: 'deleteSoftLineBackward'})
                .should('have.value', 'Taiga\n');
        });

        it('`deleteSoftLineForward` works', () => {
            cy.get('@textArea')
                .type('Taiga')
                .type('{enter}')
                .type('UI and Maskito')
                .type('{moveToStart}')
                .trigger('beforeinput', {inputType: 'deleteSoftLineForward'})
                .should('have.value', 'UI and Maskito');
        });
    });

    it('accepts spaces', () => {
        const TYPED_VALUE = '1 2  3   4    5';

        cy.get('@textArea').type(TYPED_VALUE).should('have.value', TYPED_VALUE);
    });

    it('rejects cyrillic symbols', () => {
        cy.get('@textArea')
            .type('123абвгдеёЖзийклмноGgпрстуфхцчшщъыьэюя456')
            .should('have.value', '123Gg456');
    });

    describe('Type `deleteWordBackward` of `InputEvent`', () => {
        const tests = [
            {initialValue: '1 34 678', newValue: '1 34 '},
            {initialValue: '1 34 ', newValue: '1 '},
            {initialValue: '1 34', newValue: '1 '},
            {initialValue: '1 ', newValue: ''},
            {initialValue: '1', newValue: ''},
        ] as const;

        tests.forEach(({initialValue, newValue}) => {
            it(`"${initialValue}|" => Ctrl + Backspace => "${newValue}|"`, () => {
                cy.get('@textArea')
                    .type(initialValue)
                    .type('{ctrl+backspace}')
                    .should('have.value', newValue)
                    .should('have.prop', 'selectionStart', newValue.length)
                    .should('have.prop', 'selectionEnd', newValue.length);
            });
        });
    });

    it('Type `deleteWordBackward` of `InputEvent`', () => {
        cy.get('@textArea')
            .type('1 34 678')
            .type('{moveToStart}')
            .type('{ctrl+del}')
            .should('have.value', ' 34 678')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0)
            .type('{ctrl+del}')
            .should('have.value', ' 678')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0)
            .type('{ctrl+del}')
            .should('have.value', '')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0);
    });
});
