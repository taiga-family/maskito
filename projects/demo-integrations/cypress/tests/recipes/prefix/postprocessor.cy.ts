import {DemoPath} from '@demo/path';

describe('Prefix | Postprocessor (maskitoPrefixPostprocessorGenerator)', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Prefix);
        cy.get('#by-postprocessor input')
            .should('be.visible')
            .first()
            .should('have.value', '')
            .as('input');
    });

    it('Empty input => Focus => $|', () => {
        cy.get('@input')
            .focus()
            .should('have.value', '$')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1);
    });

    it('$| => Blur => Empty input', () => {
        cy.get('@input')
            .focus()
            .should('have.value', '$')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1)
            .blur()
            .should('have.value', '');
    });

    it('Empty input => Focus + Type 42 => $42|', () => {
        cy.get('@input')
            .focus()
            .type('42')
            .should('have.value', '$42')
            .should('have.prop', 'selectionStart', '$42'.length)
            .should('have.prop', 'selectionEnd', '$42'.length);
    });

    it('$42| => Backspace => $4|', () => {
        cy.get('@input')
            .focus()
            .type('42')
            .type('{backspace}')
            .should('have.value', '$4')
            .should('have.prop', 'selectionStart', '$4'.length)
            .should('have.prop', 'selectionEnd', '$4'.length);
    });

    it('$4| => Backspace => $|', () => {
        cy.get('@input')
            .focus()
            .type('4')
            .type('{backspace}')
            .should('have.value', '$')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1);
    });

    describe('cannot erase prefix', () => {
        it('via Backspace (+ do not move caret behind prefix)', () => {
            cy.get('@input')
                .focus()
                .type('42')
                .type('{moveToStart}{rightArrow}')
                .type('{backspace}')
                .should('have.value', '$42')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1)
                .type('{moveToEnd}')
                .type('{backspace}'.repeat(5))
                .should('have.value', '$')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('via Delete', () => {
            cy.get('@input')
                .focus()
                .type('42')
                .type('{moveToStart}')
                .type('{del}')
                .should('have.value', '$42')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('via selectAll + delete', () => {
            cy.get('@input')
                .focus()
                .type('42')
                .type('{selectAll}{del}')
                .should('have.value', '$')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });
    });

    describe('rejects extra prefix (dollar sign)', () => {
        it('Empty input => $$$$$ => $', () => {
            cy.get('@input')
                .focus()
                .type('$$$$$')
                .should('have.value', '$')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('Empty input => $42$ => $42|', () => {
            cy.get('@input')
                .focus()
                .type('$42$')
                .should('have.value', '$42')
                .should('have.prop', 'selectionStart', '$42'.length)
                .should('have.prop', 'selectionEnd', '$42'.length);
        });
    });
});
