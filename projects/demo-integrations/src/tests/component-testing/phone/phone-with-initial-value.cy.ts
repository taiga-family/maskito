import type {MaskitoOptions} from '@maskito/core';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

import {TestInput} from '../utils';

describe('Phone | With initial value', () => {
    describe('Strict mode (Kazakhstan)', () => {
        // Create fresh options for each test to ensure clean closure state
        function createMaskitoOptions(): MaskitoOptions {
            return maskitoPhoneOptionsGenerator({
                countryIsoCode: 'KZ',
                metadata,
                strict: true,
            });
        }

        describe('Backspace on initial render', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '+7 771 931-1111',
                    },
                });
            });

            it('+7 771 931-1111| => Backspace => +7 771 931-111|', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+7 771 931-1111')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{backspace}')
                    .should('have.value', '+7 771 931-111')
                    .should('have.prop', 'selectionStart', '+7 771 931-111'.length)
                    .should('have.prop', 'selectionEnd', '+7 771 931-111'.length);
            });

            it('+7 771 9|31-1111 => Backspace => +7 771 |311-111', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+7 771 931-1111')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('31-1111'.length))
                    .should('have.prop', 'selectionStart', '+7 771 9'.length)
                    .should('have.prop', 'selectionEnd', '+7 771 9'.length)
                    .type('{backspace}')
                    .should('have.value', '+7 771 311-111')
                    .should('have.prop', 'selectionStart', '+7 771 '.length)
                    .should('have.prop', 'selectionEnd', '+7 771 '.length);
            });

            it('+7 771 93|1-1111 => Backspace => +7 771 9|11-111', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+7 771 931-1111')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('1-1111'.length))
                    .should('have.prop', 'selectionStart', '+7 771 93'.length)
                    .should('have.prop', 'selectionEnd', '+7 771 93'.length)
                    .type('{backspace}')
                    .should('have.value', '+7 771 911-111')
                    .should('have.prop', 'selectionStart', '+7 771 9'.length)
                    .should('have.prop', 'selectionEnd', '+7 771 9'.length);
            });

            it('+7 771 931|-1111 => Backspace => +7 771 93|1-111', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+7 771 931-1111')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('-1111'.length))
                    .should('have.prop', 'selectionStart', '+7 771 931'.length)
                    .should('have.prop', 'selectionEnd', '+7 771 931'.length)
                    .type('{backspace}')
                    .should('have.value', '+7 771 931-111')
                    .should('have.prop', 'selectionStart', '+7 771 93'.length)
                    .should('have.prop', 'selectionEnd', '+7 771 93'.length);
            });

            it('+7 77|1 931-1111 => Backspace => +7 7|19 311-111', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+7 771 931-1111')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('1 931-1111'.length))
                    .should('have.prop', 'selectionStart', '+7 77'.length)
                    .should('have.prop', 'selectionEnd', '+7 77'.length)
                    .type('{backspace}')
                    .should('have.value', '+7 719 311-111')
                    .should('have.prop', 'selectionStart', '+7 7'.length)
                    .should('have.prop', 'selectionEnd', '+7 7'.length);
            });
        });

        describe('Backspace after typing (confirms mask works when value is typed)', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '+7 ',
                    },
                });
            });

            it('Type value, then backspace in middle works correctly', () => {
                cy.get('input')
                    .should('be.visible')
                    .focus()
                    .type('7719311111')
                    .should('have.value', '+7 771 931-1111')
                    // Now test backspace in the middle
                    .type('{leftArrow}'.repeat('31-1111'.length))
                    .should('have.prop', 'selectionStart', '+7 771 9'.length)
                    .should('have.prop', 'selectionEnd', '+7 771 9'.length)
                    .type('{backspace}')
                    .should('have.value', '+7 771 311-111')
                    .should('have.prop', 'selectionStart', '+7 771 '.length)
                    .should('have.prop', 'selectionEnd', '+7 771 '.length);
            });
        });
    });

    describe('Strict mode (United States)', () => {
        function createMaskitoOptions(): MaskitoOptions {
            return maskitoPhoneOptionsGenerator({
                countryIsoCode: 'US',
                metadata,
                strict: true,
            });
        }

        describe('Backspace on initial render', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '+1 212 343-3355',
                    },
                });
            });

            it('+1 212 343-3355| => Backspace => +1 212 343-335|', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+1 212 343-3355')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{backspace}')
                    .should('have.value', '+1 212 343-335')
                    .should('have.prop', 'selectionStart', '+1 212 343-335'.length)
                    .should('have.prop', 'selectionEnd', '+1 212 343-335'.length);
            });

            it('+1 212 3|43-3355 => Backspace => +1 212 |433-355', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+1 212 343-3355')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('43-3355'.length))
                    .should('have.prop', 'selectionStart', '+1 212 3'.length)
                    .should('have.prop', 'selectionEnd', '+1 212 3'.length)
                    .type('{backspace}')
                    .should('have.value', '+1 212 433-355')
                    .should('have.prop', 'selectionStart', '+1 212 '.length)
                    .should('have.prop', 'selectionEnd', '+1 212 '.length);
            });

            it('+1 212 343|-3355 => Backspace => +1 212 34|3-355', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+1 212 343-3355')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('-3355'.length))
                    .should('have.prop', 'selectionStart', '+1 212 343'.length)
                    .should('have.prop', 'selectionEnd', '+1 212 343'.length)
                    .type('{backspace}')
                    .should('have.value', '+1 212 343-355')
                    .should('have.prop', 'selectionStart', '+1 212 34'.length)
                    .should('have.prop', 'selectionEnd', '+1 212 34'.length);
            });

            it('+1 21|2 343-3355 => Backspace => +1 2|23 433-355', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+1 212 343-3355')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('2 343-3355'.length))
                    .should('have.prop', 'selectionStart', '+1 21'.length)
                    .should('have.prop', 'selectionEnd', '+1 21'.length)
                    .type('{backspace}')
                    .should('have.value', '+1 223 433-355')
                    .should('have.prop', 'selectionStart', '+1 2'.length)
                    .should('have.prop', 'selectionEnd', '+1 2'.length);
            });
        });
    });

    describe('Strict mode (France)', () => {
        function createMaskitoOptions(): MaskitoOptions {
            return maskitoPhoneOptionsGenerator({
                countryIsoCode: 'FR',
                metadata,
                strict: true,
            });
        }

        describe('Backspace on initial render', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '+33 6 12-34-56-78',
                    },
                });
            });

            it('+33 6 12-34-56-78| => Backspace => +33 6 12-34-56-7|', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+33 6 12-34-56-78')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{backspace}')
                    .should('have.value', '+33 6 12-34-56-7')
                    .should('have.prop', 'selectionStart', '+33 6 12-34-56-7'.length)
                    .should('have.prop', 'selectionEnd', '+33 6 12-34-56-7'.length);
            });

            it('+33 6 12-3|4-56-78 => Backspace => +33 6 12-|45-67-8', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+33 6 12-34-56-78')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('4-56-78'.length))
                    .should('have.prop', 'selectionStart', '+33 6 12-3'.length)
                    .should('have.prop', 'selectionEnd', '+33 6 12-3'.length)
                    .type('{backspace}')
                    .should('have.value', '+33 6 12-45-67-8')
                    .should('have.prop', 'selectionStart', '+33 6 12-'.length)
                    .should('have.prop', 'selectionEnd', '+33 6 12-'.length);
            });

            it('+33 6 1|2-34-56-78 => Backspace => +33 6 |23-45-67-8', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+33 6 12-34-56-78')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('2-34-56-78'.length))
                    .should('have.prop', 'selectionStart', '+33 6 1'.length)
                    .should('have.prop', 'selectionEnd', '+33 6 1'.length)
                    .type('{backspace}')
                    .should('have.value', '+33 6 23-45-67-8')
                    .should('have.prop', 'selectionStart', '+33 6 '.length)
                    .should('have.prop', 'selectionEnd', '+33 6 '.length);
            });

            it('+33 6 12-34|-56-78 => Backspace => +33 6 12-3|5-67-8', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+33 6 12-34-56-78')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('-56-78'.length))
                    .should('have.prop', 'selectionStart', '+33 6 12-34'.length)
                    .should('have.prop', 'selectionEnd', '+33 6 12-34'.length)
                    .type('{backspace}')
                    .should('have.value', '+33 6 12-35-67-8')
                    .should('have.prop', 'selectionStart', '+33 6 12-3'.length)
                    .should('have.prop', 'selectionEnd', '+33 6 12-3'.length);
            });
        });
    });

    describe('Non-strict mode (United States)', () => {
        function createNonStrictMaskitoOptions(): MaskitoOptions {
            return maskitoPhoneOptionsGenerator({
                countryIsoCode: 'US',
                metadata,
                strict: false,
            });
        }

        describe('Backspace on initial render', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createNonStrictMaskitoOptions(),
                        initialValue: '+1 212 343-3355',
                    },
                });
            });

            it('+1 212 343-3355| => Backspace => +1 212 343-335|', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+1 212 343-3355')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{backspace}')
                    .should('have.value', '+1 212 343-335')
                    .should('have.prop', 'selectionStart', '+1 212 343-335'.length)
                    .should('have.prop', 'selectionEnd', '+1 212 343-335'.length);
            });

            it('+1 212 3|43-3355 => Backspace => +1 212 |433-355', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+1 212 343-3355')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('43-3355'.length))
                    .should('have.prop', 'selectionStart', '+1 212 3'.length)
                    .should('have.prop', 'selectionEnd', '+1 212 3'.length)
                    .type('{backspace}')
                    .should('have.value', '+1 212 433-355')
                    .should('have.prop', 'selectionStart', '+1 212 '.length)
                    .should('have.prop', 'selectionEnd', '+1 212 '.length);
            });

            it('+1 212 343|-3355 => Backspace => +1 212 34|3-355', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+1 212 343-3355')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('-3355'.length))
                    .should('have.prop', 'selectionStart', '+1 212 343'.length)
                    .should('have.prop', 'selectionEnd', '+1 212 343'.length)
                    .type('{backspace}')
                    .should('have.value', '+1 212 343-355')
                    .should('have.prop', 'selectionStart', '+1 212 34'.length)
                    .should('have.prop', 'selectionEnd', '+1 212 34'.length);
            });
        });
    });

    describe('Non-strict mode (France)', () => {
        function createNonStrictMaskitoOptions(): MaskitoOptions {
            return maskitoPhoneOptionsGenerator({
                countryIsoCode: 'FR',
                metadata,
                strict: false,
            });
        }

        describe('Backspace on initial render', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createNonStrictMaskitoOptions(),
                        initialValue: '+33 6 12-34-56-78',
                    },
                });
            });

            it('+33 6 12-34-56-78| => Backspace => +33 6 12-34-56-7|', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+33 6 12-34-56-78')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{backspace}')
                    .should('have.value', '+33 6 12-34-56-7')
                    .should('have.prop', 'selectionStart', '+33 6 12-34-56-7'.length)
                    .should('have.prop', 'selectionEnd', '+33 6 12-34-56-7'.length);
            });

            it('+33 6 12-3|4-56-78 => Backspace => +33 6 12-|45-67-8', () => {
                cy.get('input')
                    .should('be.visible')
                    .should('have.value', '+33 6 12-34-56-78')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('4-56-78'.length))
                    .should('have.prop', 'selectionStart', '+33 6 12-3'.length)
                    .should('have.prop', 'selectionEnd', '+33 6 12-3'.length)
                    .type('{backspace}')
                    .should('have.value', '+33 6 12-45-67-8')
                    .should('have.prop', 'selectionStart', '+33 6 12-'.length)
                    .should('have.prop', 'selectionEnd', '+33 6 12-'.length);
            });
        });
    });
});
