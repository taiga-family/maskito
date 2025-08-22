import {CHAR_EM_DASH, CHAR_EN_DASH, CHAR_JP_HYPHEN} from 'projects/kit/src/lib/constants';

import {openNumberPage} from './utils';

describe('Number | Minus before prefix', () => {
    describe('[prefix]=["-", "$"] | [minusSign]="-"', () => {
        beforeEach(() => {
            openNumberPage(
                'decimalSeparator=.&thousandSeparator=_&maximumFractionDigits=2&minusSign=-&prefix$=4',
            );
        });

        describe('adds minus even if caret is already placed after prefix', () => {
            it('works with set minus sign', () => {
                cy.get('@input')
                    .focus()
                    .should('have.value', '$')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1)
                    .type('-')
                    .should('have.value', '-$')
                    .should('have.prop', 'selectionStart', '-$'.length)
                    .should('have.prop', 'selectionEnd', '-$'.length);
            });

            describe('works with pseudo minuses', () => {
                [CHAR_EN_DASH, CHAR_EM_DASH, CHAR_JP_HYPHEN].forEach((minus) => {
                    it(minus, () => {
                        cy.get('@input')
                            .focus()
                            .should('have.value', '$')
                            .should('have.prop', 'selectionStart', 1)
                            .should('have.prop', 'selectionEnd', 1)
                            .type(minus)
                            .should('have.value', '-$')
                            .should('have.prop', 'selectionStart', '-$'.length)
                            .should('have.prop', 'selectionEnd', '-$'.length);
                    });
                });
            });
        });

        describe('thousand separators correctly works with leading minus + prefix', () => {
            it('Type 123456789', () => {
                cy.get('@input')
                    .type('-123456789')
                    .should('have.value', '-$123_456_789')
                    .should('have.prop', 'selectionStart', '-$123_456_789'.length)
                    .should('have.prop', 'selectionEnd', '-$123_456_789'.length);
            });

            it('$1_000_000| per day => Backspace => Backspace x2', () => {
                cy.get('@input')
                    .type('-123456789')
                    .type('{backspace}')
                    .should('have.value', '-$12_345_678')
                    .should('have.prop', 'selectionStart', '-$12_345_678'.length)
                    .should('have.prop', 'selectionEnd', '-$12_345_678'.length)
                    .type('{backspace}'.repeat(2))
                    .should('have.value', '-$123_456')
                    .should('have.prop', 'selectionStart', '-$123_456'.length)
                    .should('have.prop', 'selectionEnd', '-$123_456'.length)
                    .type('{backspace}'.repeat(3))
                    .should('have.value', '-$123')
                    .should('have.prop', 'selectionStart', '-$123'.length)
                    .should('have.prop', 'selectionEnd', '-$123'.length);
            });

            it('-$|1_234 => Del => -$|234', () => {
                cy.get('@input')
                    .type('-1234')
                    .should('have.value', '-$1_234')
                    .should('have.prop', 'selectionStart', '-$1_234'.length)
                    .should('have.prop', 'selectionEnd', '-$1_234'.length)
                    .type('{moveToStart}{del}')
                    .should('have.value', '-$234')
                    .should('have.prop', 'selectionStart', '-$'.length)
                    .should('have.prop', 'selectionEnd', '-$'.length);
            });

            it('$1_2|34 => Backspace => $|234', () => {
                cy.get('@input')
                    .type('-1234')
                    .should('have.value', '-$1_234')
                    .should('have.prop', 'selectionStart', '-$1_234'.length)
                    .should('have.prop', 'selectionEnd', '-$1_234'.length)
                    .type('{leftArrow}'.repeat(2))
                    .type('{backspace}')
                    .should('have.value', '-$134')
                    .should('have.prop', 'selectionStart', '-$1'.length)
                    .should('have.prop', 'selectionEnd', '-$1'.length);
            });
        });

        it('pads integer part with zero if user types decimal separator (for empty input)', () => {
            cy.get('@input')
                .type('-.')
                .should('have.value', '-$0.')
                .should('have.prop', 'selectionStart', '-$0.'.length)
                .should('have.prop', 'selectionEnd', '-$0.'.length)
                .type('42')
                .should('have.value', '-$0.42')
                .should('have.prop', 'selectionStart', '-$0.42'.length)
                .should('have.prop', 'selectionEnd', '-$0.42'.length);
        });

        it('[maximumFractionDigits] works', () => {
            cy.get('@input')
                .type('-.12345678')
                .should('have.value', '-$0.12')
                .should('have.prop', 'selectionStart', '-$0.12'.length)
                .should('have.prop', 'selectionEnd', '-$0.12'.length);
        });

        describe('it removes repeated leading zeroes for integer part on blur', () => {
            it('Type -000005 => blur => -$5|', () => {
                cy.get('@input')
                    .type('-000005')
                    .should('have.value', '-$000_005')
                    .should('have.prop', 'selectionStart', '-$000_005'.length)
                    .should('have.prop', 'selectionEnd', '-$000_005'.length)
                    .blur()
                    .should('have.value', '-$5');
            });

            it('-$0.|05 per day => Backspace => blur => $|5 per day', () => {
                cy.get('@input')
                    .type('-0.05')
                    .type('{leftArrow}'.repeat('05'.length))
                    .type('{backspace}')
                    .should('have.value', '-$005')
                    .should('have.prop', 'selectionStart', '-$0'.length)
                    .should('have.prop', 'selectionEnd', '-$0'.length)
                    .blur()
                    .should('have.value', '-$5');
            });
        });

        describe('minus sign is erasable but prefix is non-removable', () => {
            it('Select all + Backspace', () => {
                cy.get('@input')
                    .type('-123')
                    .type('{selectAll}{backspace}')
                    .should('have.value', '-$')
                    .should('have.prop', 'selectionStart', 2)
                    .should('have.prop', 'selectionEnd', 2);
            });

            it('-$|42 => Backspace => $|42', () => {
                cy.get('@input')
                    .type('-42')
                    .type('{moveToStart}')
                    .should('have.value', '-$42')
                    .should('have.prop', 'selectionStart', '-$'.length)
                    .should('have.prop', 'selectionEnd', '-$'.length)
                    .type('{backspace}')
                    .should('have.value', '$42')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1)
                    .type('{backspace}'.repeat(5))
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            it('$|42 => Backspace x5 => $|42', () => {
                cy.get('@input')
                    .type('42')
                    .type('{moveToStart}')
                    .should('have.value', '$42')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1)
                    .type('{backspace}'.repeat(5))
                    .should('have.value', '$42')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            it('$| => Backspace x5 => $|', () => {
                cy.get('@input')
                    .focus()
                    .should('have.value', '$')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1)
                    .type('{backspace}'.repeat(5))
                    .should('have.value', '$')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            it('-$| => Backspace => $|', () => {
                cy.get('@input')
                    .type('-')
                    .should('have.value', '-$')
                    .should('have.prop', 'selectionStart', '-$'.length)
                    .should('have.prop', 'selectionEnd', '-$'.length)
                    .type('{backspace}')
                    .should('have.value', '$')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });
        });

        it('-$|42 => ArrowLeft => -$|42', () => {
            cy.get('@input')
                .type('-42')
                .type('{moveToStart}')
                .type('{leftArrow}'.repeat(3))
                .should('have.value', '-$42')
                .should('have.prop', 'selectionStart', '-$'.length)
                .should('have.prop', 'selectionEnd', '-$'.length);
        });
    });
});
