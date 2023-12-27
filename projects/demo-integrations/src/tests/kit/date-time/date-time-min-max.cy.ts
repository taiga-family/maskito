import {DemoPath} from '@demo/constants';

describe('DateTime | Min & Max dates', () => {
    describe('Max', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateTime}/API?max=2020-05-05T12:20`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('accepts date less than max value', () => {
            cy.get('@input')
                .type('18.12.2019,23:50')
                .should('have.value', '18.12.2019, 23:50')
                .should('have.prop', 'selectionStart', '18.12.2019, 23:50'.length)
                .should('have.prop', 'selectionEnd', '18.12.2019, 23:50'.length);
        });

        it('05.05.2020, 12:2| => Type 5 => 05.05.2020, 12:20 (max value)', () => {
            cy.get('@input')
                .type('05.05.2020,12:2')
                .should('have.value', '05.05.2020, 12:2')
                .should('have.prop', 'selectionStart', '05.05.2020, 12:2'.length)
                .should('have.prop', 'selectionEnd', '05.05.2020, 12:2'.length)
                .type('5')
                .should('have.value', '05.05.2020, 12:20')
                .should('have.prop', 'selectionStart', '05.05.2020, 12:20'.length)
                .should('have.prop', 'selectionEnd', '05.05.2020, 12:20'.length);
        });

        it('18.12.20|19, 12:20 => Type 2 => 05.05.202|0, 12:20 (max value)', () => {
            cy.get('@input')
                .type('18.12.2019,12:20')
                .type('{leftArrow}'.repeat('19, 12:20'.length))
                .type('2')
                .should('have.value', '05.05.2020, 12:20')
                .should('have.prop', 'selectionStart', '05.05.202'.length)
                .should('have.prop', 'selectionEnd', '05.05.202'.length);
        });

        describe('Correct value after date only input', () => {
            it('06.06.202| => Type 5 => 05.05.2020| (max value)', () => {
                cy.get('@input')
                    .type('06.06.202')
                    .should('have.value', '06.06.202')
                    .should('have.prop', 'selectionStart', '06.06.202'.length)
                    .should('have.prop', 'selectionEnd', '06.06.202'.length)
                    .type('5')
                    .should('have.value', '05.05.2020')
                    .should('have.prop', 'selectionStart', '05.05.2020'.length)
                    .should('have.prop', 'selectionEnd', '05.05.2020'.length);
            });

            it('0|1.05.2020 => Type 9 => 05|.05.2020 (max value)', () => {
                cy.get('@input')
                    .type('01052020')
                    .type('{leftArrow}'.repeat('1.05.2020'.length))
                    .type('9')
                    .should('have.value', '05.05.2020')
                    .should('have.prop', 'selectionStart', '05.'.length);
            });
        });
    });

    describe('Min', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateTime}/API?min=1995-10-14T15:32`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('accepts date more than min value', () => {
            cy.get('@input')
                .type('13.04.2001,11:23')
                .should('have.value', '13.04.2001, 11:23')
                .should('have.prop', 'selectionStart', '13.04.2001, 11:23'.length)
                .should('have.prop', 'selectionEnd', '13.04.2001, 11:23'.length);
        });

        it('14.10.1995, 15:3| => Type 1 => 14.10.1995, 15:32 (min)', () => {
            cy.get('@input')
                .type('14.10.1995,15:3')
                .should('have.value', '14.10.1995, 15:3')
                .should('have.prop', 'selectionStart', '14.10.1995, 15:3'.length)
                .should('have.prop', 'selectionEnd', '14.10.1995, 15:3'.length)
                .type('1')
                .should('have.value', '14.10.1995, 15:32')
                .should('have.prop', 'selectionStart', '14.10.1995, 15:32'.length)
                .should('have.prop', 'selectionEnd', '14.10.1995, 15:32'.length);
        });

        it('14.|10.1995, 10:20 => Type 9 => 14.10.|1995, 15:32 (min)', () => {
            cy.get('@input')
                .type('14.10.1995,10:20')
                .type('{leftArrow}'.repeat('10.1995, 10:20'.length))
                .type('9')
                .should('have.value', '14.10.1995, 15:32')
                .should('have.prop', 'selectionStart', '14.10.'.length)
                .should('have.prop', 'selectionEnd', '14.10.'.length);
        });

        describe('Correct value after date only input', () => {
            it('14.10.199 => Type 3 => 14.10.1995| (min)', () => {
                cy.get('@input')
                    .type('14.10.199')
                    .should('have.value', '14.10.199')
                    .should('have.prop', 'selectionStart', '14.10.199'.length)
                    .should('have.prop', 'selectionEnd', '14.10.199'.length)
                    .type('3')
                    .should('have.value', '14.10.1995')
                    .should('have.prop', 'selectionStart', '14.10.1995'.length)
                    .should('have.prop', 'selectionEnd', '14.10.1995'.length);
            });

            it('14.10.199|5 => Type 3 => 14.10.1995| (min)', () => {
                cy.get('@input')
                    .type('14.10.1995')
                    .type('{leftArrow}')
                    .type('3')
                    .should('have.value', '14.10.1995')
                    .should('have.prop', 'selectionStart', '14.10.1995'.length);
            });
        });
    });
});
