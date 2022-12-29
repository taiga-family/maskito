import {openNumberPage} from './utils';

describe('Number | precision', () => {
    describe('forbids to type more fractional digits than `precision` (it is equal to 4)', () => {
        beforeEach(() => {
            openNumberPage('decimalSeparator=,&precision=4');
        });

        it('Empty input => Type 0,123456789 => 0,1234', () => {
            cy.get('@input')
                .type('0,1234')
                .should('have.value', '0,1234')
                .should('have.prop', 'selectionStart', '0,1234'.length)
                .should('have.prop', 'selectionEnd', '0,1234'.length);
        });

        it('Empty input => Type 0,4242000000 => 0,4242', () => {
            cy.get('@input')
                .type('0,4242000000')
                .should('have.value', '0,4242')
                .should('have.prop', 'selectionStart', '0,4242'.length)
                .should('have.prop', 'selectionEnd', '0,4242'.length);
        });

        it('Empty input => Type 0,42420000001 => 0,4242', () => {
            cy.get('@input')
                .type('0,42420000001')
                .should('have.value', '0,4242')
                .should('have.prop', 'selectionStart', '0,4242'.length)
                .should('have.prop', 'selectionEnd', '0,4242'.length);
        });

        [',', '.', 'б', 'ю'].forEach(separator => {
            it(`123|456789 => Type ${separator} => 123,4567`, () => {
                cy.get('@input')
                    .type('123|456789')
                    .type('{moveToStart}')
                    .type('{rightArrow}'.repeat(3))
                    .should('have.value', '123 456 789')
                    .should('have.prop', 'selectionStart', '123'.length)
                    .should('have.prop', 'selectionEnd', '123'.length)
                    .type(separator)
                    .should('have.value', '123,4567')
                    .should('have.prop', 'selectionStart', '123,'.length)
                    .should('have.prop', 'selectionEnd', '123,'.length);
            });
        });
    });

    describe('rejects decimal separator if `precision` is equal to 0', () => {
        beforeEach(() => {
            openNumberPage('decimalSeparator=,&precision=0');
        });

        it('empty input => Type "," => Empty input', () => {
            cy.get('@input').type(',').should('have.value', '');
        });

        it('Type "5," => "5"', () => {
            cy.get('@input')
                .type('5,')
                .should('have.value', '5')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });
    });
});
