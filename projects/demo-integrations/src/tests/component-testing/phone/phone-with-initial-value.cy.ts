import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

import {TestInput} from '../utils';

describe('Phone | With initial value', () => {
    describe('Strict mode (Kazakhstan)', () => {
        // Create fresh options for each test to ensure clean closure state
        function createMaskitoOptions(): ReturnType<typeof maskitoPhoneOptionsGenerator> {
            return maskitoPhoneOptionsGenerator({
                countryIsoCode: 'KZ',
                metadata,
                strict: true,
            });
        }

        describe('Backspace on initial render (BUG: first deletion fails)', () => {
            it('+7 771 931-111|1 => Backspace => +7 771 931-11|1 (deletes last "1")', () => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '+7 771 931-1111',
                    },
                });

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

            it('+7 771 9|31-1111 => Backspace => +7 771 |31-1111 (deletes "9")', () => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '+7 771 931-1111',
                    },
                });

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

            it('+7 771 93|1-1111 => Backspace => +7 771 9|1-1111 (deletes "3")', () => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '+7 771 931-1111',
                    },
                });

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

            it('+7 771 931|-1111 => Backspace => +7 771 93|1-111 (deletes "1")', () => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '+7 771 931-1111',
                    },
                });

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

            it('+7 77|1 931-1111 => Backspace => +7 7|19 311-111 (deletes "7")', () => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '+7 771 931-1111',
                    },
                });

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
            it('Type value, then backspace in middle works correctly', () => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createMaskitoOptions(),
                        initialValue: '+7 ',
                    },
                });

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

    describe('Non-strict mode', () => {
        function createNonStrictMaskitoOptions(): ReturnType<
            typeof maskitoPhoneOptionsGenerator
        > {
            return maskitoPhoneOptionsGenerator({
                countryIsoCode: 'US',
                metadata,
                strict: false,
            });
        }

        describe('Backspace on initial render (BUG: first deletion fails)', () => {
            it('+1 212 3|43-3355 => Backspace => +1 212 |43-3355 (deletes "3")', () => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: createNonStrictMaskitoOptions(),
                        initialValue: '+1 212 343-3355',
                    },
                });

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
        });
    });
});
