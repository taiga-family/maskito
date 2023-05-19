import {DemoPath} from '@demo/constants';

describe('Placeholder | CVC code', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Placeholder);
        cy.get('#cvc input')
            .should('be.visible')
            .first()
            .focus()
            .should('have.value', 'xxx')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0)
            .as('input');
    });

    it('Type 1 => 1|xx', () => {
        cy.get('@input')
            .type('1')
            .should('have.value', '1xx')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1);
    });

    it('Type 12 => 12|x', () => {
        cy.get('@input')
            .type('12')
            .should('have.value', '12x')
            .should('have.prop', 'selectionStart', 2)
            .should('have.prop', 'selectionEnd', 2);
    });

    it('Type 123 => 123|', () => {
        cy.get('@input')
            .type('123')
            .should('have.value', '123')
            .should('have.prop', 'selectionStart', 3)
            .should('have.prop', 'selectionEnd', 3);
    });

    it('12|3 => Backspace => 1|3x', () => {
        cy.get('@input')
            .type('123')
            .type('{leftArrow}{backspace}')
            .should('have.value', '13x')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1);
    });

    it('1|3x => Type 0 => 10|3', () => {
        cy.get('@input')
            .type('13')
            .type('{leftArrow}0')
            .should('have.value', '103')
            .should('have.prop', 'selectionStart', 2)
            .should('have.prop', 'selectionEnd', 2);
    });

    it('1xx => select all => backspace => xxx', () => {
        cy.get('@input')
            .type('1')
            .type('{selectAll}{backspace}')
            .should('have.value', 'xxx')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0);
    });

    it('1xx => select all => delete => xxx', () => {
        cy.get('@input')
            .type('1')
            .type('{selectAll}{del}')
            .should('have.value', 'xxx')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0);
    });

    it('1x|x => 1|xx', () => {
        cy.get('@input')
            .type('1')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1)
            .type('{rightArrow}')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1);
    });

    it('12|x => select all => |12|x', () => {
        cy.get('@input')
            .type('12')
            .should('have.prop', 'selectionStart', 2)
            .should('have.prop', 'selectionEnd', 2)
            .type('{selectAll}')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 2);
    });
});
