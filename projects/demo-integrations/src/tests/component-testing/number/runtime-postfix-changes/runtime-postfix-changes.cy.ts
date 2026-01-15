import {Sandbox} from './sandbox.component';

describe('Number | runtime changes of postfix', () => {
    describe('year & years', () => {
        beforeEach(() => {
            cy.mount(Sandbox, {componentProperties: {value: '1 year'}});
            cy.get('input').focus().should('have.value', '1 year').as('input');
        });

        it('1| year => Type 0 => 10| years', () => {
            cy.get('@input')
                .type('{moveToStart}{rightArrow}')
                .type('0')
                .should('have.value', '10 years')
                .should('have.prop', 'selectionStart', '10'.length)
                .should('have.prop', 'selectionEnd', '10'.length);
        });

        it('1| year => Backspace => Empty', () => {
            cy.get('@input')
                .type('{moveToStart}{rightArrow}')
                .type('{backspace}')
                .should('have.value', '')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('10| years => Backspace => 1| year', () => {
            cy.get('@input')
                .type('{moveToStart}{rightArrow}')
                .type('0')
                .should('have.value', '10 years')
                .type('{backspace}')
                .should('have.value', '1 year')
                .should('have.prop', 'selectionStart', '1'.length)
                .should('have.prop', 'selectionEnd', '1'.length);
        });

        it('select all + delete', () => {
            cy.get('@input')
                .should('have.value', '1 year')
                .type('{selectAll}{del}')
                .should('have.value', '')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });
    });

    describe('mouse & mice (new postfix ends with the same characters as previous postfix; but has different beginning part)', () => {
        const pluralize = {
            '=NaN': '',
            '=1': ' mouse',
            other: ' mice',
        };

        it('10| mice => Backspace => 1 mouse', () => {
            cy.mount(Sandbox, {componentProperties: {pluralize, value: '10 mice'}});

            cy.get('input')
                .type('{moveToStart}')
                .type('{rightArrow}'.repeat(2))
                .type('{backspace}')
                .should('have.value', '1 mouse')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('1| mouse => Type 0 => 10| mice', () => {
            cy.mount(Sandbox, {componentProperties: {pluralize, value: '1 mouse'}});

            cy.get('input')
                .type('{moveToStart}')
                .type('{rightArrow}')
                .type('0')
                .should('have.value', '10 mice')
                .should('have.prop', 'selectionStart', 2)
                .should('have.prop', 'selectionEnd', 2);
        });
    });
});
