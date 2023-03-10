import {DemoPath} from '@demo/path';

describe('Postfix | Time', () => {
    beforeEach(() => {
        cy.visit(`/${DemoPath.Postfix}`);
        cy.get('#time input')
            .should('be.visible')
            .first()
            .should('have.value', '')
            .focus()
            .as('input');
    });

    it('Empty input => 1159 => 11:59| pm', () => {
        cy.get('@input')
            .type('1159')
            .should('have.value', '11:59 pm')
            .should('have.prop', 'selectionStart', '11:59'.length)
            .should('have.prop', 'selectionEnd', '11:59'.length);
    });

    it('11:59| pm => Backspace => 11:5', () => {
        cy.get('@input')
            .type('1159')
            .type('{backspace}')
            .should('have.value', '11:5')
            .should('have.prop', 'selectionStart', '11:5'.length)
            .should('have.prop', 'selectionEnd', '11:5'.length);
    });

    it('cannot erase the " pm" (by backspace)', () => {
        cy.get('@input')
            .type('1159')
            .type('{moveToEnd}')
            .should('have.value', '11:59 pm')
            .should('have.prop', 'selectionStart', '11:59 pm'.length)
            .should('have.prop', 'selectionEnd', '11:59 pm'.length)
            .type('{backspace}'.repeat(3))
            .should('have.value', '11:59 pm')
            .should('have.prop', 'selectionStart', '11:59'.length)
            .should('have.prop', 'selectionEnd', '11:59'.length);
    });

    it('cannot erase the " pm" (by delete)', () => {
        cy.get('@input')
            .type('1159')
            .type('{del}'.repeat(2))
            .should('have.value', '11:59 pm')
            .should('have.prop', 'selectionStart', '11:59 p'.length)
            .should('have.prop', 'selectionEnd', '11:59 p'.length);
    });
});
