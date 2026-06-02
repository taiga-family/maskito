import {DemoPath} from '@demo/constants';

const NBSP = '\u00A0';

describe('DateTime | locale', () => {
    describe('Documentation example (en-US locale)', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateTime}`);
            cy.get('#locale input').should('be.visible').first().focus().as('input');
        });

        it('displays pre-filled en-US value correctly', () => {
            cy.get('@input').should('have.value', `12/31/2024, 06:30${NBSP}PM`);
        });

        it('derives mm/dd/yyyy order, "/" separator and 12-hour meridiem from locale', () => {
            cy.get('@input')
                .clear()
                .type('31320260630p')
                .should('have.value', `31/02/2026, 06:30${NBSP}PM`);
        });

        it('inserts the locale separators automatically while typing', () => {
            cy.get('@input')
                .clear()
                .type('5')
                .should('have.value', ' 05')
                .type('3')
                .should('have.value', '05/03')
                .type('2026')
                .should('have.value', '05/10/2026')
                .type('2')
                .should('have.value', '05/10/2026, 02')
                .type('9')
                .should('have.value', '05/10/2026, 02:09')
                .type('a')
                .should('have.value', `05/10/2026, 02:09${NBSP}AM`);
        });

        it('rejects 13 as the first hour segment (12-hour format)', () => {
            cy.get('@input')
                .clear()
                .type('05102025')
                .should('have.value', '05/10/2025, ')
                .type('13')
                .should('have.value', '05/10/2025, 01:3');
        });
    });
});
