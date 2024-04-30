import {DemoPath} from '@demo/constants';

describe('DateRange | Strict mode', () => {
    describe('Disabled', () => {
        describe("doesn't fix wrong dates", () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.DateRange}/API?strict=false`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('30.02.2004 => 30.02.2004 - 31.02.2004', () => {
                cy.get('@input')
                    .type('30022004')
                    .should('have.value', '30.02.2004')
                    .type('31022004')
                    .should('have.value', '30.02.2004 – 31.02.2004');
            });

            it('29.02.2003 => 29.02.2003 - 31.04.2004', () => {
                cy.get('@input')
                    .type('29022003')
                    .should('have.value', '29.02.2003')
                    .type('31042004')
                    .should('have.value', '29.02.2003 – 31.04.2004');
            });

            it('31.06.2004 => 31.06.2004 - 31.09.2004', () => {
                cy.get('@input')
                    .type('31062004')
                    .should('have.value', '31.06.2004')
                    .type('31092004')
                    .should('have.value', '31.06.2004 – 31.09.2004');
            });
        });

        describe('swaps range ends with wrong dates', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.DateRange}/API?strict=false`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('31.02.2004 - 30.02.2004 => 30.02.2004 - 31.02.2004', () => {
                cy.get('@input')
                    .type('3102200430022004')
                    .should('have.value', '30.02.2004 – 31.02.2004');
            });

            it('31.04.2004 - 29.02.2003 => 29.02.2003 - 31.04.2004', () => {
                cy.get('@input')
                    .type('3104200429022003')
                    .should('have.value', '29.02.2003 – 31.04.2004');
            });

            it('01.01.2012 - 31.02.1999 => 31.02.1999 - 01.01.2012', () => {
                cy.get('@input')
                    .type('0101201231021999')
                    .should('have.value', '31.02.1999 – 01.01.2012');
            });
        });

        describe('replaces dates to max and min, when date greater max 10.05.2025 and less min 01.01.2000', () => {
            beforeEach(() => {
                cy.visit(
                    `/${DemoPath.DateRange}/API?strict=false&max=2025-05-10&min=2000-01-01`,
                );
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('30.02.1999 - 31.11.2029 => 01.01.2000 - 10.05.2025', () => {
                cy.get('@input')
                    .type('3002199931112029')
                    .should('have.value', '01.01.2000 – 10.05.2025');
            });

            it('31.11.2029 - 30.02.1999 => 01.01.2000 - 10.05.2025', () => {
                cy.get('@input')
                    .type('3111202930021999')
                    .should('have.value', '01.01.2000 – 10.05.2025');
            });
        });
    });
});
