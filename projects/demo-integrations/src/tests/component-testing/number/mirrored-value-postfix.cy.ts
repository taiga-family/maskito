import {maskitoNumberOptionsGenerator} from '@maskito/kit';

import {TestInput} from '../utils';

describe('Number | [postfix]=" EUR" (no initial value & no caret guard)', () => {
    beforeEach(() => {
        cy.mount(TestInput, {
            componentProperties: {
                initialValue: '',
                maskitoOptions: maskitoNumberOptionsGenerator({
                    postfix: ' EUR',
                    precision: 2,
                }),
            },
        });
        cy.get('input').focus().should('have.value', '').as('input');
    });

    it('Empty input => Paste "11.22 " => Textfield\'s value is "11.22 EUR"', () => {
        cy.get('input')
            .paste('11.22 ')
            .should('have.value', '11.22 EUR')
            .should('have.prop', 'selectionStart', '11.22 '.length)
            .should('have.prop', 'selectionEnd', '11.22 '.length);
    });

    it('Empty input => Paste "11.22  " (with two trailing spaces) => 11.22 |EUR', () => {
        cy.get('input')
            .paste('11.22  ')
            .should('have.value', '11.22 EUR')
            .should('have.prop', 'selectionStart', '11.22 '.length)
            .should('have.prop', 'selectionEnd', '11.22 '.length);
    });
});
