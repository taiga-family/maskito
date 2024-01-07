import {openNumberPage} from './utils';

describe('Number | Accepts full width numbers used by JP, CN or others', () => {
    beforeEach(() => {
        openNumberPage('thousandSeparator=_&precision=2');
    });

    describe('Invalid characters', () => {
        it('accepts full width numbers', () => {
            cy.get('@input')
                .type('１ ２  ３   ４    ５')
                .should('have.value', '12_345')
                .should('have.prop', 'selectionStart', '12_345'.length)
                .should('have.prop', 'selectionEnd', '12_345'.length);
        });

        it('accepts full width characters with minus', () => {
            cy.get('@input')
                .type('ー１２３４５６')
                .should('have.value', '−123_456')
                .should('have.prop', 'selectionStart', '−123_456'.length)
                .should('have.prop', 'selectionEnd', '−123_456'.length);
        });

        it('rejects full width characters, not numbers', () => {
            cy.get('@input')
                .type('あいうえお１２３４５こんにちは')
                .should('have.value', '12_345')
                .should('have.prop', 'selectionStart', '12_345'.length)
                .should('have.prop', 'selectionEnd', '12_345'.length);
        });
    });
});
