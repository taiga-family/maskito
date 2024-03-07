import {DemoPath} from '@demo/constants';

import {openNumberPage} from './utils';

describe('Number | Prefix & Postfix', () => {
    describe('[prefix]="$" | [postfix]=" per day"', () => {
        beforeEach(() => {
            cy.visit(
                `/${DemoPath.Number}/API?decimalSeparator=.&thousandSeparator=_&precision=2&prefix=$`,
            );
            cy.get('#demo-content input').should('be.visible').first().as('input');

            cy.get('tr')
                .contains('[postfix]')
                .parents('tr')
                .find('tui-primitive-textfield')
                .type(' per day');

            cy.get('@input')
                .focus()
                .should('have.value', '$ per day')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        describe('thousand separators correctly works with prefix', () => {
            it('Type 1000000', () => {
                cy.get('@input')
                    .type('1000000')
                    .should('have.value', '$1_000_000 per day')
                    .should('have.prop', 'selectionStart', '$1_000_000'.length)
                    .should('have.prop', 'selectionEnd', '$1_000_000'.length);
            });

            it('$1_000_000| per day => Backspace => Backspace x2', () => {
                cy.get('@input')
                    .type('1000000')
                    .type('{backspace}')
                    .should('have.value', '$100_000 per day')
                    .should('have.prop', 'selectionStart', '$100_000'.length)
                    .should('have.prop', 'selectionEnd', '$100_000'.length)
                    .type('{backspace}'.repeat(2))
                    .should('have.value', '$1_000 per day')
                    .should('have.prop', 'selectionStart', '$1_000'.length)
                    .should('have.prop', 'selectionEnd', '$1_000'.length)
                    .type('{backspace}')
                    .should('have.value', '$100 per day')
                    .should('have.prop', 'selectionStart', '$100'.length)
                    .should('have.prop', 'selectionEnd', '$100'.length);
            });

            it('$|1_234 per day => Del => $|234 per day', () => {
                cy.get('@input')
                    .type('1234')
                    .should('have.value', '$1_234 per day')
                    .should('have.prop', 'selectionStart', '$1_234'.length)
                    .should('have.prop', 'selectionEnd', '$1_234'.length)
                    .type('{moveToStart}{del}')
                    .should('have.value', '$234 per day')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            it('$1_2|34 per day => Del => $|234 per day', () => {
                cy.get('@input')
                    .type('1234')
                    .should('have.value', '$1_234 per day')
                    .should('have.prop', 'selectionStart', '$1_234'.length)
                    .should('have.prop', 'selectionEnd', '$1_234'.length)
                    .type('{leftArrow}{leftArrow}{backspace}')
                    .should('have.value', '$134 per day')
                    .should('have.prop', 'selectionStart', '$1'.length)
                    .should('have.prop', 'selectionEnd', '$1'.length);
            });
        });

        it('pads integer part with zero if user types decimal separator (for empty input)', () => {
            cy.get('@input')
                .type('.45')
                .should('have.value', '$0.45 per day')
                .should('have.prop', 'selectionStart', '$0.45'.length)
                .should('have.prop', 'selectionEnd', '$0.45'.length);
        });

        it('precision works', () => {
            cy.get('@input')
                .type('.12345678')
                .should('have.value', '$0.12 per day')
                .should('have.prop', 'selectionStart', '$0.12'.length)
                .should('have.prop', 'selectionEnd', '$0.12'.length);
        });

        describe('it removes repeated leading zeroes for integer part on blur', () => {
            it('Type 000000 => blur => $0| per day', () => {
                cy.get('@input')
                    .type('000000')
                    .should('have.value', '$000_000 per day')
                    .should('have.prop', 'selectionStart', '$000_000'.length)
                    .should('have.prop', 'selectionEnd', '$000_000'.length)
                    .blur()
                    .should('have.value', '$0 per day');
            });

            it('$0| per day => Type 5 => blur => $5| per day', () => {
                cy.get('@input')
                    .type('0')
                    .should('have.value', '$0 per day')
                    .should('have.prop', 'selectionStart', '$0'.length)
                    .should('have.prop', 'selectionEnd', '$0'.length)
                    .type('5')
                    .should('have.value', '$05 per day')
                    .should('have.prop', 'selectionStart', '$05'.length)
                    .should('have.prop', 'selectionEnd', '$05'.length)
                    .blur()
                    .should('have.value', '$5 per day');
            });

            it('$0.|05 per day => Backspace => blur => $|5 per day', () => {
                cy.get('@input')
                    .type('0.05')
                    .type('{leftArrow}'.repeat('05'.length))
                    .type('{backspace}')
                    .should('have.value', '$005 per day')
                    .should('have.prop', 'selectionStart', '$0'.length)
                    .should('have.prop', 'selectionEnd', '$0'.length)
                    .blur()
                    .should('have.value', '$5 per day');
            });
        });

        describe('cannot erase prefix', () => {
            it('Select all + Backspace', () => {
                cy.get('@input')
                    .type('{selectAll}{backspace}')
                    .should('have.value', '$ per day')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            it('$|42 per day => Backspace => $|42 per day', () => {
                cy.get('@input')
                    .type('42')
                    .type('{moveToStart}')
                    .should('have.prop', 'selectionStart', '$'.length)
                    .should('have.prop', 'selectionEnd', '$'.length)
                    .type('{backspace}'.repeat(5))
                    .should('have.value', '$42 per day')
                    .should('have.prop', 'selectionStart', '$'.length)
                    .should('have.prop', 'selectionEnd', '$'.length);
            });
        });

        describe('cannot erase postfix', () => {
            it('Select all + Delete', () => {
                cy.get('@input')
                    .type('{selectAll}{del}')
                    .should('have.value', '$ per day')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            it('$42| per day => Delete x4 => $42| per day', () => {
                cy.get('@input')
                    .type('42')
                    .type('{moveToEnd}')
                    .should('have.prop', 'selectionStart', '$42'.length)
                    .should('have.prop', 'selectionEnd', '$42'.length)
                    .type('{del}'.repeat(4))
                    .should('have.value', '$42 per day')
                    .should('have.prop', 'selectionStart', '$42'.length)
                    .should('have.prop', 'selectionEnd', '$42'.length);
            });
        });

        describe('with maskitoCaretGuard', () => {
            it('$|42 per day => ArrowLeft => $|42 per day', () => {
                cy.get('@input')
                    .type('42')
                    .type('{moveToStart}')
                    .type('{leftArrow}'.repeat(3))
                    .should('have.value', '$42 per day')
                    .should('have.prop', 'selectionStart', '$'.length)
                    .should('have.prop', 'selectionEnd', '$'.length);
            });
        });
    });

    describe('prefix/postfix ends/starts with the same character', () => {
        describe('[prefix]="$_" | [postfix]="_per_day" (with caret guard)', () => {
            beforeEach(() => {
                openNumberPage('prefix=$_&postfix=_per_day');

                cy.get('@input')
                    .should('have.value', '$__per_day')
                    .should('have.prop', 'selectionStart', '$_'.length)
                    .should('have.prop', 'selectionEnd', '$_'.length);
            });

            it('$_|_per_day => Type Backspace => $_|_per_day', () => {
                cy.get('@input')
                    .type('{backspace}')
                    .should('have.value', '$__per_day')
                    .should('have.prop', 'selectionStart', '$_'.length)
                    .should('have.prop', 'selectionEnd', '$_'.length);
            });

            it('$_|_per_day => Type Delete => $_|_per_day', () => {
                cy.get('@input')
                    .type('{del}')
                    .should('have.value', '$__per_day')
                    .should('have.prop', 'selectionStart', '$_'.length)
                    .should('have.prop', 'selectionEnd', '$_'.length);
            });

            it('$_|_per_day => Select all + Delete => $_|_per_day', () => {
                cy.get('@input')
                    .type('{selectAll}{del}')
                    .should('have.value', '$__per_day')
                    .should('have.prop', 'selectionStart', '$_'.length)
                    .should('have.prop', 'selectionEnd', '$_'.length);
            });
        });
    });

    describe('runtime changes of postfix', () => {
        beforeEach(() => {
            cy.visit(DemoPath.Cypress);
            cy.get('#runtime-postfix-changes input')
                .focus()
                .should('have.value', '1 year')
                .as('input');
        });

        it('1| year => Type 0 => 10| years', () => {
            cy.get('@input')
                .type('{moveToStart}{rightArrow}')
                .type('0')
                .should('have.value', '10 years')
                .should('have.prop', 'selectionStart', '10'.length)
                .should('have.prop', 'selectionEnd', '10'.length);
        });

        it('10| years => Backspace => 1| year', () => {
            cy.get('@input')
                .type('{moveToStart}{rightArrow}')
                .type('0')
                .should('have.value', '10 years')
                .type('{backspace}')
                .should('have.value', '1 year')
                .should('have.prop', 'selectionStart', '1'.length)
                .should('have.prop', 'selectionEnd', '1'.length);
        });

        it('select all + delete', () => {
            cy.get('@input')
                .should('have.value', '1 year')
                .type('{selectAll}{del}')
                .should('have.value', '')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });
    });

    describe('multi-character prefix "EUR " (no initial value & no caret guard)', () => {
        beforeEach(() => {
            cy.visit(DemoPath.Cypress);
            cy.get('#multi-character-prefix input')
                .focus()
                .should('have.value', '')
                .as('input');
        });

        ['E', 'U', 'R'].forEach(char => {
            it(`Empty input => Type "${char} => Textfield's value is "EUR "`, () => {
                cy.get('@input')
                    .type(char)
                    .should('have.value', 'EUR ')
                    .should('have.prop', 'selectionStart', 'EUR '.length)
                    .should('have.prop', 'selectionEnd', 'EUR '.length);
            });
        });
    });

    describe('prefix ends with the same character as postfix starts', () => {
        const prefix = 'lbs.​'; // padded with zero-width space

        beforeEach(() => {
            openNumberPage('prefix=lbs.&precision=2');

            cy.get('@input')
                .focus()
                .should('have.value', prefix)
                .should('have.prop', 'selectionStart', prefix.length)
                .should('have.prop', 'selectionEnd', prefix.length);
        });

        it('lbs.| => Type Backspace (attempt to erase zero-width space) => lbs.|', () => {
            cy.get('@input')
                .type('{backspace}')
                .should('have.value', prefix)
                .should('have.prop', 'selectionStart', prefix.length)
                .should('have.prop', 'selectionEnd', prefix.length);
        });

        it('lbs.| => Type 42 => lbs.42|', () => {
            cy.get('@input')
                .type('42')
                .should('have.value', `${prefix}42`)
                .should('have.prop', 'selectionStart', `${prefix}42`.length)
                .should('have.prop', 'selectionEnd', `${prefix}42`.length);
        });

        it('lbs.| => Type .42 => lbs.0.42|', () => {
            cy.get('@input')
                .type('.42')
                .should('have.value', `${prefix}0.42`)
                .should('have.prop', 'selectionStart', `${prefix}0.42`.length)
                .should('have.prop', 'selectionEnd', `${prefix}0.42`.length);
        });

        it('lbs.0|.42 => Backspace + Blur => lbs.0.42', () => {
            cy.get('@input')
                .type('0.42')
                .type('{leftArrow}'.repeat('.42'.length))
                .type('{backspace}')
                .should('have.value', `${prefix}.42`)
                .should('have.prop', 'selectionStart', prefix.length)
                .should('have.prop', 'selectionEnd', prefix.length)
                .blur()
                .wait(100) // to be sure that value is not changed even in case of some async validation
                .should('have.value', `${prefix}0.42`);
        });
    });
});
