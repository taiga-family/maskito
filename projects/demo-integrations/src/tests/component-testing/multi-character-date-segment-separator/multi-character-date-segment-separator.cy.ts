import {
    maskitoDateOptionsGenerator,
    maskitoDateRangeOptionsGenerator,
    maskitoDateTimeOptionsGenerator,
} from '@maskito/kit';

import {TestInput} from '../utils';

describe('Multi character date segment separator', () => {
    const multiCharacterSeparator = '. '; // Slovenia;

    [
        {
            title: 'Date',
            maskitoOptions: maskitoDateOptionsGenerator({
                mode: 'dd/mm/yyyy',
                separator: multiCharacterSeparator,
            }),
            initialValue: '',
        },
        {
            title: 'DateRange (1st date)',
            maskitoOptions: maskitoDateRangeOptionsGenerator({
                mode: 'dd/mm/yyyy',
                dateSeparator: multiCharacterSeparator,
            }),
            initialValue: '',
        },
        {
            title: 'DateRange (2nd date)',
            maskitoOptions: maskitoDateRangeOptionsGenerator({
                mode: 'dd/mm/yyyy',
                rangeSeparator: '_',
                dateSeparator: multiCharacterSeparator,
            }),
            initialValue: '12. 04. 1961_',
        },
        {
            title: 'DateTime',
            maskitoOptions: maskitoDateTimeOptionsGenerator({
                dateMode: 'dd/mm/yyyy',
                timeMode: 'HH:MM',
                dateSeparator: multiCharacterSeparator,
            }),
            initialValue: '',
        },
    ].forEach(({title, maskitoOptions, initialValue}) => {
        describe(title, () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions,
                        initialValue,
                    },
                });
                cy.get('input')
                    .focus()
                    .should('have.value', initialValue)
                    .type('{moveToEnd}');
            });

            it('Type 31121999 => 31. 12. 1999', () => {
                cy.get('input')
                    .type('31121999')
                    .should('have.value', `${initialValue}31. 12. 1999`);
            });

            it('Type 999 => 09. 09. 9 (zero padding works)', () => {
                cy.get('input')
                    .type('999')
                    .should('have.value', `${initialValue}09. 09. 9`);
            });

            it('Type 35 => 3 (prevent to enter impossible day date segment)', () => {
                cy.get('input').type('35').should('have.value', `${initialValue}3`);
            });

            it('Type 31.15 => 31.1 (prevent to enter impossible month date segment)', () => {
                cy.get('input').type('3115').should('have.value', `${initialValue}31. 1`);
            });

            describe('Editing somewhere in the middle of a value (NOT the last character)', () => {
                it('01.1|2.1998 => Backspace => 01.|02.1998 => Type "1" => 01.1|2.1998', () => {
                    cy.get('input')
                        .type('01121998')
                        .type('{leftArrow}'.repeat('2. 1998'.length))
                        .should(
                            'have.prop',
                            'selectionStart',
                            `${initialValue}01. 1`.length,
                        )
                        .should(
                            'have.prop',
                            'selectionEnd',
                            `${initialValue}01. 1`.length,
                        )
                        .type('{backspace}')
                        .should('have.value', `${initialValue}01. 02. 1998`)
                        .should(
                            'have.prop',
                            'selectionStart',
                            `${initialValue}01. `.length,
                        )
                        .should('have.prop', 'selectionEnd', `${initialValue}01. `.length)
                        .type('1')
                        .should('have.value', `${initialValue}01. 12. 1998`)
                        .should(
                            'have.prop',
                            'selectionStart',
                            `${initialValue}01. 1`.length,
                        )
                        .should(
                            'have.prop',
                            'selectionEnd',
                            `${initialValue}01. 1`.length,
                        );
                });

                it('12|.01.2008 => Backspace => 1|0.01.2008 => Type "1" => 11|.01.2008', () => {
                    cy.get('input')
                        .type('12012008')
                        .type('{leftArrow}'.repeat(' .01 .2008'.length))
                        .should('have.prop', 'selectionStart', `${initialValue}12`.length)
                        .should('have.prop', 'selectionEnd', `${initialValue}12`.length)
                        .type('{backspace}')
                        .should('have.value', `${initialValue}10. 01. 2008`)
                        .should('have.prop', 'selectionStart', `${initialValue}1`.length)
                        .should('have.prop', 'selectionEnd', `${initialValue}1`.length)
                        .type('1')
                        .should('have.value', `${initialValue}11. 01. 2008`)
                        .should(
                            'have.prop',
                            'selectionStart',
                            `${initialValue}11. `.length,
                        )
                        .should(
                            'have.prop',
                            'selectionEnd',
                            `${initialValue}11. `.length,
                        );
                });

                it('12.|12.2010 => Type "9" => 12.09.|2010', () => {
                    cy.get('input')
                        .type('12122010')
                        .type('{leftArrow}'.repeat('12. 2010'.length))
                        .should(
                            'have.prop',
                            'selectionStart',
                            `${initialValue}12. `.length,
                        )
                        .should('have.prop', 'selectionEnd', `${initialValue}12. `.length)
                        .type('9')
                        .should('have.value', `${initialValue}12. 09. 2010`)
                        .should(
                            'have.prop',
                            'selectionStart',
                            `${initialValue}12. 09. `.length,
                        )
                        .should(
                            'have.prop',
                            'selectionEnd',
                            `${initialValue}12. 09. `.length,
                        );
                });

                it('|15.01.2012 => Type "3" => 3|0.01.2012', () => {
                    cy.get('input')
                        .type('15012012')
                        .type('{leftArrow}'.repeat('15. 01. 2012'.length))
                        .should('have.prop', 'selectionStart', initialValue.length)
                        .should('have.prop', 'selectionEnd', initialValue.length)
                        .type('3')
                        .should('have.value', `${initialValue}30. 01. 2012`)
                        .should('have.prop', 'selectionStart', `${initialValue}3`.length)
                        .should('have.prop', 'selectionEnd', `${initialValue}3`.length);
                });

                it('02|.01.2008 => Backspace => 0|1.01.2008 => Type "5" => 05|.01.2008', () => {
                    cy.get('input')
                        .type('02012008')
                        .type('{leftArrow}'.repeat('. 01. 2008'.length))
                        .should('have.prop', 'selectionStart', `${initialValue}02`.length)
                        .should('have.prop', 'selectionEnd', `${initialValue}02`.length)
                        .type('{backspace}')
                        .should('have.value', `${initialValue}01. 01. 2008`)
                        .should('have.prop', 'selectionStart', `${initialValue}0`.length)
                        .should('have.prop', 'selectionEnd', `${initialValue}0`.length)
                        .type('5')
                        .should('have.value', `${initialValue}05. 01. 2008`)
                        .should(
                            'have.prop',
                            'selectionStart',
                            `${initialValue}05. `.length,
                        )
                        .should(
                            'have.prop',
                            'selectionEnd',
                            `${initialValue}05. `.length,
                        );
                });
            });
        });
    });
});
