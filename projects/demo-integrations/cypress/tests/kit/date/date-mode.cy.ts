import {DemoPath} from '@demo/path';

describe('Date', () => {
    describe('Mode', () => {
        describe('yyyy/mm/dd', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?mode=yyyy%2Fmm%2Fdd`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it(' "yyyy/mm/dd" => 2019.12.31', () => {
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

        describe('mm/dd/yyyy', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?mode=mm%2Fdd%2Fyyyy`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it(' "mm/dd/yyyy" => 03.12.2020', () => {
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

        describe('mm/yy', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?mode=mm%2Fyy`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it(' "mm/yy" => 03.20', () => {
                cy.get('@input')
                    .type('3')
                    .should('have.value', '03')
                    .should('have.prop', 'selectionStart', '03'.length)
                    .should('have.prop', 'selectionEnd', '03'.length)
                    .type('20')
                    .should('have.value', '03.20')
                    .should('have.prop', 'selectionStart', '03.20'.length)
                    .should('have.prop', 'selectionEnd', '03.20'.length);
            });

            it(' "mm/yy" => 03.22', () => {
                cy.get('@input')
                    .type('0')
                    .should('have.value', '0')
                    .should('have.prop', 'selectionStart', '0'.length)
                    .should('have.prop', 'selectionEnd', '0'.length)
                    .type('322')
                    .should('have.value', '03.22')
                    .should('have.prop', 'selectionStart', '03.22'.length)
                    .should('have.prop', 'selectionEnd', '03.22'.length);
            });
        });
    });
});
