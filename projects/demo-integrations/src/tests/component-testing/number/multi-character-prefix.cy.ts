import {maskitoNumberOptionsGenerator} from '@maskito/kit';

import {TestInput} from '../utils';

describe('Number | multi-character prefix "EUR " (no initial value & no caret guard)', () => {
    beforeEach(() => {
        cy.mount(TestInput, {
            componentProperties: {
                maskitoOptions: maskitoNumberOptionsGenerator({prefix: 'EUR '}),
            },
        });
        cy.get('input').focus().should('have.value', '').as('input');
    });

    ['E', 'U', 'R'].forEach((char) => {
        it(`Empty input => Type "${char} => Textfield's value is "EUR "`, () => {
            cy.get('@input')
                .type(char)
                .should('have.value', 'EUR ')
                .should('have.prop', 'selectionStart', 'EUR '.length)
                .should('have.prop', 'selectionEnd', 'EUR '.length);
        });
    });
});
