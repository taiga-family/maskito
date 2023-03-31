import {DemoPath} from '@demo/path';

describe('Prefix | Dynamic Pattern Mask Expression', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Prefix);
        cy.get('#by-pattern-mask-expression input')
            .should('be.visible')
            .first()
            .should('have.value', '')
            .focus()
            .as('input');
    });

    it('Empty input => $ => $', () => {
        cy.get('@input')
            .type('$')
            .should('have.value', '$')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1);
    });

    it('Empty input => Type 42 => $42|', () => {
        cy.get('@input')
            .type('42')
            .should('have.value', '$42')
            .should('have.prop', 'selectionStart', '$42'.length)
            .should('have.prop', 'selectionEnd', '$42'.length);
    });

    it('$42| => Backspace => $4|', () => {
        cy.get('@input')
            .type('42')
            .type('{backspace}')
            .should('have.value', '$4')
            .should('have.prop', 'selectionStart', '$4'.length)
            .should('have.prop', 'selectionEnd', '$4'.length);
    });

    it('$4| => Backspace => Empty input', () => {
        cy.get('@input')
            .type('4')
            .type('{backspace}')
            .should('have.value', '')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0);
    });

    describe('cannot erase prefix if there are digits after it', () => {
        it('via Backspace', () => {
            cy.get('@input')
                .type('42')
                .type('{moveToStart}{rightArrow}')
                .type('{backspace}')
                .should('have.value', '$42')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('via Delete', () => {
            cy.get('@input')
                .type('42')
                .type('{moveToStart}')
                .type('{del}')
                .should('have.value', '$42')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });
    });

    describe('rejects extra prefix (dollar sign)', () => {
        it('Empty input => $$$$$ => $', () => {
            cy.get('@input')
                .type('$$$$$')
                .should('have.value', '$')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('Empty input => $42$ => $42|', () => {
            cy.get('@input')
                .type('$42$')
                .should('have.value', '$42')
                .should('have.prop', 'selectionStart', '$42'.length)
                .should('have.prop', 'selectionEnd', '$42'.length);
        });
    });
});
