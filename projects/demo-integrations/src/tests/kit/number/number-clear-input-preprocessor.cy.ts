import {BROWSER_SUPPORTS_REAL_EVENTS} from 'projects/demo-integrations/src/support/constants';

import {openNumberPage} from './utils';

describe('Number | clearInputPreprocessor', () => {
    beforeEach(() => {
        openNumberPage(
            'thousandSeparator=_&precision=4&decimalZeroPadding=true&minusSign=-',
        );
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
