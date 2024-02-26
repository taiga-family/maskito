import {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

import {BROWSER_SUPPORTS_REAL_EVENTS} from '../../../support/constants';
import {TestInput} from '../utils';

describe('Native attribute maxlength works', () => {
    describe('<input maxlength="3" /> & overwriteMode = shift', () => {
        beforeEach(() => {
            const maskitoOptions = maskitoNumberOptionsGenerator({
                thousandSeparator: ' ',
            });

            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions,
                    maxLength: 3,
                },
            });
            cy.get('input[maxlength="3"]')
                .should('have.prop', 'maxlength', 3)
                .as('input');
        });

        it('accepts 2 digits', () => {
            cy.get('@input').type('12').should('have.value', '12');
        });

        it('accepts 3 digits', () => {
            cy.get('@input').type('123').should('have.value', '123');
        });

        it(
            'can replace selected digit by new one (even if length of the value is already equal to maxlength-property)',
            BROWSER_SUPPORTS_REAL_EVENTS,
            () => {
                cy.get('@input').type('123').realPress(['Shift', 'ArrowLeft']);

                cy.get('@input').type('0').should('have.value', '120');
            },
        );

        describe('rejects to enter digits more than maxlength-property', () => {
            it('123| => Type 4 => 123|', () => {
                cy.get('@input')
                    .type('1234')
                    .should('have.value', '123')
                    .should('have.prop', 'selectionStart', '123'.length)
                    .should('have.prop', 'selectionEnd', '123'.length);
            });

            it('12|3 => Type 0 => 12|3', () => {
                cy.get('@input')
                    .type('123')
                    .type('{leftArrow}')
                    .type('0')
                    .should('have.value', '123')
                    .should('have.prop', 'selectionStart', '12'.length)
                    .should('have.prop', 'selectionEnd', '12'.length);
            });

            it('1|23 => Type 0 => 1|23', () => {
                cy.get('@input')
                    .type('123')
                    .type('{leftArrow}'.repeat(2))
                    .type('0')
                    .should('have.value', '123')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            it('|123 => Type 9 => |123', () => {
                cy.get('@input')
                    .type('123')
                    .type('{moveToStart}')
                    .type('9')
                    .should('have.value', '123')
                    .should('have.prop', 'selectionStart', 0)
                    .should('have.prop', 'selectionEnd', 0);
            });
        });
    });

    describe('<input maxlength="6" /> & overwriteMode = replace', () => {
        beforeEach(() => {
            const maskitoOptions: MaskitoOptions = {
                mask: /^[A-F\d]*$/gi,
                overwriteMode: 'replace',
                postprocessors: [
                    ({value, selection}) => ({
                        selection,
                        value: value.toUpperCase(),
                    }),
                ],
            };

            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions,
                    maxLength: 6,
                },
            });
            cy.get('input[maxlength="6"]')
                .should('have.prop', 'maxlength', 6)
                .as('input');
        });

        it('accepts valid 526ed3', () => {
            cy.get('@input').type('526ed3').should('have.value', '526ED3');
        });

        describe('does not allow to type characters more than [maxlength]', () => {
            it('many letters', () => {
                cy.get('@input')
                    .type('aaabbbcccdddeeefff')
                    .should('have.value', 'AAABBB');
            });

            it('many digits', () => {
                cy.get('@input').type('1234567890').should('have.value', '123456');
            });
        });

        it('overwriteMode `replace` works even if value`s length is equal to [maxlength]', () => {
            cy.get('@input')
                .type('123456')
                .type('{leftArrow}'.repeat(3))
                .type('09')
                .should('have.value', '123096');
        });
    });
});
