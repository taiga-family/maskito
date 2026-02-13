import type {MaskitoOptions} from '@maskito/core';
import {maskitoCaretGuard, maskitoNumberOptionsGenerator} from '@maskito/kit';

import {BROWSER_SUPPORTS_REAL_EVENTS} from '../../../support/constants';
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
                maskitoOptions: maskitoNumberOptionsGenerator({thousandSeparator: ' '}),
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

    describe('select all initial value', () => {
        beforeEach(() => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions: maskitoNumberOptionsGenerator({
                        thousandSeparator: '_',
                    }),
                    initialValue: '1_234',
                },
            });
        });

        it('and press Delete', () => {
            cy.get('input')
                .focus()
                .should('have.value', '1_234')
                .type('{selectAll}{del}')
                .should('have.value', '')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('and press Backspace', () => {
            cy.get('input')
                .focus()
                .should('have.value', '1_234')
                .type('{selectAll}{backspace}')
                .should('have.value', '')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });
    });

    describe('select some already existed characters and then type new digit', () => {
        beforeEach(() => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions: maskitoNumberOptionsGenerator({
                        thousandSeparator: '_',
                    }),
                    initialValue: '123_456',
                },
            });
        });

        it(
            'Initial 12|3_456| => Type 9 (the 1st (input) event) => 129|',
            BROWSER_SUPPORTS_REAL_EVENTS,
            () => {
                cy.get('input')
                    .type('{moveToStart}')
                    .type('{rightArrow}'.repeat('12'.length))
                    .realPress([
                        'Shift',
                        ...new Array('3_456'.length).fill('ArrowRight'),
                    ]);

                cy.get('input')
                    .type('9')
                    .should('have.value', '129')
                    .should('have.prop', 'selectionStart', '129'.length)
                    .should('have.prop', 'selectionEnd', '129'.length);
            },
        );

        it(
            'Enter 12|3_456| => Type 9 (NOT the 1st (input) event) => 129|',
            BROWSER_SUPPORTS_REAL_EVENTS,
            () => {
                cy.get('input')
                    .clear()
                    .type('123_456')
                    .realPress(['Shift', ...new Array('3_456'.length).fill('ArrowLeft')]);

                cy.get('input')
                    .type('9')
                    .should('have.value', '129')
                    .should('have.prop', 'selectionStart', '129'.length)
                    .should('have.prop', 'selectionEnd', '129'.length);
            },
        );
    });
});
