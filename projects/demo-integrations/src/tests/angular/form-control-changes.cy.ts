import {DemoPath} from '@demo/constants';

describe('Angular FormControl and native input have the same values', () => {
    beforeEach(() => {
        cy.visit(`/${DemoPath.Time}/API?sandboxExpanded=true`);

        cy.get('#demo-content input').should('be.visible').first().focus().as('input');
    });

    it('on initialization', () => {
        cy.get('@input').should('have.value', '').should('have.ngControlValue', '');
    });

    it('after input a new character', () => {
        cy.get('@input')
            .type('{moveToStart}')
            .type('2')
            .should('have.value', '2')
            .should('have.ngControlValue', '2');
    });

    it('after input many new characters', () => {
        cy.get('@input')
            .type('{moveToStart}')
            .type('2359')
            .should('have.value', '23:59')
            .should('have.ngControlValue', '23:59');
    });

    it('after delete via "Backspace"-button', () => {
        cy.get('@input')
            .type('{moveToStart}')
            .type('2359')
            .type('{backspace}')
            .should('have.value', '23:5')
            .should('have.ngControlValue', '23:5');
    });

    it('after delete via "Delete"-button', () => {
        cy.get('@input')
            .type('{moveToStart}')
            .type('2359')
            .type('{leftArrow}'.repeat(2))
            .type('{del}')
            .should('have.value', '23:09')
            .should('have.ngControlValue', '23:09');
    });

    it('after select all + "Backspace"-button', () => {
        cy.get('@input')
            .type('{moveToStart}')
            .type('2359')
            .type('{selectall}{backspace}')
            .should('have.value', '')
            .should('have.ngControlValue', '');
    });

    it('after select all + "Delete"-button', () => {
        cy.get('@input')
            .type('{moveToStart}')
            .type('2359')
            .type('{selectall}{del}')
            .should('have.value', '')
            .should('have.ngControlValue', '');
    });
});
