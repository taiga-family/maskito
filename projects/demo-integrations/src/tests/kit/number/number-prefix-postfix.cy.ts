import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_MINUS,
} from 'projects/kit/src/lib/constants';

import {openNumberPage} from './utils';

describe('Number | Prefix & Postfix', () => {
    describe('[prefix]="$" | [postfix]=" per day"', () => {
        beforeEach(() => {
            openNumberPage(
                'decimalSeparator=.&thousandSeparator=_&maximumFractionDigits=2&prefix=$',
            );

            cy.get('tr')
                .contains('[postfix]')
                .parents('tr')
                .find('input')
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

        it('[maximumFractionDigits] works', () => {
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

    describe('prefix ends with the same character as postfix starts', () => {
        const prefix = 'lbs.​'; // padded with zero-width space

        beforeEach(() => {
            openNumberPage('prefix=lbs.&maximumFractionDigits=2');

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

    describe('non-erasable minus (as [prefix]) for [max] <= 0', () => {
        beforeEach(() => {
            openNumberPage(`prefix=${encodeURIComponent(CHAR_MINUS)}&max=0`);
        });

        it('shows minus sign on focus', () => {
            cy.get('@input').focus().should('have.value', CHAR_MINUS);
        });

        it('hides minus sign on blur', () => {
            cy.get('@input')
                .focus()
                .should('have.value', CHAR_MINUS)
                .blur()
                .should('have.value', '');
        });

        it('forbids to enter more minuses', () => {
            cy.get('@input')
                .focus()
                .type(CHAR_MINUS + CHAR_HYPHEN + CHAR_EN_DASH + CHAR_EM_DASH)
                .should('have.value', CHAR_MINUS);
        });

        it('allows to enter 123 => Textfield value is -123', () => {
            cy.get('@input').focus().type('123').should('have.value', `${CHAR_MINUS}123`);
        });

        it('Enter 123 and blur', () => {
            cy.get('@input')
                .focus()
                .type('123')
                .blur()
                .should('have.value', `${CHAR_MINUS}123`);
        });

        describe('forbids all attempts to erase minus sign', () => {
            it('Select all + Backspace', () => {
                cy.get('@input')
                    .focus()
                    .type('{selectAll}{backspace}')
                    .should('have.value', CHAR_MINUS)
                    .type('123')
                    .should('have.value', `${CHAR_MINUS}123`)
                    .type('{selectAll}{backspace}')
                    .should('have.value', CHAR_MINUS);
            });

            it('Select all + Delete', () => {
                cy.get('@input')
                    .focus()
                    .type('{selectAll}{del}')
                    .should('have.value', CHAR_MINUS)
                    .type('123')
                    .should('have.value', `${CHAR_MINUS}123`)
                    .type('{selectAll}{del}')
                    .should('have.value', CHAR_MINUS);
            });

            it('Backspace', () => {
                cy.get('@input')
                    .focus()
                    .type('123')
                    .should('have.value', `${CHAR_MINUS}123`)
                    .type('{backspace}'.repeat(10))
                    .should('have.value', CHAR_MINUS);
            });
        });

        it('Impossible to move caret before minus sign', () => {
            cy.get('@input')
                .focus()
                .should('have.value', CHAR_MINUS)
                .type('{moveToStart}')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1)
                .type('{leftArrow}')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });
    });

    describe('postfix consists of many characters `lbs_per_day`', () => {
        it('Paste 100 + incomplete postfix', () => {
            openNumberPage('postfix=lbs_per_day');

            cy.get('@input')
                .focus()
                .should('have.value', 'lbs_per_day')
                .paste('100lbs')
                .should('have.value', '100lbs_per_day')
                .should('have.prop', 'selectionStart', '100'.length)
                .should('have.prop', 'selectionEnd', '100'.length);
        });
    });

    describe('postfix starts with point and contains digits ([postfix]=".000 km" & [maximumFractionDigits]="0")`', () => {
        beforeEach(() => {
            openNumberPage(
                'postfix=.000%20km&maximumFractionDigits=0&decimalSeparator=,',
            );
        });

        it('Adds postfix on focus', () => {
            cy.get('@input')
                .focus()
                .should('have.value', '.000 km')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('Removes postfix on blur (for empty value)', () => {
            cy.get('@input')
                .focus()
                .should('have.value', '.000 km')
                .blur()
                .should('have.value', '');
        });

        it('Type 1 => 1.000 km', () => {
            cy.get('@input')
                .focus()
                .type('1')
                .should('have.value', '1.000 km')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('Type 123 => 123.000 km', () => {
            cy.get('@input')
                .focus()
                .type('123')
                .should('have.value', '123.000 km')
                .should('have.prop', 'selectionStart', 3)
                .should('have.prop', 'selectionEnd', 3);
        });

        it('Type 123456789 => 123 456 789.000 km', () => {
            cy.get('@input')
                .focus()
                .type('123456789')
                .should('have.value', '123 456 789.000 km')
                .should('have.prop', 'selectionStart', '123 456 789'.length)
                .should('have.prop', 'selectionEnd', '123 456 789'.length);
        });

        it('Type 100 => 100.000 km', () => {
            cy.get('@input')
                .focus()
                .type('100')
                .should('have.value', '100.000 km')
                .should('have.prop', 'selectionStart', '100'.length)
                .should('have.prop', 'selectionEnd', '100'.length);
        });

        it('1|.000 km => Backspace => |.000 km', () => {
            cy.get('@input')
                .focus()
                .type('1')
                .should('have.value', '1.000 km')
                .type('{backspace}')
                .should('have.value', '.000 km')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('|1.000 km => Delete => |.000 km', () => {
            cy.get('@input')
                .focus()
                .type('1')
                .type('{moveToStart}')
                .should('have.value', '1.000 km')
                .type('{del}')
                .should('have.value', '.000 km')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('123.000 km => select all + Delete => |.000 km', () => {
            cy.get('@input')
                .focus()
                .type('123')
                .should('have.value', '123.000 km')
                .type('{selectAll}{del}')
                .should('have.value', '.000 km')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('Allows to enter leading zeroes', () => {
            cy.get('@input')
                .focus()
                .type('000')
                .should('have.value', '000.000 km')
                .should('have.prop', 'selectionStart', '000'.length)
                .should('have.prop', 'selectionEnd', '000'.length);
        });

        it('Removes duplicated leading zeroes on blur', () => {
            cy.get('@input')
                .focus()
                .type('000')
                .should('have.value', '000.000 km')
                .blur()
                .should('have.value', '0.000 km');
        });

        it('Ignores typing decimal separator (.) at start', () => {
            cy.get('@input')
                .focus()
                .should('have.value', '.000 km')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0)
                .type('.')
                .should('have.value', '.000 km')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('Non-digit characters are ignored', () => {
            cy.get('@input')
                .focus()
                .type('abc!@#')
                .should('have.value', '.000 km')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('123.000 km => Select all + Type 4 => 4.000 km', () => {
            cy.get('@input')
                .focus()
                .type('123')
                .should('have.value', '123.000 km')
                .type('{selectAll}4')
                .should('have.value', '4.000 km')
                .should('have.prop', 'selectionStart', '4'.length)
                .should('have.prop', 'selectionEnd', '4'.length);
        });

        it('Caret guard: cannot move caret into postfix', () => {
            cy.get('@input')
                .focus()
                .type('123')
                .should('have.value', '123.000 km')
                .type('{moveToEnd}')
                .should('have.prop', 'selectionStart', '123'.length)
                .should('have.prop', 'selectionEnd', '123'.length)
                .type('{rightArrow}'.repeat(5))
                .should('have.prop', 'selectionStart', '123'.length)
                .should('have.prop', 'selectionEnd', '123'.length);
        });

        it('|.000 km => Backspace keeps value and caret', () => {
            cy.get('@input')
                .focus()
                .should('have.value', '.000 km')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0)
                .type('{backspace}'.repeat(5))
                .should('have.value', '.000 km')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('|.000 km => Delete keeps value and caret', () => {
            cy.get('@input')
                .focus()
                .should('have.value', '.000 km')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0)
                .type('{del}')
                .should('have.value', '.000 km')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('Paste with leading text: abc123 => 123.000 km', () => {
            cy.get('@input')
                .focus()
                .paste('abc123')
                .should('have.value', '123.000 km')
                .should('have.prop', 'selectionStart', '123'.length)
                .should('have.prop', 'selectionEnd', '123'.length);
        });
    });
});
