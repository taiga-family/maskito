import {DemoPath} from '@demo/constants';

describe('DateTime | Separator', () => {
    describe('/', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateTime}/API?dateSeparator=/`);
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
                .type('1412')
                .should('have.value', '14/12')
                .type('2000')
                .should('have.value', '14/12/2000');
        });

        it('accepts date segment separators typed by user', () => {
            cy.get('@input')
                .type('24')
                .should('have.value', '24')
                .type('/')
                .should('have.value', '24/')
                .should('have.prop', 'selectionStart', '24/'.length)
                .should('have.prop', 'selectionEnd', '24/'.length)
                .type('05/')
                .should('have.value', '24/05/')
                .should('have.prop', 'selectionStart', '24/05/'.length)
                .should('have.prop', 'selectionEnd', '24/05/'.length);
        });
    });

    describe('-', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateTime}/API?dateSeparator=-`);
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
                .type('12')
                .should('have.value', '14-12');
        });
    });
});
