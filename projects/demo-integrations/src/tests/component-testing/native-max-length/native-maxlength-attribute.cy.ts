import {ChangeDetectionStrategy, Component, ElementRef, inject} from '@angular/core';
import type {MaskitoOptions} from '@maskito/core';
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

            it('Empty input => Paste 123456789 => 123|', () => {
                cy.get('@input')
                    .paste('123456789')
                    .should('have.value', '123')
                    .should('have.prop', 'selectionStart', '123'.length)
                    .should('have.prop', 'selectionEnd', '123'.length);
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

    describe('with oversimplified Number mask', () => {
        beforeEach(() => {
            const maskitoOptions: MaskitoOptions = {
                mask: /^\d*$/,
            };

            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions,
                    maxLength: 4,
                },
            });
        });

        it('Press 4 (no more!) digits and click on cleaner => Empty textfield', () => {
            cy.get('input').type('1234').type('{selectAll}');
            cy.document().then((doc) => doc.execCommand('delete'));
            cy.get('input').should('have.value', '');
        });

        it('Press >4 digits and click on cleaner => Empty textfield', () => {
            cy.get('input').type('123456').type('{selectAll}');
            cy.document().then((doc) => doc.execCommand('delete'));
            cy.get('input').should('have.value', '');
        });
    });

    describe('with Number mask', () => {
        beforeEach(() => {
            const inputYearMask: MaskitoOptions = maskitoNumberOptionsGenerator({
                min: 0,
                max: 9999,
                thousandSeparator: '',
            });

            @Component({
                standalone: true,
                imports: [TestInput],
                template: `
                    <test-input
                        [maskitoOptions]="mask"
                        [maxLength]="4"
                    />
                    <button
                        id="cleaner"
                        (click)="clear()"
                    >
                        Cleaner
                    </button>
                `,
                changeDetection: ChangeDetectionStrategy.OnPush,
            })
            class Sandbox {
                private readonly el = inject(ElementRef).nativeElement;
                protected readonly mask = inputYearMask;

                protected clear(): void {
                    const input = this.el.querySelector('input');

                    input.select();
                    input.ownerDocument.execCommand('delete');
                }
            }

            cy.mount(Sandbox);
            cy.get('input[maxlength="4"]')
                .should('have.prop', 'maxlength', 4)
                .as('input');
        });

        it('Press 4 (no more!) digits and click on cleaner => Empty textfield', () => {
            cy.get('@input').type('1234');
            cy.get('#cleaner').click();

            cy.get('@input').should('have.value', '');
        });

        it('Press >4 digits and click on cleaner => Empty textfield', () => {
            cy.get('@input').type('123456789');
            cy.get('#cleaner').click();

            cy.get('@input').should('have.value', '');
        });
    });
});
