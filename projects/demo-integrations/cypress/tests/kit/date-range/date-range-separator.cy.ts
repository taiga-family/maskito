import {DemoPath} from '@demo/path';

describe('DateRange | Separator', () => {
    describe('/', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateRange}/API?separator=/`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('14/12/1997 – 09/07/2015', () => {
            cy.get('@input')
                .type('14121997972015')
                .should('have.value', '14/12/1997 – 09/07/2015');
        });

        it('rejects dot as separator', () => {
            cy.get('@input')
                .type('1412200011.')
                .should('have.value', '14/12/2000 – 11')
                .type('12.')
                .should('have.value', '14/12/2000 – 11/12');
        });
    });

    describe('-', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateRange}/API?separator=-`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('14-12-1997 – 09-07-2015', () => {
            cy.get('@input')
                .type('14121997972015')
                .should('have.value', '14-12-1997 – 09-07-2015');
        });

        it('rejects dot as separator', () => {
            cy.get('@input')
                .type('14')
                .should('have.value', '14')
                .type('12.')
                .should('have.value', '14-12');
        });
    });
});
