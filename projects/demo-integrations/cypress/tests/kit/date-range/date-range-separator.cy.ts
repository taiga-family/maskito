import {DemoPath} from '@demo/constants';

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

    describe('dates separator', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateRange}/API?separator=/`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('14/12/1997 – ', () => {
            cy.get('@input')
                .type('14121997-')
                .should('have.value', '14/12/1997 – ')
                .should('have.prop', 'selectionStart', '14/12/1997 – '.length)
                .should('have.prop', 'selectionEnd', '14/12/1997 – '.length);
        });

        it('14/12/19 => "-" => 14/12/19', () => {
            cy.get('@input')
                .type('141219-')
                .should('have.value', '14/12/19')
                .should('have.prop', 'selectionStart', '14/12/19'.length)
                .should('have.prop', 'selectionEnd', '14/12/19'.length);
        });

        it('type date with all separators ', () => {
            cy.get('@input')
                .type('14/12/1997-14/12/1997')
                .should('have.value', '14/12/1997 – 14/12/1997')
                .should('have.prop', 'selectionStart', '14/12/1997 – 14/12/1997'.length)
                .should('have.prop', 'selectionEnd', '14/12/1997 – 14/12/1997'.length);
        });
    });
});
