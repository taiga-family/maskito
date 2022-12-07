import {DemoPath} from '../../../../../demo/src/app/app.routes';

describe('Time', () => {
    describe('Mode', () => {
        describe('HH:MM', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Time}/API?mode=HH:MM`);
                cy.get('#demoContent input').should('be.visible').first().as('input');
            });

            it('can overwrite characters', () => {
                cy.get('@input')
                    .type('2359')
                    .type('{moveToStart}')
                    .type('00')
                    .should('have.value', '00:59')
                    .should('have.prop', 'selectionStart', '00:'.length)
                    .should('have.prop', 'selectionEnd', '00:'.length);
            });
        });

        describe('HH:MM:SS', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Time}/API?mode=HH:MM:SS`);
                cy.get('#demoContent input').should('be.visible').first().as('input');
            });

            it('can overwrite characters', () => {
                cy.get('@input')
                    .type('235959')
                    .type('{moveToStart}')
                    .type('0000')
                    .should('have.value', '00:00:59')
                    .should('have.prop', 'selectionStart', '00:00:'.length)
                    .should('have.prop', 'selectionEnd', '00:00:'.length);
            });
        });

        describe('HH:MM:SS.MSS', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Time}/API?mode=HH:MM:SS.MSS`);
                cy.get('#demoContent input').should('be.visible').first().as('input');
            });

            it('can overwrite characters', () => {
                cy.get('@input')
                    .type('235959999')
                    .should('have.value', '23:59:59.999')
                    .type('{moveToStart}')
                    .type('000000')
                    .should('have.value', '00:00:00.999')
                    .should('have.prop', 'selectionStart', '00:00:00.'.length)
                    .should('have.prop', 'selectionEnd', '00:00:00.'.length);
            });
        });
    });
});
