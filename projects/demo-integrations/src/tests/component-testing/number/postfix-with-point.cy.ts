import type {MaskitoOptions} from '@maskito/core';
import {
    maskitoAddOnFocusPlugin,
    maskitoCaretGuard,
    maskitoNumberOptionsGenerator,
    maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';

import {TestInput} from '../utils';

describe('Number | postfix with point', () => {
    describe('` lbs.` postfix', () => {
        describe('Basic', () => {
            const maskitoOptions = maskitoNumberOptionsGenerator({
                postfix: ' lbs.',
                thousandSeparator: ' ',
                maximumFractionDigits: 2,
            });

            it('Empty => Type 5 => 5 lbs.', () => {
                cy.mount(TestInput, {componentProperties: {maskitoOptions}});
                cy.get('input')
                    .type('5')
                    .should('have.value', '5 lbs.')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            it('Empty => Type 12 => 12 lbs.', () => {
                cy.mount(TestInput, {componentProperties: {maskitoOptions}});
                cy.get('input')
                    .type('12')
                    .should('have.value', '12 lbs.')
                    .should('have.prop', 'selectionStart', 2)
                    .should('have.prop', 'selectionEnd', 2);
            });

            it('Empty => Type 0.42 => 0.42 lbs.', () => {
                cy.mount(TestInput, {componentProperties: {maskitoOptions}});
                cy.get('input')
                    .type('0')
                    .should('have.value', '0 lbs.')
                    .type('.')
                    .should('have.value', '0. lbs.')
                    .should('have.prop', 'selectionStart', '0.'.length)
                    .should('have.prop', 'selectionEnd', '0.'.length)
                    .type('42')
                    .should('have.value', '0.42 lbs.')
                    .should('have.prop', 'selectionStart', '0.42'.length)
                    .should('have.prop', 'selectionEnd', '0.42'.length);
            });
        });

        describe('Complex: maskitoCaretGuard + maskitoAddOnFocusPlugin + maskitoRemoveOnBlurPlugin', () => {
            const postfix = ' lbs.';
            const numberOptions = maskitoNumberOptionsGenerator({postfix});
            const maskitoOptions: MaskitoOptions = {
                ...numberOptions,
                plugins: [
                    ...numberOptions.plugins,
                    maskitoAddOnFocusPlugin(postfix),
                    maskitoRemoveOnBlurPlugin(postfix),
                    maskitoCaretGuard((value) => [0, value.length - postfix.length]),
                ],
            };

            it('Empty textfield => Focus => | lbs.', () => {
                cy.mount(TestInput, {componentProperties: {maskitoOptions}});

                cy.get('input')
                    .should('have.value', '')
                    .focus()
                    .should('have.value', postfix)
                    .should('have.prop', 'selectionStart', 0)
                    .should('have.prop', 'selectionEnd', 0);
            });

            it('Textfield contains only postfix => Blur => | Empty textfield', () => {
                cy.mount(TestInput, {componentProperties: {maskitoOptions}});

                cy.get('input')
                    .focus()
                    .should('have.value', postfix)
                    .blur()
                    .should('have.value', '');
            });

            it('| lbs. => Type 5 => 5 lbs.', () => {
                cy.mount(TestInput, {componentProperties: {maskitoOptions}});

                cy.get('input')
                    .type('5')
                    .should('have.value', '5 lbs.')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            it('123| lbs. => Backspace => 12 lbs.', () => {
                cy.mount(TestInput, {componentProperties: {maskitoOptions}});

                cy.get('input')
                    .type('123')
                    .should('have.value', '123 lbs.')
                    .should('have.prop', 'selectionStart', 3)
                    .should('have.prop', 'selectionEnd', 3)
                    .type('{backspace}')
                    .should('have.value', '12 lbs.')
                    .should('have.prop', 'selectionStart', 2)
                    .should('have.prop', 'selectionEnd', 2);
            });
        });
    });
});
