import {DemoPath} from '@demo/path';

describe('DateTime | Separator', () => {
    describe('/', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateTime}/API?separator=/`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('14/12/1997', () => {
            cy.get('@input').type('14121997').should('have.value', '14/12/1997');
        });

        it('rejects dot as separator', () => {
            cy.get('@input')
                .type('1412.')
                .should('have.value', '14/12')
                .type('2000')
                .should('have.value', '14/12/2000');
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

        it('14-12-1997', () => {
            cy.get('@input').type('14121997').should('have.value', '14-12-1997');
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
