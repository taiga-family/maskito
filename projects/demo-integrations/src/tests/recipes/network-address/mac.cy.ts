import {DemoPath} from '@demo/constants';

describe('Network Address | MAC', () => {
    beforeEach(() => {
        cy.visit(DemoPath.NetworkAddress);
        cy.get('#mac input')
            .should('be.visible')
            .first()
            .should('have.value', '')
            .focus()
            .as('input');
    });

    describe('valid', () => {
        it('accepts full MAC value and normalizes to uppercase', () => {
            cy.get('@input')
                .type('aabbccddeeff')
                .should('have.value', 'AA:BB:CC:DD:EE:FF');
        });

        it('accepts paste of value with separators', () => {
            cy.get('@input')
                .paste('00:1A:2B:3C:4D:5E')
                .should('have.value', '00:1A:2B:3C:4D:5E');
        });

        it('accepts paste of value without separators', () => {
            cy.get('@input')
                .paste('aabbccddeeff')
                .should('have.value', 'AA:BB:CC:DD:EE:FF');
        });

        it('accepts paste of long value and truncates', () => {
            cy.get('@input')
                .paste('00:1A:2B:3C:4D:5E:FF:FF')
                .should('have.value', '00:1A:2B:3C:4D:5E');
        });

        it('inserts separator after second hex digit', () => {
            cy.get('@input').type('aab').should('have.value', 'AA:B');
        });

        it('accepts mixed-case hex digits', () => {
            cy.get('@input').type('aBcD').should('have.value', 'AB:CD');
        });
    });

    describe('invalid', () => {
        it('ignores non-hex characters', () => {
            cy.get('@input').type('abg1!2Z3').should('have.value', 'AB:12:3');
        });

        it('ignores separators without enough hex digits', () => {
            cy.get('@input').type('::::').should('have.value', '');
        });

        it('ignores consecutive separators after valid input', () => {
            cy.get('@input').type('aa::').should('have.value', 'AA:');
        });

        it('does not accept more than 12 hex digits', () => {
            cy.get('@input')
                .type('f'.repeat(20))
                .should('have.value', 'FF:FF:FF:FF:FF:FF');
        });
    });

    describe('editing', () => {
        it('backspace deletes last character', () => {
            cy.get('@input')
                .type('aabbcc')
                .type('{backspace}')
                .should('have.value', 'AA:BB:C');
        });

        it('backspace deletes trailing separator', () => {
            cy.get('@input').type('aa:').type('{backspace}').should('have.value', 'AA');
        });

        it('delete removes hex character in the middle', () => {
            cy.get('@input')
                .type('aabbcc')
                .type('{leftArrow}'.repeat(4))
                .type('{del}')
                .should('have.value', 'AA:BC:C');
        });

        it('prevents delete of separator character', () => {
            cy.get('@input')
                .type('aabbcc')
                .type('{leftArrow}'.repeat(3))
                .type('{del}')
                .should('have.value', 'AA:BB:CC');
        });

        it('text selection overwrite', () => {
            cy.get('@input')
                .type('aabbcc')
                .type('{selectall}1122')
                .should('have.value', '11:22');
        });

        it('prevents insertion when full', () => {
            cy.get('@input')
                .type('aabbccddeeff')
                .should('have.value', 'AA:BB:CC:DD:EE:FF')
                .type('a')
                .should('have.value', 'AA:BB:CC:DD:EE:FF');
        });
    });
});
