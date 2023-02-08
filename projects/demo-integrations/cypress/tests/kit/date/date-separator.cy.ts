import {DemoPath} from '@demo/path';

describe('Date', () => {
    describe('Separator', () => {
        describe('/', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?separator=/`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it(' "/" => 31/12/2019', () => {
                cy.get('@input')
                    .type('3112')
                    .should('have.value', '31/12')
                    .should('have.prop', 'selectionStart', '31/12'.length)
                    .should('have.prop', 'selectionEnd', '31/12'.length)
                    .type('2019')
                    .should('have.value', '31/12/2019')
                    .should('have.prop', 'selectionStart', '31/12/2019'.length)
                    .should('have.prop', 'selectionEnd', '31/12/2019'.length);
            });

            it('input "/" separator"', () => {
                cy.get('@input')
                    .type('31/')
                    .should('have.value', '31/')
                    .should('have.prop', 'selectionStart', '31/'.length)
                    .should('have.prop', 'selectionEnd', '31/'.length);
            });

            it('input separator "/" is not allowed', () => {
                cy.get('@input')
                    .type('3/')
                    .should('have.value', '3')
                    .should('have.prop', 'selectionStart', '3'.length)
                    .should('have.prop', 'selectionEnd', '3'.length);
            });

            it('Input separator "-" in separator mode "/" is not allowed', () => {
                cy.get('@input')
                    .type('31-')
                    .should('have.value', '31')
                    .should('have.prop', 'selectionStart', '31'.length)
                    .should('have.prop', 'selectionEnd', '31'.length);
            });
        });

        describe('-', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?separator=-`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it(' "-" => 31-12-2019', () => {
                cy.get('@input')
                    .type('3112')
                    .should('have.value', '31-12')
                    .should('have.prop', 'selectionStart', '31-12'.length)
                    .should('have.prop', 'selectionEnd', '31-12'.length)
                    .type('2019')
                    .should('have.value', '31-12-2019')
                    .should('have.prop', 'selectionStart', '31-12-2019'.length)
                    .should('have.prop', 'selectionEnd', '31-12-2019'.length);
            });
        });
    });
});
