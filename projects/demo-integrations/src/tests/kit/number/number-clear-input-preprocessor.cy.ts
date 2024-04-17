import {BROWSER_SUPPORTS_REAL_EVENTS} from 'projects/demo-integrations/src/support/constants';

import {openNumberPage} from './utils';

describe('Number | clearInputPreprocessor', () => {
    beforeEach(() => {
        openNumberPage(
            'thousandSeparator=_&precision=4&decimalZeroPadding=true&minusSign=-',
        );
    });

    it('12|.3014 => backspace * 2 => |.3014 => moveToEnd + backspace => .301|0 => backspace => .30|00 => backspace => .3|000 => backspace => .|0000 => backspace => empty', () => {
        cy.get('@input')
            .type('12.3014')
            .should('have.value', '12.3014')
            .type('{moveToStart}{rightArrow}{rightArrow}')
            .should('have.a.prop', 'selectionStart', 2)
            .should('have.a.prop', 'selectionEnd', 2)
            .type('{backspace}')
            .should('have.value', '1.3014')
            .should('have.a.prop', 'selectionStart', 1)
            .should('have.a.prop', 'selectionEnd', 1)
            .type('{backspace}')
            .should('have.value', '.3014')
            .should('have.a.prop', 'selectionStart', 0)
            .should('have.a.prop', 'selectionEnd', 0)
            .type('{moveToEnd}{backspace}')
            .should('have.value', '.3010')
            .should('have.a.prop', 'selectionStart', 4)
            .should('have.a.prop', 'selectionEnd', 4)
            .type('{backspace}')
            .should('have.value', '.3000')
            .should('have.a.prop', 'selectionStart', 3)
            .should('have.a.prop', 'selectionEnd', 3)
            .type('{backspace}')
            .should('have.value', '.3000')
            .should('have.a.prop', 'selectionStart', 2)
            .should('have.a.prop', 'selectionEnd', 2)
            .type('{backspace}')
            .should('have.value', '.0000')
            .should('have.a.prop', 'selectionStart', 1)
            .should('have.a.prop', 'selectionEnd', 1)
            .type('{backspace}')
            .should('have.value', '')
            .should('have.a.prop', 'selectionStart', 0)
            .should('have.a.prop', 'selectionEnd', 0);
    });

    it('-2|.0000 => backspace => - => backspace => empty', () => {
        cy.get('@input')
            .type('-2')
            .should('have.value', '-2.0000')
            .should('have.a.prop', 'selectionStart', 2)
            .should('have.a.prop', 'selectionEnd', 2)
            .type('{backspace}')
            .should('have.value', '-')
            .should('have.a.prop', 'selectionStart', 1)
            .should('have.a.prop', 'selectionEnd', 1)
            .type('{backspace}')
            .should('have.value', '')
            .should('have.a.prop', 'selectionStart', 0)
            .should('have.a.prop', 'selectionEnd', 0);
    });

    it('12|3.14|32 => backspace => 12|.3200', BROWSER_SUPPORTS_REAL_EVENTS, () => {
        cy.get('@input')
            .type('123.1432')
            .type('{leftArrow}{leftArrow}')
            .should('have.value', '123.1432')
            .should('have.a.prop', 'selectionStart', 6)
            .should('have.a.prop', 'selectionEnd', 6)
            .realPress([
                'Shift',
                'ArrowLeft',
                'ArrowLeft',
                'ArrowLeft',
                'ArrowLeft',
                'Backspace',
            ]);

        cy.get('@input')
            .should('have.value', '12.3200')
            .should('have.a.prop', 'selectionStart', 2)
            .should('have.a.prop', 'selectionEnd', 2);
    });

    it(
        '12|3_123_1|23.0000 => backspace => 1_2|23.0000',
        BROWSER_SUPPORTS_REAL_EVENTS,
        () => {
            cy.get('@input')
                .type('123123123{moveToStart}{rightArrow}{rightArrow}')
                .should('have.value', '123_123_123.0000')
                .should('have.a.prop', 'selectionStart', 2)
                .should('have.a.prop', 'selectionEnd', 2)
                .realPress([
                    'Shift',
                    'ArrowRight',
                    'ArrowRight',
                    'ArrowRight',
                    'ArrowRight',
                    'ArrowRight',
                    'ArrowRight',
                    'ArrowRight',
                    'Backspace',
                ]);

            cy.get('@input')
                .should('have.value', '1_223.0000')
                .should('have.a.prop', 'selectionStart', 3)
                .should('have.a.prop', 'selectionEnd', 3);
        },
    );

    it('123.|104|3 => backspace => 123.|3000', BROWSER_SUPPORTS_REAL_EVENTS, () => {
        cy.get('@input')
            .type('123.1043{moveToEnd}{leftArrow}')
            .should('have.value', '123.1043')
            .should('have.a.prop', 'selectionStart', 7)
            .should('have.a.prop', 'selectionEnd', 7)
            .realPress(['Shift', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'Backspace']);

        cy.get('@input')
            .should('have.value', '123.3000')
            .should('have.a.prop', 'selectionStart', 4)
            .should('have.a.prop', 'selectionEnd', 4);
    });

    it('|12_332.1021| => backspace => empty', () => {
        cy.get('@input')
            .type('12332.1021')
            .should('have.value', '12_332.1021')
            .type('{selectAll}{backspace}')
            .should('have.value', '');
    });
});
