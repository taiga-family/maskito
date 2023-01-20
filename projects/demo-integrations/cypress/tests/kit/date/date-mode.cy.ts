import {DemoPath} from '@demo/routes';

describe('Date', () => {
    describe('Mode', () => {
        describe('YMD', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?mode=YMD`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it(' "YMD" => 2019.12.31', () => {
                cy.get('@input')
                    .type('20193')
                    .should('have.value', '2019.03')
                    .should('have.prop', 'selectionStart', '2019.03'.length)
                    .should('have.prop', 'selectionEnd', '2019.03'.length)
                    .type('22')
                    .should('have.value', '2019.03.22')
                    .should('have.prop', 'selectionStart', '2019.03.22'.length)
                    .should('have.prop', 'selectionEnd', '2019.03.22'.length);
            });
        });

        describe('MDY', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?mode=MDY`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it(' "MDY" => 03.12.2020', () => {
                cy.get('@input')
                    .type('312')
                    .should('have.value', '03.12')
                    .should('have.prop', 'selectionStart', '03.12'.length)
                    .should('have.prop', 'selectionEnd', '03.12'.length)
                    .type('2022')
                    .should('have.value', '03.12.2022')
                    .should('have.prop', 'selectionStart', '03.12.2022'.length)
                    .should('have.prop', 'selectionEnd', '03.12.2022'.length);
            });
        });
    });
});
