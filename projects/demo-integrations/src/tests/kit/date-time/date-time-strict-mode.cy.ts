import {DemoPath} from '@demo/constants';

describe('DateTime | Strict mode', () => {
    describe('Disabled', () => {
        describe("doesn't fix wrong dates", () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.DateTime}/API?strict=false`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('30.02.2004, 23:21', () => {
                cy.get('@input')
                    .type('300220042321')
                    .should('have.value', '30.02.2004, 23:21');
            });

            it('31.02.2004, 12:21', () => {
                cy.get('@input')
                    .type('310220041221')
                    .should('have.value', '31.02.2004, 12:21');
            });

            it('29.02.2003, 00:00', () => {
                cy.get('@input')
                    .type('290220030000')
                    .should('have.value', '29.02.2003, 00:00');
            });

            it('31.04.2004, 10:00', () => {
                cy.get('@input')
                    .type('310420041000')
                    .should('have.value', '31.04.2004, 10:00');
            });

            it('31.04.2004, 23:21', () => {
                cy.get('@input')
                    .type('310420042321')
                    .should('have.value', '31.04.2004, 23:21');
            });

            it('31.06.2004, 23:21', () => {
                cy.get('@input')
                    .type('310620042321')
                    .should('have.value', '31.06.2004, 23:21');
            });

            it('31.09.2004, 23:21', () => {
                cy.get('@input')
                    .type('310920042321')
                    .should('have.value', '31.09.2004, 23:21');
            });

            it('31.11.2004, 23:21', () => {
                cy.get('@input')
                    .type('311120042321')
                    .should('have.value', '31.11.2004, 23:21');
            });
        });

        describe('replaces dates to min, when date less min 01.01.2000, 12:30', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.DateTime}/API?strict=false&min=2000-01-01T12:30`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('30.02.2004 => 30.02.2004, 12:20', () => {
                cy.get('@input')
                    .type('30022004')
                    .should('have.value', '30.02.2004')
                    .type('1220')
                    .should('have.value', '30.02.2004, 12:20');
            });

            it('31.11.1009 => 01.01.2000 => 01.01.2000, 12:30', () => {
                cy.get('@input')
                    .type('31111009')
                    .should('have.value', '01.01.2000')
                    .type('1220')
                    .should('have.value', '01.01.2000, 12:30');
            });
        });

        describe('replaces dates to max, when date greater max 10.05.2025, 18:30', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.DateTime}/API?strict=false&max=2025-05-10T18:30`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('31.04.2025 => 31.04.2025. 20:20', () => {
                cy.get('@input')
                    .type('31042025')
                    .should('have.value', '31.04.2025')
                    .type('2020')
                    .should('have.value', '31.04.2025, 20:20');
            });

            it('29.02.2027 => 10.05.2025 => 10.05.2025, 18:30,', () => {
                cy.get('@input')
                    .type('29022027')
                    .should('have.value', '10.05.2025')
                    .type('19:19')
                    .should('have.value', '10.05.2025, 18:30');
            });
        });
    });

    describe('Enabled', () => {
        describe('fixse wrong dates', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.DateTime}/API?strict=true`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('30.02.2004, 23:21', () => {
                cy.get('@input')
                    .type('300220042321')
                    .should('have.value', '01.03.2004, 23:21');
            });

            it('31.02.2004, 12:21', () => {
                cy.get('@input')
                    .type('310220041221')
                    .should('have.value', '02.03.2004, 12:21');
            });

            it('29.02.2003, 00:00', () => {
                cy.get('@input')
                    .type('290220030000')
                    .should('have.value', '01.03.2003, 00:00');
            });

            it('31.04.2004, 10:00', () => {
                cy.get('@input')
                    .type('310420041000')
                    .should('have.value', '01.05.2004, 10:00');
            });

            it('31.06.2004, 23:21', () => {
                cy.get('@input')
                    .type('310620042321')
                    .should('have.value', '01.07.2004, 23:21');
            });

            it('31.09.2004, 23:21', () => {
                cy.get('@input')
                    .type('310920042321')
                    .should('have.value', '01.10.2004, 23:21');
            });

            it('31.11.2004, 23:21', () => {
                cy.get('@input')
                    .type('311120042321')
                    .should('have.value', '01.12.2004, 23:21');
            });
        });
    });
});
