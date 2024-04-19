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
            .type('{leftArrow}'.repeat(2))
            .should('have.value', '123.1432')
            .should('have.a.prop', 'selectionStart', '123.14'.length)
            .should('have.a.prop', 'selectionEnd', '123.14'.length)
            .realPress([
                'Shift',
                ...new Array('3.14'.length).fill('ArrowLeft'),
                'Backspace',
            ]);

        cy.get('@input')
            .should('have.value', '12.3200')
            .should('have.a.prop', 'selectionStart', '12'.length)
            .should('have.a.prop', 'selectionEnd', '12'.length);
    });

    it(
        '12|3_123_1|23.0000 => backspace => 1_2|23.0000',
        BROWSER_SUPPORTS_REAL_EVENTS,
        () => {
            cy.get('@input')
                .type('123123123')
                .type('{moveToStart}{rightArrow}{rightArrow}')
                .should('have.value', '123_123_123.0000')
                .should('have.a.prop', 'selectionStart', '12'.length)
                .should('have.a.prop', 'selectionEnd', '12'.length)
                .realPress([
                    'Shift',
                    ...new Array('3_123_1'.length).fill('ArrowRight'),
                    'Backspace',
                ]);

            cy.get('@input')
                .should('have.value', '1_223.0000')
                .should('have.a.prop', 'selectionStart', '1_2'.length)
                .should('have.a.prop', 'selectionEnd', '1_2'.length);
        },
    );

    it('123.|104|3 => backspace => 123.|3000', BROWSER_SUPPORTS_REAL_EVENTS, () => {
        cy.get('@input')
            .type('123.1043')
            .type('{moveToEnd}{leftArrow}')
            .should('have.value', '123.1043')
            .should('have.a.prop', 'selectionStart', '123.104'.length)
            .should('have.a.prop', 'selectionEnd', '123.104'.length)
            .realPress(['Shift', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'Backspace']);

        cy.get('@input')
            .should('have.value', '123.3000')
            .should('have.a.prop', 'selectionStart', '123.'.length)
            .should('have.a.prop', 'selectionEnd', '123.'.length);
    });

    it('|12_332.1021| => backspace => empty', () => {
        cy.get('@input')
            .type('12332.1021')
            .should('have.value', '12_332.1021')
            .type('{selectAll}{backspace}')
            .should('have.value', '');
    });
});
