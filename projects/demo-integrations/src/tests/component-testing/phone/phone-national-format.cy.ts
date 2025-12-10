import type {MaskitoOptions} from '@maskito/core';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

import {TestInput} from '../utils';

describe('Phone | National format', () => {
    describe('United States (US)', () => {
        /**
         * Create fresh options for each test to ensure clean closure state.
         */
        function createMaskitoOptions(): MaskitoOptions {
            return maskitoPhoneOptionsGenerator({
                countryIsoCode: 'US',
                metadata,
                format: 'NATIONAL',
            });
        }

        describe('Typing digits', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '',
                    },
                });
            });

            const typingCases: Array<{name: string; input: string; expected: string}> = [
                {
                    name: 'formats as (xxx) xxx-xxxx',
                    input: '2123433355',
                    expected: '(212) 343-3355',
                },
                {
                    name: 'formats partial input - area code',
                    input: '212',
                    expected: '(212)',
                },
                {
                    name: 'formats partial input - after area code',
                    input: '2123',
                    expected: '(212) 3',
                },
                {
                    name: 'formats partial input - middle of number',
                    input: '212343',
                    expected: '(212) 343',
                },
            ];

            typingCases.forEach(({name, input, expected}) => {
                it(name, () => {
                    cy.get('input')
                        .should('be.visible')
                        .focus()
                        .type(input)
                        .should('have.value', expected);
                });
            });
        });

        describe('Backspace behavior', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '(212) 343-3355',
                    },
                });
            });

            const backspaceCases: Array<{
                name: string;
                leftArrows: number;
                expectedValue: string;
                expectedCursor: number;
            }> = [
                {
                    name: '(212) 343-3355| => Backspace => (212) 343-335|',
                    leftArrows: 0,
                    expectedValue: '(212) 343-335',
                    expectedCursor: '(212) 343-335'.length,
                },
                {
                    name: '(212) 343|-3355 => Backspace => (212) 34|3-355',
                    leftArrows: '-3355'.length,
                    expectedValue: '(212) 343-355',
                    expectedCursor: '(212) 34'.length,
                },
                {
                    name: '(212) 3|43-3355 => Backspace => (212) |433-355',
                    leftArrows: '43-3355'.length,
                    expectedValue: '(212) 433-355',
                    expectedCursor: '(212) '.length,
                },
            ];

            backspaceCases.forEach(
                ({name, leftArrows, expectedValue, expectedCursor}) => {
                    it(name, () => {
                        cy.get('input')
                            .should('be.visible')
                            .should('have.value', '(212) 343-3355')
                            .focus()
                            .type('{moveToEnd}')
                            .type('{leftArrow}'.repeat(leftArrows) || '{moveToEnd}')
                            .type('{backspace}')
                            .should('have.value', expectedValue)
                            .should('have.prop', 'selectionStart', expectedCursor)
                            .should('have.prop', 'selectionEnd', expectedCursor);
                    });
                },
            );
        });

        describe('Typing after initialization with value', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '(212) 343-335',
                    },
                });
            });

            it('completes partial number', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '(212) 343-335')
                    .focus()
                    .type('{moveToEnd}')
                    .type('5')
                    .should('have.value', '(212) 343-3355');
            });
        });
    });

    describe('Russia (RU)', () => {
        function createMaskitoOptions(): MaskitoOptions {
            return maskitoPhoneOptionsGenerator({
                countryIsoCode: 'RU',
                metadata,
                format: 'NATIONAL',
            });
        }

        describe('Typing digits', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '',
                    },
                });
            });

            it('formats as xxx xxx-xx-xx', () => {
                cy.get('input')
                    .should('be.visible')
                    .focus()
                    .type('9202800155')
                    .should('have.value', '920 280-01-55');
            });
        });

        describe('Backspace behavior', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '920 280-01-55',
                    },
                });
            });

            it('920 280-01-55| => Backspace => 920 280-01-5|', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '920 280-01-55')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{backspace}')
                    .should('have.value', '920 280-01-5')
                    .should('have.prop', 'selectionStart', '920 280-01-5'.length)
                    .should('have.prop', 'selectionEnd', '920 280-01-5'.length);
            });
        });
    });

    describe('Custom separator', () => {
        beforeEach(() => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions: maskitoPhoneOptionsGenerator({
                        countryIsoCode: 'US',
                        metadata,
                        format: 'NATIONAL',
                        separator: ' ',
                    }),
                    initialValue: '',
                },
            });
        });

        it('uses space as separator', () => {
            cy.get('input')
                .should('be.visible')
                .focus()
                .type('2123433355')
                .should('have.value', '(212) 343 3355');
        });
    });
});
