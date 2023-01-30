import {DemoPath} from '@demo/path';

describe('@maskito/angular | DI-approach', () => {
    it('can detect run-time changes', () => {
        cy.visit(`/${DemoPath.Number}/API?precision=2&decimalZeroPadding=false`);
        initialize();

        cy.get('@input')
            .type('42')
            .should('have.value', '42')
            .should('have.prop', 'selectionStart', '42'.length)
            .should('have.prop', 'selectionEnd', '42'.length);

        cy.get('tr')
            .contains('[decimalZeroPadding]')
            .parents('tr')
            .find('tui-toggle')
            .click();

        cy.get('@input').should('have.value', '42,00');
    });
});

function initialize(): void {
    cy.get('#demo-content input').should('be.visible').first().focus().as('input');
}
