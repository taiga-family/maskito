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

            it('formats as (xxx) xxx-xxxx', () => {
                cy.get('input')
                    .should('be.visible')
                    .focus()
                    .type('2123433355')
                    .should('have.value', '(212) 343-3355');
            });

            /**
             * Note: libphonenumber-js closes parentheses even for partial area codes.
             */
            it('formats partial input - area code', () => {
                cy.get('input')
                    .should('be.visible')
                    .focus()
                    .type('212')
                    .should('have.value', '(212)');
            });

            it('formats partial input - after area code', () => {
                cy.get('input')
                    .should('be.visible')
                    .focus()
                    .type('2123')
                    .should('have.value', '(212) 3');
            });

            it('formats partial input - middle of number', () => {
                cy.get('input')
                    .should('be.visible')
                    .focus()
                    .type('212343')
                    .should('have.value', '(212) 343');
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

            it('(212) 343-3355| => Backspace => (212) 343-335|', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '(212) 343-3355')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{backspace}')
                    .should('have.value', '(212) 343-335')
                    .should('have.prop', 'selectionStart', '(212) 343-335'.length)
                    .should('have.prop', 'selectionEnd', '(212) 343-335'.length);
            });

            it('(212) 343|-3355 => Backspace => (212) 34|3-355', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '(212) 343-3355')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('-3355'.length))
                    .should('have.prop', 'selectionStart', '(212) 343'.length)
                    .should('have.prop', 'selectionEnd', '(212) 343'.length)
                    .type('{backspace}')
                    .should('have.value', '(212) 343-355')
                    .should('have.prop', 'selectionStart', '(212) 34'.length)
                    .should('have.prop', 'selectionEnd', '(212) 34'.length);
            });

            it('(212) 3|43-3355 => Backspace => (212) |433-355', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '(212) 343-3355')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('43-3355'.length))
                    .should('have.prop', 'selectionStart', '(212) 3'.length)
                    .should('have.prop', 'selectionEnd', '(212) 3'.length)
                    .type('{backspace}')
                    .should('have.value', '(212) 433-355')
                    .should('have.prop', 'selectionStart', '(212) '.length)
                    .should('have.prop', 'selectionEnd', '(212) '.length);
            });
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
        function createMaskitoOptions(): MaskitoOptions {
            return maskitoPhoneOptionsGenerator({
                countryIsoCode: 'US',
                metadata,
                format: 'NATIONAL',
                separator: ' ',
            });
        }

        beforeEach(() => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions: createMaskitoOptions(),
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
