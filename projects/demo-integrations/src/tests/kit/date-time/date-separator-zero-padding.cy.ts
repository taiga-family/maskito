import {DemoPath} from '@demo/constants';

describe('DateTime | Date segment zero padding on separator insertion', () => {
    beforeEach(() => {
        cy.visit(`/${DemoPath.DateTime}/API?dateMode=dd%2Fmm%2Fyyyy`);
        cy.get('#demo-content input').should('be.visible').first().focus().as('input');
    });

    it('Type 1.1. => 01.01.|', () => {
        cy.get('@input')
            .type('1.1.')
            .should('have.value', '01.01.')
            .should('have.prop', 'selectionStart', '01.01.'.length)
            .should('have.prop', 'selectionEnd', '01.01.'.length);
    });
});
