import {openNumberPage} from './utils';

describe('Number | decimalZeroPadding', () => {
    beforeEach(() => {
        openNumberPage('decimalSeparator=,&precision=4&decimalZeroPadding=true');
    });

    it('Type 42 => 42,0000', () => {
        cy.get('@input')
            .type('42')
            .should('have.value', '42,0000')
            .should('have.prop', 'selectionStart', '42'.length)
            .should('have.prop', 'selectionEnd', '42'.length);
    });

    it('Type , => 0,0000', () => {
        cy.get('@input')
            .type(',')
            .should('have.value', '0,0000')
            .should('have.prop', 'selectionStart', '0,'.length)
            .should('have.prop', 'selectionEnd', '0,'.length);
    });

    it('Type 42,27 => 42,2700', () => {
        cy.get('@input')
            .type('42,27')
            .should('have.value', '42,2700')
            .should('have.prop', 'selectionStart', '42,27'.length)
            .should('have.prop', 'selectionEnd', '42,27'.length);
    });

    it('Integer part has `overwriteMode: shift`', () => {
        cy.get('@input')
            .type('42,27')
            .type('{leftArrow}'.repeat('2,27'.length))
            .type('55')
            .should('have.value', '4 552,2700')
            .should('have.prop', 'selectionStart', '4 55'.length)
            .should('have.prop', 'selectionEnd', '4 55'.length);
    });

    it('Decimal part has `overwriteMode: replace`', () => {
        cy.get('@input')
            .type('42,27')
            .type('{leftArrow}'.repeat('27'.length))
            .type('55')
            .should('have.value', '42,5500')
            .should('have.prop', 'selectionStart', '42,55'.length)
            .should('have.prop', 'selectionEnd', '42,55'.length);
    });

    it('42,|2700 => Backspace => 42|,2700', () => {
        cy.get('@input')
            .type('42,27')
            .type('{leftArrow}'.repeat('27'.length))
            .type('{backspace}')
            .should('have.value', '42,2700')
            .should('have.prop', 'selectionStart', '42'.length)
            .should('have.prop', 'selectionEnd', '42'.length);
    });

    it('42|,2700 => Delete => 42,|2700', () => {
        cy.get('@input')
            .type('42,27')
            .type('{leftArrow}'.repeat(',27'.length))
            .type('{del}')
            .should('have.value', '42,2700')
            .should('have.prop', 'selectionStart', '42,'.length)
            .should('have.prop', 'selectionEnd', '42,'.length);
    });

    it('0|,4242 => Backspace => |,4242 => ,4242| => Backspace x4 => ,|0000', () => {
        cy.get('@input')
            .type('0,4242')
            .type('{moveToStart}{rightArrow}')
            .type('{backspace}')
            .should('have.value', ',4242')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0)
            .type('{moveToEnd}')
            .type('{backspace}'.repeat(2))
            .should('have.value', ',4200')
            .should('have.prop', 'selectionStart', ',42'.length)
            .should('have.prop', 'selectionEnd', ',42'.length)
            .type('{backspace}'.repeat(2))
            .should('have.value', ',0000')
            .should('have.prop', 'selectionStart', ','.length)
            .should('have.prop', 'selectionEnd', ','.length);
    });
});
