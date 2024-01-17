import {DemoPath} from '@demo/constants';

describe('Date', () => {
    describe('Full width characters', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Date}/API?mode=dd%2Fmm%2Fyyyy`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        describe('Accepts all of full width characters', () => {
            it('３１１２２０１９ => 31.12.2019', () => {
                cy.get('@input')
                    .type('３１１２２０１９')
                    .should('have.value', '31.12.2019')
                    .should('have.prop', 'selectionStart', '31.12.2019'.length)
                    .should('have.prop', 'selectionEnd', '31.12.2019'.length);
            });

            it('２７| => type ９ => 27.09|', () => {
                cy.get('@input')
                    .type('２７')
                    .should('have.value', '27')
                    .should('have.prop', 'selectionStart', '27'.length)
                    .should('have.prop', 'selectionEnd', '27'.length)
                    .type('９')
                    .should('have.value', '27.09')
                    .should('have.prop', 'selectionStart', '27.09'.length)
                    .should('have.prop', 'selectionEnd', '27.09'.length);
            });

            it('３| => Type ７ => no value changes', () => {
                cy.get('@input')
                    .type('３')
                    .should('have.value', '3')
                    .should('have.prop', 'selectionStart', '3'.length)
                    .should('have.prop', 'selectionEnd', '3'.length)
                    .type('７')
                    .should('have.value', '3')
                    .should('have.prop', 'selectionStart', '3'.length)
                    .should('have.prop', 'selectionEnd', '3'.length);
            });
        });
    });
});
