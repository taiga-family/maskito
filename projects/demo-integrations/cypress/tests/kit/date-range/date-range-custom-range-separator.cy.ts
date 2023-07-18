import {DemoPath} from '@demo/constants';

describe('DateRange | CustomRangeSeparator', () => {
    describe(' ~ ', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateRange}/API?rangeSeparator=~`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it.only('14.12.1997~09.07.2015', () => {
            cy.get('@input')
                .type('14121997972015')
                .should('have.value', '14.12.1997~09.07.2015');
        });
    });
});
