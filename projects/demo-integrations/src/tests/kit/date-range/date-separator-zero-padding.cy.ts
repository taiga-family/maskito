import {DemoPath} from '@demo/constants';

describe('DateRange | Date segment zero padding on separator insertion', () => {
    const FIRST_DATE = '01.01.2000';

    beforeEach(() => {
        cy.visit(
            `/${DemoPath.DateRange}/API?mode=dd%2Fmm%2Fyyyy&dateSeparator=.&rangeSeparator=-`,
        );
        cy.get('#demo-content input')
            .should('be.visible')
            .first()
            .focus()
            .type('01012000')
            .should('have.value', FIRST_DATE)
            .as('input');
    });

    it('Type 1.1. for the second date => 01.01.|', () => {
        cy.get('@input')
            .type('1.1.')
            .should('have.value', `${FIRST_DATE}-01.01.`)
            .should('have.prop', 'selectionStart', `${FIRST_DATE}-01.01.`.length)
            .should('have.prop', 'selectionEnd', `${FIRST_DATE}-01.01.`.length);
    });
});
