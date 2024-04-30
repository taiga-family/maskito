import {DemoPath} from '@demo/constants';

describe('Date | Strict mode', () => {
    describe('Disabled', () => {
        describe("doesn't fix wrong dates", () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?strict=false`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('30.02.2004', () => {
                cy.get('@input').type('30022004').should('have.value', '30.02.2004');
            });

            it('31.02.2004', () => {
                cy.get('@input').type('31022004').should('have.value', '31.02.2004');
            });

            it('29.02.2003', () => {
                cy.get('@input').type('29022003').should('have.value', '29.02.2003');
            });

            it('31.04.2004', () => {
                cy.get('@input').type('31042004').should('have.value', '31.04.2004');
            });

            it('31.04.2004', () => {
                cy.get('@input').type('31042004').should('have.value', '31.04.2004');
            });

            it('31.06.2004', () => {
                cy.get('@input').type('31062004').should('have.value', '31.06.2004');
            });

            it('31.09.2004', () => {
                cy.get('@input').type('31092004').should('have.value', '31.09.2004');
            });

            it('31.11.2004', () => {
                cy.get('@input').type('31112004').should('have.value', '31.11.2004');
            });
        });

        describe('replaces dates to min, when date less min 01.01.2000', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?strict=false&min=2000-01-01`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('30.02.2004 => 30.02.2004', () => {
                cy.get('@input').type('30022004').should('have.value', '30.02.2004');
            });

            it('31.11.1009 => 01.01.2000', () => {
                cy.get('@input').type('31111009').should('have.value', '01.01.2000');
            });
        });

        describe('replaces dates to max, when date greater max 10.05.2025', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?strict=false&max=2025-05-10`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('31.04.2025 => 31.04.2025', () => {
                cy.get('@input').type('31042025').should('have.value', '31.04.2025');
            });

            it('29.02.2027 => 10.05.2025', () => {
                cy.get('@input').type('29022027').should('have.value', '10.05.2025');
            });
        });
    });
});
