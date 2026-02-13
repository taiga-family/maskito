import {DemoPath} from '@demo/constants';

describe('Network Address | IPv6', () => {
    beforeEach(() => {
        cy.visit(DemoPath.NetworkAddress);
        cy.get('#ipv6 input')
            .should('be.visible')
            .first()
            .should('have.value', '')
            .focus()
            .as('input');
    });

    describe('valid', () => {
        it('accepts full IPv6 value and normalizes to lowercase', () => {
            cy.get('@input')
                .type('20010DB885A3000000008A2E03707334')
                .should('have.value', '2001:0db8:85a3:0000:0000:8a2e:0370:7334');
        });

        it('accepts paste of value with separators', () => {
            cy.get('@input')
                .paste('2001:0db8:0000:0000:0000:ff00:0042:8329')
                .should('have.value', '2001:0db8:0000:0000:0000:ff00:0042:8329');
        });

        it('accepts paste of value without separators', () => {
            cy.get('@input')
                .paste('20010db8000000000000ff0000428329')
                .should('have.value', '2001:0db8:0000:0000:0000:ff00:0042:8329');
        });

        it('accepts paste of long value and truncates', () => {
            cy.get('@input')
                .paste('2001:0db8:0000:0000:0000:ff00:0042:8329:aaaa:aaaa')
                .should('have.value', '2001:0db8:0000:0000:0000:ff00:0042:8329');
        });

        it('inserts separators after 4 hex digits', () => {
            cy.get('@input').type('abcd1').should('have.value', 'abcd:1');
        });

        it('accepts mixed-case hex digits', () => {
            cy.get('@input').type('ABcdEF12').should('have.value', 'abcd:ef12');
        });
    });

    describe('invalid', () => {
        it('ignores non-hex characters', () => {
            cy.get('@input').type('abg1!2Z3').should('have.value', 'ab12:3');
        });

        it('ignores separators without enough hex digits', () => {
            cy.get('@input').type('::::').should('have.value', '');
        });

        it('ignores separators mixed with too few hex digits', () => {
            cy.get('@input').type('ab::').should('have.value', 'ab');
        });

        it('does not accept more than 32 hex digits', () => {
            cy.get('@input')
                .type('f'.repeat(40))
                .should('have.value', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff');
        });
    });

    describe('editing', () => {
        it('backspace deletes last character', () => {
            cy.get('@input')
                .type('2001:0db8')
                .type('{backspace}')
                .should('have.value', '2001:0db');
        });

        it('backspace deletes trailing separator', () => {
            cy.get('@input')
                .type('2001:')
                .type('{backspace}')
                .should('have.value', '2001');
        });

        it('delete removes hex character in the middle', () => {
            cy.get('@input')
                .type('20010db8')
                .type('{leftArrow}'.repeat(3))
                .type('{del}')
                .should('have.value', '2001:0b8');
        });

        it('prevents delete of separator character', () => {
            cy.get('@input')
                .type('20010db8')
                .type('{leftArrow}'.repeat(5))
                .type('{del}')
                .should('have.value', '2001:0db8');
        });

        it('text selection overwrite', () => {
            cy.get('@input')
                .type('2001:0db8')
                .type('{selectall}1111')
                .should('have.value', '1111');
        });

        it('prevents insertion when full', () => {
            cy.get('@input')
                .type('1aaA2bBb3ccc4dDd5eee6fFF77778888')
                .should('have.value', '1aaa:2bbb:3ccc:4ddd:5eee:6fff:7777:8888')
                .type('a')
                .should('have.value', '1aaa:2bbb:3ccc:4ddd:5eee:6fff:7777:8888');
        });
    });
});
