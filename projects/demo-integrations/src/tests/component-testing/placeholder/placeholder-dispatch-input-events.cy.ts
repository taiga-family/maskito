import type {MaskitoOptions} from '@maskito/core';
import {maskitoDateOptionsGenerator, maskitoWithPlaceholder} from '@maskito/kit';
import {createOutputSpy} from 'cypress/angular';

import {TestInput} from '../utils';

describe('Placeholder | count number of dispatched input event', () => {
    describe('Card verification code example', () => {
        const maskitoOptions: MaskitoOptions = {
            ...maskitoWithPlaceholder('xxx'),
            mask: /^\d{0,3}$/,
        };

        beforeEach(() => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions,
                    input: createOutputSpy('inputEvent'),
                },
            });
        });

        it('Empty => Type 1 => 1|xx', () => {
            cy.get('input')
                .focus()
                .should('have.value', '')
                .type('1')
                .should('have.value', '1xx')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);

            cy.get('@inputEvent').should('have.callCount', 1);
        });

        it('1|xx => Type 2 => 12|x', () => {
            cy.get('input')
                .type('12')
                .should('have.value', '12x')
                .should('have.prop', 'selectionStart', 2)
                .should('have.prop', 'selectionEnd', 2);

            cy.get('@inputEvent').should('have.callCount', 2);
        });

        it('12|x => Type 3 => 123|', () => {
            cy.get('input')
                .type('123')
                .should('have.value', '123')
                .should('have.prop', 'selectionStart', 3)
                .should('have.prop', 'selectionEnd', 3);

            cy.get('@inputEvent').should('have.callCount', 3);
        });

        it('123| => Backspace => 12|x', () => {
            cy.get('input')
                .type('123')
                .type('{backspace}')
                .should('have.value', '12x')
                .should('have.prop', 'selectionStart', 2)
                .should('have.prop', 'selectionEnd', 2);

            cy.get('@inputEvent').should('have.callCount', 4);
        });

        it('12|x => Backspace => 1|xx', () => {
            cy.get('input')
                .type('12')
                .type('{backspace}')
                .should('have.value', '1xx')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);

            cy.get('@inputEvent').should('have.callCount', 3);
        });

        it('1|xx => Backspace => |xxx', () => {
            cy.get('input')
                .type('1')
                .type('{backspace}')
                .should('have.value', 'xxx')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);

            cy.get('@inputEvent').should('have.callCount', 2);
        });
    });

    describe('With built-in Date mask (from @maskito/kit)', () => {
        const dateOptions = maskitoDateOptionsGenerator({
            mode: 'dd/mm/yyyy',
            separator: '/',
        });
        const {plugins, ...placeholderOptions} = maskitoWithPlaceholder('dd/mm/yyyy');
        const maskitoOptions: MaskitoOptions = {
            ...dateOptions,
            plugins: plugins.concat(dateOptions.plugins),
            preprocessors: [
                ...placeholderOptions.preprocessors,
                ...dateOptions.preprocessors,
            ],
            postprocessors: [
                ...dateOptions.postprocessors,
                ...placeholderOptions.postprocessors,
            ],
        };

        beforeEach(() => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions,
                    input: createOutputSpy('inputEvent'),
                },
            });
        });

        (
            [
                // [typedValue, expectedValue, expectedCaretIndex]
                ['1', '1d/mm/yyyy', 1],
                ['12', '12/mm/yyyy', '12'.length],
                ['129', '12/09/yyyy', '12/09'.length],
                ['1292', '12/09/2yyy', '12/09/2'.length],
                ['12920', '12/09/20yy', '12/09/20'.length],
                ['129202', '12/09/202y', '12/09/202'.length],
                ['1292023', '12/09/2023', '12/09/2023'.length],
            ] as const
        ).forEach(([typedValue, expectedValue, expectedCaretIndex]) => {
            it(`Empty => Type ${typedValue} => ${expectedValue}`, () => {
                cy.get('input')
                    .focus()
                    .should('have.value', '')
                    .type(typedValue)
                    .should('have.value', expectedValue)
                    .should('have.prop', 'selectionStart', expectedCaretIndex)
                    .should('have.prop', 'selectionEnd', expectedCaretIndex);

                cy.get('@inputEvent').should('have.callCount', typedValue.length);
            });
        });
    });
});
