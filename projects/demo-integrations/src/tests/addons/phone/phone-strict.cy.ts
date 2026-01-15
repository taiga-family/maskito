import {DemoPath} from '@demo/constants';

describe('Phone [strict]=true', () => {
    describe('[countryIsoCode]=KZ', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.PhonePackage}/API?countryIsoCode=KZ&strict=true`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .should('have.value', '+7 ')
                .as('input');
        });

        it('Paste +7 777 (+7 is treated as country prefix => no prefix duplication)', () => {
            cy.get('@input')
                .paste('+7 777')
                .should('have.value', '+7 777')
                .should('have.prop', 'selectionStart', '+7 777'.length)
                .should('have.prop', 'selectionEnd', '+7 777'.length);
        });

        it('Paste +7777 (+7 is treated as country prefix => no prefix duplication)', () => {
            cy.get('@input')
                .paste('+7777')
                .should('have.value', '+7 777')
                .should('have.prop', 'selectionStart', '+7 777'.length)
                .should('have.prop', 'selectionEnd', '+7 777'.length);
        });

        it('Paste 7777 (no plus sign => all 4 sevens are treated as of incomplete value (+7 is added automatically))', () => {
            cy.get('@input')
                .paste('7777')
                .should('have.value', '+7 777 7')
                .should('have.prop', 'selectionStart', '+7 777 7'.length)
                .should('have.prop', 'selectionEnd', '+7 777 7'.length);
        });
    });

    describe('[countryIsoCode]=RU', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.PhonePackage}/API?countryIsoCode=RU&strict=true`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .should('have.value', '+7 ')
                .as('input');
        });

        [
            '+7 912 345-67-89',
            '+79123456789',
            '79123456789', // even without plus sign => no country prefix duplication
            '89123456789', // 8 should be replaced by +7 automatically
            '9123456789',
        ].forEach((value) => {
            it(`Paste ${value}`, () => {
                cy.get('@input')
                    .paste(value)
                    .should('have.value', '+7 912 345-67-89')
                    .should('have.prop', 'selectionStart', '+7 912 345-67-89'.length)
                    .should('have.prop', 'selectionEnd', '+7 912 345-67-89'.length);
            });
        });
    });

    describe('Pasting numbers', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.PhonePackage}/API?countryIsoCode=RU&strict=true`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .should('have.value', '+7 ')
                .as('input');
        });

        it('should merge pasted numbers with existing input', () => {
            cy.get('@input').clear().type('+987');
            cy.get('@input').paste('654');
            cy.get('@input').should('have.value', '+7 987 654');
        });
    });
});
