import {DemoPath} from 'projects/demo/src/app/app.routes';

describe('Angular FormControl and native input have the same values', () => {
    beforeEach(() => {
        cy.visit(`/${DemoPath.Time}/API`);

        cy.get('#demo-content button').should('contain', 'Form value').click();

        cy.get('#demo-content tui-expand pre.t-value')
            .should('be.visible')
            .as('controlValue');

        cy.get('#demo-content input').should('be.visible').first().focus().as('input');
    });

    it('on initialization', () => {
        cy.get('@input').should('have.value', '00:00');
        cy.get('@controlValue').should('contain', '00:00');
    });

    it('after input a new character', () => {
        cy.get('@input').type('{moveToStart}').type('2').should('have.value', '20:00');
        cy.get('@controlValue').should('contain', '20:00');
    });

    it('after input many new characters', () => {
        cy.get('@input').type('{moveToStart}').type('2359').should('have.value', '23:59');
        cy.get('@controlValue').should('contain', '23:59');
    });

    it('after delete via "Backspace"-button', () => {
        cy.get('@input')
            .type('{moveToStart}')
            .type('2359')
            .type('{backspace}')
            .should('have.value', '23:50');

        cy.get('@controlValue').should('contain', '23:50');
    });

    it('after delete via "Delete"-button', () => {
        cy.get('@input')
            .type('{moveToStart}')
            .type('2359')
            .type('{leftArrow}'.repeat(2))
            .type('{del}')
            .should('have.value', '23:09');

        cy.get('@controlValue').should('contain', '23:09');
    });

    it('after select all + "Backspace"-button', () => {
        cy.get('@input')
            .type('{moveToStart}')
            .type('2359')
            .type('{selectall}{backspace}')
            .should('have.value', '00:00');

        cy.get('@controlValue').should('contain', '00:00');
    });

    it('after select all + "Delete"-button', () => {
        cy.get('@input')
            .type('{moveToStart}')
            .type('2359')
            .type('{selectall}{del}')
            .should('have.value', '00:00');

        cy.get('@controlValue').should('contain', '00:00');
    });
});
