import {DemoPath} from '@demo/constants';

describe('Date | Date segment zero padding on separator insertion', () => {
    describe('[mode]="dd.mm.yyyy"', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Date}/API?mode=dd%2Fmm%2Fyyyy&separator=.`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('Type 1.1. => 01.01.|', () => {
            cy.get('@input')
                .type('1.1.')
                .should('have.value', '01.01.')
                .should('have.prop', 'selectionStart', '01.01.'.length)
                .should('have.prop', 'selectionEnd', '01.01.'.length);
        });
    });

    describe('[mode]="yyyy/mm/dd"', () => {
        beforeEach(() => {
            cy.visit(
                `/${DemoPath.Date}/API?mode=${encodeURIComponent('yyyy/mm/dd')}&separator=${encodeURIComponent('/')}`,
            );
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('Type 2000/1/ => 2000/01/|', () => {
            cy.get('@input')
                .type('2000/1/')
                .should('have.value', '2000/01/')
                .should('have.prop', 'selectionStart', '2000/01/'.length)
                .should('have.prop', 'selectionEnd', '2000/01/'.length);
        });
    });
});
