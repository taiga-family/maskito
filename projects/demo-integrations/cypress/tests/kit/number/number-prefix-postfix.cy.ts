import {DemoPath} from '@demo/constants';

import {BROWSER_SUPPORTS_REAL_EVENTS} from '../../../support/constants';
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

        describe('[prefix]="$ " | [postfix]=" per day" (without caret guard)', () => {
            beforeEach(() => {
                cy.visit(DemoPath.Cypress);
                cy.get('#mirrored-prefix-postfix input')
                    .focus()
                    .type('{selectAll}{del}')
                    .should('have.value', '$  per day')
                    .should('have.prop', 'selectionStart', '$ '.length)
                    .should('have.prop', 'selectionEnd', '$ '.length)
                    .as('input');
            });

            it('$  per day| => Type Backspace => $  per da|y', () => {
                cy.get('@input')
                    .type('{moveToEnd}')
                    .type('{backspace}')
                    .should('have.value', '$  per day')
                    .should('have.prop', 'selectionStart', '$  per da'.length)
                    .should('have.prop', 'selectionEnd', '$  per da'.length);
            });

            it('$  per da|y => Type Backspace => $  per d|ay', () => {
                cy.get('@input')
                    .type('{moveToEnd}{leftArrow}')
                    .type('{backspace}')
                    .should('have.value', '$  per day')
                    .should('have.prop', 'selectionStart', '$  per d'.length)
                    .should('have.prop', 'selectionEnd', '$  per d'.length);
            });

            it(
                '$  p|er |day => Type Backspace => $  p|er da|y',
                BROWSER_SUPPORTS_REAL_EVENTS,
                () => {
                    cy.get('@input')
                        .type('{moveToEnd}')
                        .type('{leftArrow}'.repeat('day'.length))
                        .realPress(['Shift', ...Array('1.1'.length).fill('ArrowLeft')]);

                    cy.get('@input')
                        .type('{backspace}')
                        .should('have.value', '$  per day')
                        .should('have.prop', 'selectionStart', '$  p'.length)
                        .should('have.prop', 'selectionEnd', '$  p'.length);
                },
            );
        });
    });
});
