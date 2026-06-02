import {DemoPath} from '@demo/constants';

describe('DateTime | locale', () => {
    describe('Documentation example (en-US locale)', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateTime}`);
            cy.get('#locale input').should('be.visible').first().focus().as('input');
        });

        it('displays the pre-filled en-US value correctly', () => {
            cy.get('@input').should('have.value', '12/31/2024, 06:30 PM');
        });

        it('derives mm/dd/yyyy order, "/" separator and PM meridiem from locale', () => {
            cy.get('@input')
                .clear()
                .type('3022026630p')
                .should('have.value', '03/02/2026, 06:30 PM');
        });

        it('derives the AM meridiem from locale', () => {
            cy.get('@input')
                .clear()
                .type('987654321a')
                .should('have.value', '09/08/7654, 03:21 AM');
        });

        it('accepts an uppercase meridiem letter', () => {
            cy.get('@input')
                .clear()
                .type('051020260630P')
                .should('have.value', '05/10/2026, 06:30 PM');
        });

        it('auto-inserts the locale separators while typing', () => {
            cy.get('@input')
                .clear()
                .type('2')
                .should('have.value', '02')
                .type('22')
                .should('have.value', '02/22')
                .type('2222')
                .should('have.value', '02/22/2222')
                .type('222')
                .should('have.value', '02/22/2222, 02:22')
                .type('p')
                .should('have.value', '02/22/2222, 02:22 PM');
        });

        it('zero-pads a single high digit and inserts the separator (month/day)', () => {
            cy.get('@input')
                .clear()
                .type('9')
                .should('have.value', '09')
                .type('9')
                .should('have.value', '09/09');
        });

        it('ignores non-digit characters in the date part', () => {
            cy.get('@input')
                .clear()
                .type('abc')
                .should('have.value', '')
                .type('05')
                .should('have.value', '05');
        });
    });
});
