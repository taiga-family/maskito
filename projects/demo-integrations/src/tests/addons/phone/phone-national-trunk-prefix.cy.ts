import {DemoPath} from '@demo/constants';

describe('Phone | Replaces national trunk prefix by international one on paste', () => {
    describe('AU | 0 as national trunk prefix', () => {
        // https://en.wikipedia.org/wiki/Trunk_prefix#Example

        it('[strict=false] Paste 0733333333 => +61 7 3333-3333', () => {
            cy.visit(`/${DemoPath.PhonePackage}/API?countryIsoCode=AU&strict=false`);

            cy.get('#demo-content input:first-of-type')
                .focus()
                .should('have.value', '')
                .paste('0733333333')
                .should('have.value', '+61 7 3333-3333');
        });

        it('[strict=true] Paste 0733333333 => +61 7 3333-3333', () => {
            cy.visit(`/${DemoPath.PhonePackage}/API?countryIsoCode=AU&strict=true`);

            cy.get('#demo-content input:first-of-type')
                .focus()
                .should('have.value', '+61 ')
                .paste('0733333333')
                .should('have.value', '+61 7 3333-3333');
        });
    });

    describe('RU | 8 as national trunk prefix', () => {
        it('[strict=false] Paste 89123456789 => +7 912 345-67-89', () => {
            cy.visit(`/${DemoPath.PhonePackage}/API?countryIsoCode=RU&strict=false`);

            cy.get('#demo-content input:first-of-type')
                .focus()
                .should('have.value', '')
                .paste('89123456789')
                .should('have.value', '+7 912 345-67-89');
        });

        it('[strict=true] Paste 89123456789 => +7 912 345-67-89', () => {
            cy.visit(`/${DemoPath.PhonePackage}/API?countryIsoCode=RU&strict=true`);

            cy.get('#demo-content input:first-of-type')
                .focus()
                .should('have.value', '+7 ')
                .paste('89123456789')
                .should('have.value', '+7 912 345-67-89');
        });
    });
});
