import type {MaskitoOptions} from '@maskito/core';
import {maskitoCaretGuard, maskitoNumberOptionsGenerator} from '@maskito/kit';

import {TestInput} from '../utils';

describe('Number | With initial value', () => {
    let maskitoOptions!: MaskitoOptions;

    describe('with prefix & postfix', () => {
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

    it('123 45|6 789 => Type 0 (the 1st time input event) => 1 234 50|6 789', () => {
        cy.mount(TestInput, {
            componentProperties: {
                maskitoOptions: maskitoNumberOptionsGenerator({
                    thousandSeparator: ' ',
                }),
                initialValue: '123 456 789',
            },
        });

        cy.get('input')
            .focus()
            .type('{moveToStart}')
            .type('{rightArrow}'.repeat('123 45'.length))
            .type('0')
            .should('have.value', '1 234 506 789')
            .should('have.prop', 'selectionStart', '1 234 50'.length)
            .should('have.prop', 'selectionEnd', '1 234 50'.length);
    });
});
