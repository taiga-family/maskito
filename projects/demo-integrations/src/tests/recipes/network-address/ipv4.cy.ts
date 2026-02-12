import {DemoPath} from '@demo/constants';

describe('Network Address | IPv4', () => {
    beforeEach(() => {
        cy.visit(DemoPath.NetworkAddress);
        cy.get('#ipv4 input')
            .should('be.visible')
            .first()
            .should('have.value', '')
            .focus()
            .as('input');
    });

    describe('valid', () => {
        it('accepts full IPv4 value with separators inserted', () => {
            cy.get('@input').type('192168001001').should('have.value', '192.168.001.001');
        });

        it('accepts paste of value without separators', () => {
            cy.get('@input')
                .paste('192168001001')
                .should('have.value', '192.168.001.001');
        });

        it('accepts paste of value with separators', () => {
            cy.get('@input').paste('10.0.0.1').should('have.value', '10.0.0.1');
        });

        it('accepts paste of value with partial separators', () => {
            cy.get('@input')
                .paste('192.168001001')
                .should('have.value', '192.168.001.001');
        });

        it('accepts paste of long value and truncates', () => {
            cy.get('@input')
                .paste('192.168.1.01.255.255')
                .should('have.value', '192.168.1.01');
        });

        it('inserts separator after third digit in octet', () => {
            cy.get('@input').type('1921').should('have.value', '192.1');
        });

        it('clamps octet value to 255', () => {
            cy.get('@input').type('999').should('have.value', '255');
        });

        it('clamps later octets to 255', () => {
            cy.get('@input').type('192999001001').should('have.value', '192.255.001.001');
        });
    });

    describe('invalid', () => {
        it('ignores non-digit characters', () => {
            cy.get('@input').type('1a2b3c4').should('have.value', '123.4');
        });

        it('ignores separators without enough digits', () => {
            cy.get('@input').type('..').should('have.value', '');
        });

        it('ignores separators mixed with too few digits', () => {
            cy.get('@input').type('1..').should('have.value', '1.');
        });

        it('does not accept more than 4 octets', () => {
            cy.get('@input').type('1'.repeat(20)).should('have.value', '111.111.111.111');
        });
    });

    describe('editing', () => {
        it('backspace deletes last character', () => {
            cy.get('@input')
                .type('192.168')
                .type('{backspace}')
                .should('have.value', '192.16');
        });

        it('backspace deletes trailing separator', () => {
            cy.get('@input').type('192.').type('{backspace}').should('have.value', '192');
        });

        it('delete removes character in the middle', () => {
            cy.get('@input')
                .type('192168')
                .type('{leftArrow}'.repeat(2))
                .type('{del}')
                .should('have.value', '192.18');
        });

        it('prevents deletion of separator character', () => {
            cy.get('@input')
                .type('192168')
                .type('{leftArrow}'.repeat(4))
                .type('{del}')
                .should('have.value', '192.168');
        });

        it('text selection overwrite', () => {
            cy.get('@input')
                .type('192.168')
                .type('{selectall}10')
                .should('have.value', '10');
        });

        it('prevents insertion when full', () => {
            cy.get('@input')
                .type('192168001001')
                .should('have.value', '192.168.001.001')
                .type('5')
                .should('have.value', '192.168.001.001');
        });
    });

    describe('partially omitted separators', () => {
        it('3 digits + 1 digit & separator + 3 digits + 3 digits', () => {
            cy.get('@input').paste('1921.123123').should('have.value', '192.1.123.123');
        });

        it('3 digits + 3 digits + 1 digit & separator + 3 digits', () => {
            cy.get('@input').paste('1921681.001').should('have.value', '192.168.1.001');
        });
    });
});
