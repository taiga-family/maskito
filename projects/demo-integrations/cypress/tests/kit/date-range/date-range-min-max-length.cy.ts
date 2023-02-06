import {DemoPath} from '@demo/path';

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
});
