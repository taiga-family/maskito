import {DemoPath} from '@demo/constants';

describe('Angular | Custom unmask handler', () => {
    beforeEach(() => {
        cy.visit(`/${DemoPath.Angular}/API`);

        cy.get('#unmask [automation-id="tui-doc-example"]').as('example');
        cy.get('@example').find('input').as('input');
        cy.get('@example').find('code').as('controlValue');
        cy.get('@example').find('button').as('patch');
    });

    it('initial textfield value', () => {
        cy.get('@input').should('have.value', '1.000,42');
    });

    it('initial control value', () => {
        cy.get('@input').should('have.ngControlValue', 1_000.42);
        cy.get('@controlValue').should('have.text', '1000.42');
    });

    it('textfield value after programmatic control patch', () => {
        cy.get('@patch').click();
        cy.get('@input').should('have.value', '1.234.567,89');
    });

    it('control value after programmatic control patch', () => {
        cy.get('@patch').click();
        cy.get('@input').should('have.ngControlValue', 1_234_567.89);
        cy.get('@controlValue').should('have.text', '1234567.89');
    });
});
