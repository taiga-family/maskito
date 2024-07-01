import type {MaskitoOptions} from '@maskito/core';
import {maskitoCaretGuard, maskitoNumberOptionsGenerator} from '@maskito/kit';

import {TestInput} from '../utils';

describe('Number | With initial value', () => {
    let maskitoOptions!: MaskitoOptions;

    beforeEach(() => {
        const prefix = '$';
        const postfix = ' kg';

        const numberOptions = maskitoNumberOptionsGenerator({
            prefix,
            postfix,
            thousandSeparator: ' ',
        });

        maskitoOptions = {
            ...numberOptions,
            plugins: [
                ...numberOptions.plugins,
                maskitoCaretGuard((value) => [
                    prefix.length,
                    value.length - postfix.length,
                ]),
            ],
        };
    });

    it('$6 432 kg => Select all + Backspace => $| kg', () => {
        cy.mount(TestInput, {
            componentProperties: {maskitoOptions, initialValue: '$6 432 kg'},
        });

        cy.get('input')
            .type('{selectAll}{backspace}')
            .should('have.value', '$ kg')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1);
    });

    it('$6 4|32 kg => Delete => $64|2 kg', () => {
        cy.mount(TestInput, {
            componentProperties: {maskitoOptions, initialValue: '$6 432 kg'},
        });

        cy.get('input')
            .focus()
            .type('{moveToEnd}')
            .should('have.prop', 'selectionStart', '$6 432'.length)
            .should('have.prop', 'selectionEnd', '$6 432'.length)
            .type('{leftArrow}'.repeat(2))
            .should('have.prop', 'selectionStart', '$6 4'.length)
            .should('have.prop', 'selectionEnd', '$6 4'.length)
            .type('{del}')
            .should('have.value', '$642 kg')
            .should('have.prop', 'selectionStart', '$64'.length)
            .should('have.prop', 'selectionEnd', '$64'.length);
    });
});
