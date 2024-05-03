import {openNumberPage} from './utils';

describe('Number | Zero integer part', () => {
    describe('User types decimal separator when input is empty (decimalSeparator="," && precision=2)', () => {
        describe('without prefix / postfix', () => {
            beforeEach(() => {
                openNumberPage('thousandSeparator=_&decimalSeparator=,&precision=2');
            });

            it('Empty input => Type "," (decimal separator) => value is equal "0,"', () => {
                cy.get('@input')
                    .type(',')
                    .should('have.value', '0,')
                    .should('have.prop', 'selectionStart', '0,'.length)
                    .should('have.prop', 'selectionEnd', '0,'.length);
            });

            it('Input has only minus sign => Type "," (decimal separator) => value is equal "-0,|"', () => {
                cy.get('@input')
                    .type('-,')
                    .should('have.value', '−0,')
                    .should('have.prop', 'selectionStart', '−0,'.length)
                    .should('have.prop', 'selectionEnd', '−0,'.length);
            });

            it('Empty input => Type "." (pseudo decimal separator) => value is equal "0,"', () => {
                cy.get('@input')
                    .type('.')
                    .should('have.value', '0,')
                    .should('have.prop', 'selectionStart', '0,'.length)
                    .should('have.prop', 'selectionEnd', '0,'.length);
            });

            it('Input has only minus sign => Type "." (pseudo decimal separator) => value is equal "-0,|"', () => {
                cy.get('@input')
                    .type('-.')
                    .should('have.value', '−0,')
                    .should('have.prop', 'selectionStart', '−0,'.length)
                    .should('have.prop', 'selectionEnd', '−0,'.length);
            });

            it('Empty input => Type "ю" (pseudo decimal separator) => value is equal "0,"', () => {
                cy.get('@input')
                    .type('ю')
                    .should('have.value', '0,')
                    .should('have.prop', 'selectionStart', '0,'.length)
                    .should('have.prop', 'selectionEnd', '0,'.length);
            });

            it('Empty input => Type "ю" (pseudo decimal separator) => value is equal "-0,"', () => {
                cy.get('@input')
                    .type('-ю')
                    .should('have.value', '−0,')
                    .should('have.prop', 'selectionStart', '−0,'.length)
                    .should('have.prop', 'selectionEnd', '−0,'.length);
            });

            it('Textfield with any value => Select all => Type decimal separator => value is equal "0,"', () => {
                cy.get('@input')
                    .type(',')
                    .should('have.value', '0,')
                    .type('{selectall}')
                    .type(',')
                    .should('have.value', '0,')
                    .should('have.prop', 'selectionStart', '0,'.length)
                    .should('have.prop', 'selectionEnd', '0,'.length);
            });

            it('Textfield with any value => Select all => Type "." (pseudo decimal separator) => value is equal "0,"', () => {
                cy.get('@input')
                    .type('1,23')
                    .should('have.value', '1,23')
                    .type('{selectall}')
                    .type('.')
                    .should('have.value', '0,')
                    .should('have.prop', 'selectionStart', '0,'.length)
                    .should('have.prop', 'selectionEnd', '0,'.length);
            });
        });

        describe('With prefix ($) & postfix (%)', () => {
            beforeEach(() => {
                openNumberPage(
                    'thousandSeparator=_&decimalSeparator=,&precision=2&prefix=$&postfix=kg',
                );

                cy.get('@input')
                    .focused()
                    .should('have.value', '$kg')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            it('Empty value (only prefix & postfix) => Type "," (decimal separator) => value is equal "0,"', () => {
                cy.get('@input')
                    .type(',')
                    .should('have.value', '$0,kg')
                    .should('have.prop', 'selectionStart', '$0,'.length)
                    .should('have.prop', 'selectionEnd', '$0,'.length);
            });

            it('Empty value (only prefix & postfix) => Type "." (pseudo decimal separator) => value is equal "0,"', () => {
                cy.get('@input')
                    .type('.')
                    .should('have.value', '$0,kg')
                    .should('have.prop', 'selectionStart', '$0,'.length)
                    .should('have.prop', 'selectionEnd', '$0,'.length);
            });

            it('Textfield with any value => Select all => Type decimal separator => value is equal "$0,kg"', () => {
                cy.get('@input')
                    .type('1,23')
                    .should('have.value', '$1,23kg')
                    .type('{selectall}')
                    .type(',')
                    .should('have.value', '$0,kg')
                    .should('have.prop', 'selectionStart', '$0,'.length)
                    .should('have.prop', 'selectionEnd', '$0,'.length);
            });

            it('Textfield with any value => Select all => Type pseudo decimal separator => value is equal "$0,kg"', () => {
                cy.get('@input')
                    .type('1,23')
                    .should('have.value', '$1,23kg')
                    .type('{selectall}')
                    .type('.')
                    .should('have.value', '$0,kg')
                    .should('have.prop', 'selectionStart', '$0,'.length)
                    .should('have.prop', 'selectionEnd', '$0,'.length);
            });
        });
    });

    describe('value cannot contain many leading zeroes after blur event', () => {
        it('precision = 2 & positive number', () => {
            openNumberPage('thousandSeparator=_&precision=2');

            cy.get('@input')
                .type('0000000')
                .should('have.value', '0_000_000')
                .should('have.prop', 'selectionStart', '0_000_000'.length)
                .should('have.prop', 'selectionEnd', '0_000_000'.length)
                .blur()
                .should('have.value', '0');
        });

        it('precision = 2 & negative number', () => {
            openNumberPage('thousandSeparator=_&precision=2');

            cy.get('@input')
                .type('-00000006')
                .should('have.value', '−00_000_006')
                .should('have.prop', 'selectionStart', '−00_000_006'.length)
                .should('have.prop', 'selectionEnd', '−00_000_006'.length)
                .blur()
                .should('have.value', '−6');
        });

        it('precision = 0', () => {
            openNumberPage('thousandSeparator=_&precision=0');

            cy.get('@input')
                .type('0000000')
                .should('have.value', '0_000_000')
                .should('have.prop', 'selectionStart', '0_000_000'.length)
                .should('have.prop', 'selectionEnd', '0_000_000'.length)
                .blur()
                .should('have.value', '0');
        });

        it('1|-000-000 => Backspace => blur => 0', () => {
            openNumberPage('thousandSeparator=_&precision=2');

            cy.get('@input')
                .type('1000000')
                .should('have.value', '1_000_000')
                .type('{moveToStart}{rightArrow}')
                .type('{backspace}')
                .should('have.value', '000_000')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0)
                .blur()
                .should('have.value', '0');
        });

        it('remove leading zeroes (on blur only!) when decimal separator is removed (positive number)', () => {
            openNumberPage('thousandSeparator=_&decimalSeparator=,&precision=5');

            cy.get('@input')
                .type('0,0005')
                .type('{moveToStart}{rightArrow}{rightArrow}')
                .type('{backspace}')
                .should('have.value', '00_005')
                .should('have.prop', 'selectionStart', '00'.length)
                .should('have.prop', 'selectionEnd', '00'.length)
                .blur()
                .should('have.value', '5');
        });

        it('remove leading zeroes (on blur only!) when decimal separator is removed (negative number)', () => {
            openNumberPage('thousandSeparator=_&decimalSeparator=,&precision=5');

            cy.get('@input')
                .type('-0,0005')
                .type('{moveToStart}')
                .type('{rightArrow}'.repeat('-0,'.length))
                .type('{backspace}')
                .should('have.value', '−00_005')
                .should('have.prop', 'selectionStart', '-00'.length)
                .should('have.prop', 'selectionEnd', '-00'.length)
                .blur()
                .should('have.value', '−5');
        });
    });

    describe('pads empty integer part with zero on blur (if decimal part exists)', () => {
        describe('Without prefix', () => {
            it('Positive number & decimal separator is comma', () => {
                openNumberPage('decimalSeparator=,&precision=2');

                cy.get('@input')
                    .type('1,23')
                    .type('{moveToStart}{rightArrow}{backspace}')
                    .blur()
                    .should('have.value', '0,23');

                cy.get('@input')
                    .parents('tui-input')
                    .should('have.ngControlValue', '0,23');
            });

            it('Negative number & decimal separator is dot', () => {
                openNumberPage('decimalSeparator=.&precision=2');

                cy.get('@input')
                    .type('-1.23')
                    .type('{leftArrow}'.repeat('.23'.length))
                    .type('{backspace}')
                    .blur()
                    .should('have.value', '−0.23');

                cy.get('@input')
                    .parents('tui-input')
                    .should('have.ngControlValue', '−0.23');
            });
        });

        describe('With prefix', () => {
            it('Positive number & decimal separator is dot', () => {
                openNumberPage('decimalSeparator=.&precision=2&prefix=$');

                cy.get('@input')
                    .type('1.23')
                    .type('{leftArrow}'.repeat('.23'.length))
                    .type('{backspace}')
                    .blur()
                    .should('have.value', '$0.23');

                cy.get('@input')
                    .parents('tui-input')
                    .should('have.ngControlValue', '$0.23');
            });

            it('Negative number & decimal separator is comma', () => {
                openNumberPage('decimalSeparator=,&prefix=>&precision=2');

                cy.get('@input')
                    .type('-1,23')
                    .type('{leftArrow}'.repeat(',23'.length))
                    .type('{backspace}')
                    .blur()
                    .should('have.value', '>−0,23');

                cy.get('@input')
                    .parents('tui-input')
                    .should('have.ngControlValue', '>−0,23');
            });
        });
    });
});
