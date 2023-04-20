import {DemoPath} from '@demo/path';

describe('Postfix | Dynamic Pattern Mask Expression', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Postfix);
        cy.get('#by-pattern-mask-expression input')
            .should('be.visible')
            .first()
            .should('have.value', '')
            .focus()
            .as('input');
    });

    it('Empty input => Type 1 => 1|%', () => {
        cy.get('@input')
            .type('1')
            .should('have.value', '1%')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1);
    });

    it('Empty input => Type 10 => 10|%', () => {
        cy.get('@input')
            .type('10')
            .should('have.value', '10%')
            .should('have.prop', 'selectionStart', 2)
            .should('have.prop', 'selectionEnd', 2);
    });

    it('10|% => Backspace => 1|%', () => {
        cy.get('@input')
            .type('10')
            .type('{backspace}')
            .should('have.value', '1%')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1);
    });

    it('1|% => Backspace => Empty input', () => {
        cy.get('@input')
            .type('1')
            .type('{backspace}')
            .should('have.value', '')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0);
    });

    it('|53% => Delete => |3%', () => {
        cy.get('@input')
            .type('53')
            .type('{moveToStart}{del}')
            .should('have.value', '3%')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0);
    });

    it('|3% => Delete => Empty input', () => {
        cy.get('@input')
            .type('3')
            .type('{moveToStart}{del}')
            .should('have.value', '')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0);
    });

    it('cannot erase the % (by backspace)', () => {
        cy.get('@input')
            .type('42')
            .type('{moveToEnd}')
            .should('have.value', '42%')
            .should('have.prop', 'selectionStart', '42%'.length)
            .should('have.prop', 'selectionEnd', '42%'.length)
            .type('{backspace}')
            .should('have.value', '42%')
            .should('have.prop', 'selectionStart', '42'.length)
            .should('have.prop', 'selectionEnd', '42'.length);
    });

    it('cannot erase the % (by delete)', () => {
        cy.get('@input')
            .type('42')
            .type('{del}')
            .should('have.value', '42%')
            .should('have.prop', 'selectionStart', '42%'.length)
            .should('have.prop', 'selectionEnd', '42%'.length);
    });
});
