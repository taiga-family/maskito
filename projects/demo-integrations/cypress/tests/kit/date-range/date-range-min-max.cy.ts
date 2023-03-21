import {DemoPath} from '@demo/path';

describe('DateRange | Min & Max dates', () => {
    describe('Max', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateRange}/API?max=2020-05-05`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('accepts date less than max value', () => {
            cy.get('@input')
                .type('18.12.2019-14.01.2020')
                .should('have.value', '18.12.2019 – 14.01.2020')
                .should('have.prop', 'selectionStart', '18.12.2019 – 14.01.2020'.length)
                .should('have.prop', 'selectionEnd', '18.12.2019 – 14.01.2020'.length);
        });

        it('18.12.2019 - 14.01.202| => Type 5 => 18.12.2019-05.05.2020 (max value)', () => {
            cy.get('@input')
                .type('18.12.2019-14.01.202')
                .should('have.value', '18.12.2019 – 14.01.202')
                .should('have.prop', 'selectionStart', '18.12.2019 – 14.01.202'.length)
                .should('have.prop', 'selectionEnd', '18.12.2019 – 14.01.202'.length)
                .type('5')
                .should('have.value', '18.12.2019 – 05.05.2020')
                .should('have.prop', 'selectionStart', '18.12.2019 – 05.05.2020'.length)
                .should('have.prop', 'selectionEnd', '18.12.2019 – 05.05.2020'.length);
        });

        it('18.12.2019 - 0|3.05.2020 => Type 7 => 18.12.2019 - 05|.05.2020 (max value)', () => {
            cy.get('@input')
                .type('18.12.2019-03.05.2020')
                .type('{leftArrow}'.repeat('3.05.2020'.length))
                .type('7')
                .should('have.value', '18.12.2019 – 05.05.2020')
                .should('have.prop', 'selectionStart', '18.12.2019 – 05.'.length)
                .should('have.prop', 'selectionEnd', '18.12.2019 – 05.'.length);
        });

        it('18.12.2019 - 03.0|4.2020 => Type 7 => 18.12.2019 - 05.05|.2020 (max value)', () => {
            cy.get('@input')
                .type('18.12.2019-03.04.2020')
                .type('{leftArrow}'.repeat('4.2020'.length))
                .type('7')
                .should('have.value', '18.12.2019 – 05.05.2020')
                .should('have.prop', 'selectionStart', '18.12.2019 – 05.05.'.length)
                .should('have.prop', 'selectionEnd', '18.12.2019 – 05.05.'.length);
        });
    });

    describe('Min', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateRange}/API?min=1995-10-14`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('accepts date more than min value', () => {
            cy.get('@input')
                .type('13.04.2001-08.03.2002')
                .should('have.value', '13.04.2001 – 08.03.2002')
                .should('have.prop', 'selectionStart', '13.04.2001 – 08.03.2002'.length)
                .should('have.prop', 'selectionEnd', '13.04.2001 – 08.03.2002'.length);
        });

        it('15.11.1997 - 15.12.199| => Type 3 => (min date validation + dates swap) => 14.10.1995 - 15.11.1997', () => {
            cy.get('@input')
                .type('15.11.1997-15.12.199')
                .should('have.value', '15.11.1997 – 15.12.199')
                .should('have.prop', 'selectionStart', '15.11.1997 – 15.12.199'.length)
                .should('have.prop', 'selectionEnd', '15.11.1997 – 15.12.199'.length)
                .type('3')
                .should('have.value', '14.10.1995 – 15.11.1997')
                .should('have.prop', 'selectionStart', '14.10.1995 – 15.11.1997'.length)
                .should('have.prop', 'selectionEnd', '14.10.1995 – 15.11.1997'.length);
        });

        it('1|5.10.1995 - 17.10.1995 => Type 2 => 14|.10.1995 - 17.10.1995', () => {
            cy.get('@input')
                .type('15.10.1995-17.10.1995')
                .type('{moveToStart}{rightArrow}')
                .type('2')
                .should('have.value', '14.10.1995 – 17.10.1995')
                .should('have.prop', 'selectionStart', '14.'.length)
                .should('have.prop', 'selectionEnd', '14.'.length);
        });

        it('15.10.1995 - 17.|10.1995 => Type 9 => (min date validation + dates swap) => 14.10.1995 - 15.10|.1995', () => {
            cy.get('@input')
                .type('15.10.1995-17.10.1995')
                .type('{leftArrow}'.repeat('10.1995'.length))
                .type('9')
                .should('have.value', '14.10.1995 – 15.10.1995')
                .should('have.prop', 'selectionStart', '14.10.1995 – 15.10.'.length)
                .should('have.prop', 'selectionEnd', '14.10.1995 – 15.10.'.length);
        });
    });
});
