import {DemoPath} from '@demo/constants';

describe('DateRange | Min & Max Length', () => {
    describe('[minLength]="3"', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateRange}/API?minLength$=0`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('06.02.2023 - 06.02.202| => Type 3 => 06.02.2023 - 08.02.2023', () => {
            cy.get('@input')
                .type('06.02.2023 - 06.02.202')
                .should('have.value', '06.02.2023 – 06.02.202')
                .should('have.prop', 'selectionStart', '06.02.2023 – 06.02.202'.length)
                .should('have.prop', 'selectionEnd', '06.02.2023 – 06.02.202'.length)
                .type('3')
                .should('have.value', '06.02.2023 – 08.02.2023')
                .should('have.prop', 'selectionStart', '06.02.2023 – 08.02.2023'.length)
                .should('have.prop', 'selectionEnd', '06.02.2023 – 08.02.2023'.length);
        });

        it('06.02.2023 - 07.02.202| => Type 3 => 06.02.2023 - 08.02.2023', () => {
            cy.get('@input')
                .type('06.02.2023 - 07.02.202')
                .should('have.value', '06.02.2023 – 07.02.202')
                .should('have.prop', 'selectionStart', '06.02.2023 – 07.02.202'.length)
                .should('have.prop', 'selectionEnd', '06.02.2023 – 07.02.202'.length)
                .type('3')
                .should('have.value', '06.02.2023 – 08.02.2023')
                .should('have.prop', 'selectionStart', '06.02.2023 – 08.02.2023'.length)
                .should('have.prop', 'selectionEnd', '06.02.2023 – 08.02.2023'.length);
        });

        it('06.02.2023 - 08.02.2023 => valid input, no changes', () => {
            cy.get('@input')
                .type('06.02.2023 - 08.02.2023')
                .should('have.value', '06.02.2023 – 08.02.2023')
                .should('have.prop', 'selectionStart', '06.02.2023 – 08.02.2023'.length)
                .should('have.prop', 'selectionEnd', '06.02.2023 – 08.02.2023'.length);
        });

        it('06.02.2023 - 09.02.2023 => valid input, no changes', () => {
            cy.get('@input')
                .type('06.02.2023 - 09.02.2023')
                .should('have.value', '06.02.2023 – 09.02.2023')
                .should('have.prop', 'selectionStart', '06.02.2023 – 09.02.2023'.length)
                .should('have.prop', 'selectionEnd', '06.02.2023 – 09.02.2023'.length);
        });
    });

    describe('[maxLength]="5"', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateRange}/API?maxLength$=0`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('06.02.2023 - 09.02.2023 => valid input, no changes', () => {
            cy.get('@input')
                .type('06.02.2023 - 09.02.2023')
                .should('have.value', '06.02.2023 – 09.02.2023')
                .should('have.prop', 'selectionStart', '06.02.2023 – 09.02.2023'.length)
                .should('have.prop', 'selectionEnd', '06.02.2023 – 09.02.2023'.length);
        });

        it('06.02.2023 - 10.02.2023 => valid input, no changes', () => {
            cy.get('@input')
                .type('06.02.2023-10.02.2023')
                .should('have.value', '06.02.2023 – 10.02.2023')
                .should('have.prop', 'selectionStart', '06.02.2023 – 10.02.2023'.length)
                .should('have.prop', 'selectionEnd', '06.02.2023 – 10.02.2023'.length);
        });

        it('06.02.2023 - 11.02.202| => Type 3 => 06.02.2023 - 10.02.2023', () => {
            cy.get('@input')
                .type('06.02.2023 - 11.02.202')
                .should('have.value', '06.02.2023 – 11.02.202')
                .should('have.prop', 'selectionStart', '06.02.2023 – 11.02.202'.length)
                .should('have.prop', 'selectionEnd', '06.02.2023 – 11.02.202'.length)
                .type('3')
                .should('have.value', '06.02.2023 – 10.02.2023')
                .should('have.prop', 'selectionStart', '06.02.2023 – 10.02.2023'.length)
                .should('have.prop', 'selectionEnd', '06.02.2023 – 10.02.2023'.length);
        });

        it('06.02.2023 - 10.03.202| => Type 3 => 06.02.2023 - 10.02.2023', () => {
            cy.get('@input')
                .type('06.02.2023 - 10.03.202')
                .should('have.value', '06.02.2023 – 10.03.202')
                .should('have.prop', 'selectionStart', '06.02.2023 – 10.03.202'.length)
                .should('have.prop', 'selectionEnd', '06.02.2023 – 10.03.202'.length)
                .type('3')
                .should('have.value', '06.02.2023 – 10.02.2023')
                .should('have.prop', 'selectionStart', '06.02.2023 – 10.02.2023'.length)
                .should('have.prop', 'selectionEnd', '06.02.2023 – 10.02.2023'.length);
        });
    });

    describe('[minLength]="3" & [maxLength]="5"', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateRange}/API?maxLength$=0&minLength$=0`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('01.01.2023 - 02.01.202| => Type 3 => 01.01.2023 - 03.01.2023', () => {
            cy.get('@input')
                .type('01.01.2023 - 02.01.202')
                .should('have.value', '01.01.2023 – 02.01.202')
                .should('have.prop', 'selectionStart', '01.01.2023 – 02.01.202'.length)
                .should('have.prop', 'selectionEnd', '01.01.2023 – 02.01.202'.length)
                .type('3')
                .should('have.value', '01.01.2023 – 03.01.2023')
                .should('have.prop', 'selectionStart', '01.01.2023 – 03.01.2023'.length)
                .should('have.prop', 'selectionEnd', '01.01.2023 – 03.01.2023'.length);
        });

        it('01.01.2023 - 03.01.2023 => valid input, no changes', () => {
            cy.get('@input')
                .type('01.01.2023 - 03.01.2023')
                .should('have.value', '01.01.2023 – 03.01.2023')
                .should('have.prop', 'selectionStart', '01.01.2023 – 03.01.2023'.length)
                .should('have.prop', 'selectionEnd', '01.01.2023 – 03.01.2023'.length);
        });

        it('01.01.2023 - 05.01.2023 => valid input, no changes', () => {
            cy.get('@input')
                .type('01.01.2023 - 05.01.2023')
                .should('have.value', '01.01.2023 – 05.01.2023')
                .should('have.prop', 'selectionStart', '01.01.2023 – 05.01.2023'.length)
                .should('have.prop', 'selectionEnd', '01.01.2023 – 05.01.2023'.length);
        });

        it('01.01.2023 - 06.01.202| => Type 3 => 01.01.2023 - 05.01.2023', () => {
            cy.get('@input')
                .type('01.01.2023 - 06.01.202')
                .should('have.value', '01.01.2023 – 06.01.202')
                .should('have.prop', 'selectionStart', '01.01.2023 – 06.01.202'.length)
                .should('have.prop', 'selectionEnd', '01.01.2023 – 06.01.202'.length)
                .type('3')
                .should('have.value', '01.01.2023 – 05.01.2023')
                .should('have.prop', 'selectionStart', '01.01.2023 – 05.01.2023'.length)
                .should('have.prop', 'selectionEnd', '01.01.2023 – 05.01.2023'.length);
        });
    });

    describe('[minLength]={month: 1}', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateRange}/API?minLength$=2`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('01.03.2018 - 31.03.2018 => valid input', () => {
            cy.get('@input')
                .type('01.03.2018 - 31.03.2018')
                .should('have.value', '01.03.2018 – 31.03.2018')
                .should('have.prop', 'selectionStart', '01.03.2018 - 31.03.2018'.length)
                .should('have.prop', 'selectionEnd', '01.03.2018 - 31.03.2018'.length);
        });

        it('02.03.2018 - 31.03.201| => Type 8 => 02.03.2018 - 01.04.2018', () => {
            cy.get('@input')
                .type('02.03.2018 - 31.03.201')
                .should('have.value', '02.03.2018 – 31.03.201')
                .should('have.prop', 'selectionStart', '02.03.2018 - 31.03.201'.length)
                .should('have.prop', 'selectionEnd', '02.03.2018 - 31.03.201'.length)
                .type('8')
                .should('have.value', '02.03.2018 – 01.04.2018')
                .should('have.prop', 'selectionStart', '02.03.2018 - 01.04.2018'.length)
                .should('have.prop', 'selectionEnd', '02.03.2018 - 01.04.2018'.length);
        });

        it('18.02.2018 - 17.03.2018 => valid input', () => {
            cy.get('@input')
                .type('18.02.2018 - 17.03.2018')
                .should('have.value', '18.02.2018 – 17.03.2018')
                .should('have.prop', 'selectionStart', '18.02.2018 - 17.03.2018'.length)
                .should('have.prop', 'selectionEnd', '18.02.2018 - 17.03.2018'.length);
        });

        it('19.02.2018 - 17.03.201| => Type 8 => 19.02.2018 - 18.03.2018', () => {
            cy.get('@input')
                .type('19.02.2018 - 17.03.201')
                .should('have.value', '19.02.2018 – 17.03.201')
                .should('have.prop', 'selectionStart', '19.02.2018 - 17.03.201'.length)
                .should('have.prop', 'selectionEnd', '19.02.2018 - 17.03.201'.length)
                .type('8')
                .should('have.value', '19.02.2018 – 18.03.2018')
                .should('have.prop', 'selectionStart', '19.02.2018 - 18.03.2018'.length)
                .should('have.prop', 'selectionEnd', '19.02.2018 - 18.03.2018'.length);
        });
    });

    describe('[minLength]={month: 1, day: 1}', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateRange}/API?minLength$=3`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('28.02.2018 - 31.03.2018 => valid input', () => {
            cy.get('@input')
                .type('28.02.2018 - 31.03.2018')
                .should('have.value', '28.02.2018 – 31.03.2018')
                .should('have.prop', 'selectionStart', '28.02.2018 - 31.03.2018'.length)
                .should('have.prop', 'selectionEnd', '28.02.2018 - 31.03.2018'.length);
        });

        it('01.03.2018 - 31.03.201| => Type 8 => 01.03.2018 - 01.04.2018', () => {
            cy.get('@input')
                .type('01.03.2018 - 31.03.201')
                .should('have.value', '01.03.2018 – 31.03.201')
                .should('have.prop', 'selectionStart', '01.03.2018 - 31.03.201'.length)
                .should('have.prop', 'selectionEnd', '01.03.2018 - 31.03.201'.length)
                .type('8')
                .should('have.value', '01.03.2018 – 01.04.2018')
                .should('have.prop', 'selectionStart', '01.03.2018 - 01.04.2018'.length)
                .should('have.prop', 'selectionEnd', '01.03.2018 - 01.04.2018'.length);
        });
    });
});
