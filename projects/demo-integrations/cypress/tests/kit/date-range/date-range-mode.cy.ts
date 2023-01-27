import {DemoPath} from '@demo/routes';

describe('DateRange | Mode', () => {
    describe('mm.dd.yyyy', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateRange}/API?mode=MDY`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('12.31.2000 - 11.30.2019', () => {
            cy.get('@input')
                .type('1231200011302019')
                .should('have.value', '12.31.2000 – 11.30.2019')
                .should('have.prop', 'selectionStart', '12.31.2000 - 11.30.2019'.length)
                .should('have.prop', 'selectionEnd', '12.31.2000 - 11.30.2019'.length);
        });

        it('Empty input => Type 3 => 03|', () => {
            cy.get('@input')
                .type('3')
                .should('have.value', '03')
                .should('have.prop', 'selectionStart', '03'.length)
                .should('have.prop', 'selectionEnd', '03'.length);
        });

        it('12| => Type 3 => 12.3|', () => {
            cy.get('@input')
                .type('123')
                .should('have.value', '12.3')
                .should('have.prop', 'selectionStart', '12.3'.length)
                .should('have.prop', 'selectionEnd', '12.3'.length);
        });

        it('12| => Type 4 => 12.04|', () => {
            cy.get('@input')
                .type('124')
                .should('have.value', '12.04')
                .should('have.prop', 'selectionStart', '12.04'.length)
                .should('have.prop', 'selectionEnd', '12.04'.length);
        });
    });

    describe('yyyy.mm.dd', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateRange}/API?mode=YMD`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('2000.12.31 - 2019.11.30', () => {
            cy.get('@input')
                .type('2000123120191130')
                .should('have.value', '2000.12.31 – 2019.11.30')
                .should('have.prop', 'selectionStart', '2000.12.31 - 2019.11.30'.length)
                .should('have.prop', 'selectionEnd', '2000.12.31 - 2019.11.30'.length);
        });

        it('2000| => Type 3 => 2000.03|', () => {
            cy.get('@input')
                .type('20003')
                .should('have.value', '2000.03')
                .should('have.prop', 'selectionStart', '2000.03'.length)
                .should('have.prop', 'selectionEnd', '2000.03'.length);
        });

        it('2000.03| => Type 5 => 2000.03.05|', () => {
            cy.get('@input')
                .type('200035')
                .should('have.value', '2000.03.05')
                .should('have.prop', 'selectionStart', '2000.03.05'.length)
                .should('have.prop', 'selectionEnd', '2000.03.05'.length);
        });
    });
});
