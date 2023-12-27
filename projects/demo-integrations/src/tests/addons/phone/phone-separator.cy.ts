import {DemoPath} from '@demo/constants';

import {BROWSER_SUPPORTS_REAL_EVENTS} from '../../../support/constants';

describe('Phone', () => {
    describe('Separator', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.PhonePackage}/API?separator$=1`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        describe('basic typing (1 character per keydown)', () => {
            const tests = [
                // [Typed value, Masked value, caretIndex]
                ['920', '+7 920', '+7 920'.length],
                ['920341', '+7 920 341', '+7 920 341'.length],
                ['92034156', '+7 920 341 56', '+7 920 341 56'.length],
                ['9203415627', '+7 920 341 56 27', '+7 920 341 56 27'.length],
                ['92034156274234123', '+7 920 341 56 27', '+7 920 341 56 27'.length],
                ['9 nd4 e', '+7 94', '+7 94'.length],
            ] as const;

            tests.forEach(([typedValue, maskedValue, caretIndex]) => {
                it(`Type "${typedValue}" => "${maskedValue}"`, () => {
                    cy.get('@input')
                        .type(typedValue)
                        .should('have.value', maskedValue)
                        .should('have.prop', 'selectionStart', caretIndex)
                        .should('have.prop', 'selectionEnd', caretIndex);
                });
            });
        });

        describe('basic erasing (value = "+7 920 424 11 32"', () => {
            beforeEach(() => {
                cy.get('@input').type('9204241132');
            });

            const tests = [
                // [How many times "Backspace"-key was pressed, caretPosition, Masked value]
                [1, '+7 920 424 11 3'.length, '+7 920 424 11 3'],
                [2, '+7 920 424 11'.length, '+7 920 424 11'],
                [3, '+7 920 424 1'.length, '+7 920 424 1'],
                [4, '+7 920 424'.length, '+7 920 424'],
                [13, '+7 '.length, '+7 '],
            ] as const;

            tests.forEach(([n, caretIndex, maskedValue]) => {
                it(`Backspace x${n} => "${maskedValue}"`, () => {
                    cy.get('@input')
                        .type('{backspace}'.repeat(n))
                        .should('have.value', maskedValue)
                        .should('have.prop', 'selectionStart', caretIndex)
                        .should('have.prop', 'selectionEnd', caretIndex);
                });
            });
        });

        describe('Editing somewhere in the middle of a value (NOT the last character)', () => {
            beforeEach(() => {
                cy.get('@input').type('920 424 11 32');
            });

            it('+7 9|20 424 11 32 => Backspace => +7 2|04241132', () => {
                cy.get('@input')
                    .type('{leftArrow}'.repeat('20 424 11 32'.length))
                    .type('{backspace}')
                    .should('have.value', '+7 204241132')
                    .should('have.prop', 'selectionStart', '+7 '.length)
                    .should('have.prop', 'selectionEnd', '+7 '.length);
            });
        });

        describe('Text selection', () => {
            beforeEach(() => {
                cy.get('@input').type('920 424 11 32');
            });

            describe(
                'Select range and press Backspace',
                BROWSER_SUPPORTS_REAL_EVENTS,
                () => {
                    it('+7 920 424-11-32 => Select "+7 920 424 |11| 32" => Backspace => +7 920 424 |32', () => {
                        cy.get('@input')
                            .type('{leftArrow}'.repeat(' 32'.length))
                            .realPress([
                                'Shift',
                                ...new Array('11'.length).fill('ArrowLeft'),
                            ]);

                        cy.get('@input')
                            .type('{backspace}')
                            .should('have.value', '+7 920 424 32')
                            .should('have.prop', 'selectionStart', '+7 920 424 '.length)
                            .should('have.prop', 'selectionEnd', '+7 920 424 '.length);
                    });
                },
            );

            describe(
                'Select range and type a digit',
                BROWSER_SUPPORTS_REAL_EVENTS,
                () => {
                    it('+7 920 424-11-32 => Select "+7 920 424 |11| 32" => Type "5" => +7 920 424 5|3 2', () => {
                        cy.get('@input')
                            .type('{leftArrow}'.repeat(' 32'.length))
                            .realPress([
                                'Shift',
                                ...new Array('11'.length).fill('ArrowLeft'),
                            ]);

                        cy.get('@input')
                            .type('5')
                            .should('have.value', '+7 920 424 53 2')
                            .should('have.prop', 'selectionStart', '+7 920 424 5'.length)
                            .should('have.prop', 'selectionEnd', '+7 920 424 5'.length);
                    });
                },
            );
        });
    });

    describe('Some countries', () => {
        it('US: +1 212 343 3355', () => {
            openCountry('US');

            cy.get('@input').type('2123433355');
            cy.get('@input').should('have.value', '+1 212 343 3355');
        });

        it('KZ: +7 771 931 1111', () => {
            openCountry('KZ');

            cy.get('@input').type('7719311111');
            cy.get('@input').should('have.value', '+7 771 931 1111');
        });

        it('BY: +375 44 748 82 69', () => {
            openCountry('BY');

            cy.get('@input').type('447488269');
            cy.get('@input').should('have.value', '+375 44 748 82 69');
        });

        it('TR: +90 539 377 07 43', () => {
            openCountry('TR');

            cy.get('@input').type('5393770743');
            cy.get('@input').should('have.value', '+90 539 377 07 43');
        });
    });
});

function openCountry(code: string): void {
    cy.visit(`/${DemoPath.PhonePackage}/API?countryIsoCode=${code}&separator$=1`);
    cy.get('#demo-content input').should('be.visible').first().focus().as('input');
}
