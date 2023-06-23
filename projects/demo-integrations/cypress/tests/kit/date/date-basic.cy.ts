import {DemoPath} from '@demo/constants';

import {BROWSER_SUPPORTS_REAL_EVENTS} from '../../../support/constants';

describe('Date', () => {
    describe('Basic', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Date}/API?mode=dd%2Fmm%2Fyyyy`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        describe('basic typing (1 character per keydown)', () => {
            const tests = [
                // [Typed value, Masked value, caretIndex]
                ['1', '1', 1],
                ['12', '12', '12'.length],
                ['121', '12.1', '12.1'.length],
                ['1211', '12.11', '12.11'.length],
                ['0', '0', 1],
                ['00', '0', '0'.length],
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

            it('Type "9" => "09|"', () => {
                cy.get('@input')
                    .type('9')
                    .should('have.value', '09')
                    .should('have.prop', 'selectionStart', '09'.length)
                    .should('have.prop', 'selectionEnd', '09'.length);
            });

            it('27| => type 9 => 27.09|', () => {
                cy.get('@input')
                    .type('27')
                    .should('have.value', '27')
                    .should('have.prop', 'selectionStart', '27'.length)
                    .should('have.prop', 'selectionEnd', '27'.length)
                    .type('9')
                    .should('have.value', '27.09')
                    .should('have.prop', 'selectionStart', '27.09'.length)
                    .should('have.prop', 'selectionEnd', '27.09'.length);
            });

            it('3| => Type 7 => no value changes', () => {
                cy.get('@input')
                    .type('3')
                    .should('have.value', '3')
                    .should('have.prop', 'selectionStart', '3'.length)
                    .should('have.prop', 'selectionEnd', '3'.length)
                    .type('7')
                    .should('have.value', '3')
                    .should('have.prop', 'selectionStart', '3'.length)
                    .should('have.prop', 'selectionEnd', '3'.length);
            });

            it('year less than 100', () => {
                cy.get('@input')
                    .type('10100012')
                    .should('have.value', '10.10.0012')
                    .should('have.prop', 'selectionStart', '10.10.0012'.length)
                    .should('have.prop', 'selectionEnd', '10.10.0012'.length);
            });
        });

        describe('basic erasing (value = "10.11.2002" & caret is placed after the last value)', () => {
            beforeEach(() => {
                cy.get('@input').type('10112002');
            });

            const tests = [
                // [How many times "Backspace"-key was pressed, caretPosition, Masked value]
                [1, '10.11.200'.length, '10.11.200'],
                [2, '10.11.20'.length, '10.11.20'],
                [3, '10.11.2'.length, '10.11.2'],
                [4, '10.11'.length, '10.11'],
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

            it('Delete => no value change && no caret index change', () => {
                cy.get('@input')
                    .type('{del}')
                    .should('have.value', '10.11.2002')
                    .should('have.prop', 'selectionStart', '10.11.2002'.length)
                    .should('have.prop', 'selectionEnd', '10.11.2002'.length);
            });

            it('Type `deleteWordBackward` of `InputEvent` works', () => {
                cy.get('@input')
                    .type('{ctrl+backspace}')
                    .should('have.value', '')
                    .should('have.prop', 'selectionStart', ''.length)
                    .should('have.prop', 'selectionEnd', ''.length);
            });

            it('Type `deleteWordForward` of `InputEvent` works', () => {
                cy.get('@input')
                    .type('{moveToStart}')
                    .type('{ctrl+del}')
                    .should('have.value', '')
                    .should('have.prop', 'selectionStart', ''.length)
                    .should('have.prop', 'selectionEnd', ''.length);
            });

            it('Type `deleteSoftLineForward` of `InputEvent` works', () => {
                cy.get('@input')
                    .type('{moveToStart}')
                    .trigger('beforeinput', {inputType: 'deleteSoftLineForward'})
                    .should('have.value', '')
                    .should('have.prop', 'selectionStart', ''.length)
                    .should('have.prop', 'selectionEnd', ''.length);
            });

            it('Type `deleteSoftLineBackward` of `InputEvent` works', () => {
                cy.get('@input')
                    .trigger('beforeinput', {inputType: 'deleteSoftLineBackward'})
                    .should('have.value', '')
                    .should('have.prop', 'selectionStart', ''.length)
                    .should('have.prop', 'selectionEnd', ''.length);
            });
        });

        describe('Editing somewhere in the middle of a value (NOT the last character)', () => {
            it('01.1|2.1998 => Backspace => 01.|02.1998 => Type "1" => 01.1|2.1998', () => {
                cy.get('@input')
                    .type('01121998')
                    .type('{leftArrow}'.repeat(6))
                    .should('have.prop', 'selectionStart', '01.1'.length)
                    .should('have.prop', 'selectionEnd', '01.1'.length)
                    .type('{backspace}')
                    .should('have.value', '01.02.1998')
                    .should('have.prop', 'selectionStart', '01.'.length)
                    .should('have.prop', 'selectionEnd', '01.'.length)
                    .type('1')
                    .should('have.value', '01.12.1998')
                    .should('have.prop', 'selectionStart', '01.1'.length)
                    .should('have.prop', 'selectionEnd', '01.1'.length);
            });

            it('12|.01.2008 => Backspace => 1|0.01.2008 => Type "1" => 11|.01.2008', () => {
                cy.get('@input')
                    .type('12012008')
                    .type('{leftArrow}'.repeat('.01.2008'.length))
                    .should('have.prop', 'selectionStart', '12'.length)
                    .should('have.prop', 'selectionEnd', '12'.length)
                    .type('{backspace}')
                    .should('have.value', '10.01.2008')
                    .should('have.prop', 'selectionStart', '1'.length)
                    .should('have.prop', 'selectionEnd', '1'.length)
                    .type('1')
                    .should('have.value', '11.01.2008')
                    .should('have.prop', 'selectionStart', '11:'.length)
                    .should('have.prop', 'selectionEnd', '11:'.length);
            });

            it('12.|12.2010 => Type "9" => 12.09.|2010', () => {
                cy.get('@input')
                    .type('12122010')
                    .type('{leftArrow}'.repeat('12.2010'.length))
                    .should('have.prop', 'selectionStart', '12.'.length)
                    .should('have.prop', 'selectionEnd', '12.'.length)
                    .type('9')
                    .should('have.value', '12.09.2010')
                    .should('have.prop', 'selectionStart', '12.09.'.length)
                    .should('have.prop', 'selectionEnd', '12.09.'.length);
            });

            it('|15.01.2012 => Type "3" => 3|0.01.2012', () => {
                cy.get('@input')
                    .type('15012012')
                    .type('{moveToStart}')
                    .should('have.prop', 'selectionStart', 0)
                    .should('have.prop', 'selectionEnd', 0)
                    .type('3')
                    .should('have.value', '30.01.2012')
                    .should('have.prop', 'selectionStart', '3'.length)
                    .should('have.prop', 'selectionEnd', '3'.length);
            });

            it('02|.01.2008 => Backspace => 0|1.01.2008 => Type "5" => 05|.01.2008', () => {
                cy.get('@input')
                    .type('02012008')
                    .type('{leftArrow}'.repeat('.01.2008'.length))
                    .should('have.prop', 'selectionStart', '02'.length)
                    .should('have.prop', 'selectionEnd', '02'.length)
                    .type('{backspace}')
                    .should('have.value', '01.01.2008')
                    .should('have.prop', 'selectionStart', '0'.length)
                    .should('have.prop', 'selectionEnd', '0'.length)
                    .type('5')
                    .should('have.value', '05.01.2008')
                    .should('have.prop', 'selectionStart', '05.'.length)
                    .should('have.prop', 'selectionEnd', '05.'.length);
            });
        });

        describe('Fixed values', () => {
            it('Press Backspace after fixed value => no value change => move caret to the left', () => {
                cy.get('@input')
                    .type('10122022')
                    .type('{leftArrow}'.repeat('2022'.length))
                    .should('have.prop', 'selectionStart', '10.12.'.length)
                    .should('have.prop', 'selectionEnd', '10.12.'.length)
                    .type('{backspace}')
                    .should('have.value', '10.12.2022')
                    .should('have.prop', 'selectionStart', '10.12'.length)
                    .should('have.prop', 'selectionEnd', '10.12'.length);
            });

            it('Press Delete after fixed value => no value change => move caret to the right', () => {
                cy.get('@input')
                    .type('10122022')
                    .type('{leftArrow}'.repeat('.2022'.length))
                    .should('have.prop', 'selectionStart', '10.12'.length)
                    .should('have.prop', 'selectionEnd', '10.12'.length)
                    .type('{del}')
                    .should('have.value', '10.12.2022')
                    .should('have.prop', 'selectionStart', '10.12.'.length)
                    .should('have.prop', 'selectionEnd', '10.12.'.length);
            });
        });

        describe('Text selection', () => {
            describe('Select range and press Backspace', () => {
                it(
                    '10.|12|.2022 => Backspace => 10.|01.2022',
                    BROWSER_SUPPORTS_REAL_EVENTS,
                    () => {
                        cy.get('@input')
                            .type('10122022')
                            .type('{leftArrow}'.repeat('.2022'.length))
                            .realPress([
                                'Shift',
                                ...Array('12'.length).fill('ArrowLeft'),
                                'Backspace',
                            ]);

                        cy.get('@input')
                            .should('have.value', '10.01.2022')
                            .should('have.prop', 'selectionStart', '10.'.length)
                            .should('have.prop', 'selectionEnd', '10.'.length);
                    },
                );

                it(
                    '1|1.1|1.2011 => Backspace => 1|0.01.2011',
                    BROWSER_SUPPORTS_REAL_EVENTS,
                    () => {
                        cy.get('@input')
                            .type('11112011')
                            .type('{leftArrow}'.repeat('1.2011'.length))
                            .realPress([
                                'Shift',
                                ...Array('1.1'.length).fill('ArrowLeft'),
                                'Backspace',
                            ]);

                        cy.get('@input')
                            .should('have.value', '10.01.2011')
                            .should('have.prop', 'selectionStart', '1'.length)
                            .should('have.prop', 'selectionEnd', '1'.length);
                    },
                );
            });

            describe('Select range and press new digit', () => {
                it(
                    '|12|.11.2022 => Press 3 => 3|0.11.2022',
                    BROWSER_SUPPORTS_REAL_EVENTS,
                    () => {
                        cy.get('@input')
                            .type('12112022')
                            .type('{leftArrow}'.repeat('.11.2022'.length))
                            .realPress([
                                'Shift',
                                ...Array('12'.length).fill('ArrowLeft'),
                            ]);

                        cy.get('@input')
                            .type('3')
                            .should('have.value', '30.11.2022')
                            .should('have.prop', 'selectionStart', '3'.length)
                            .should('have.prop', 'selectionEnd', '3'.length);
                    },
                );

                it(
                    '|12|.11.2022 => Press 0 => 0|1.11.2022',
                    BROWSER_SUPPORTS_REAL_EVENTS,
                    () => {
                        cy.get('@input')
                            .type('12112022')
                            .type('{leftArrow}'.repeat('.11.2022'.length))
                            .realPress([
                                'Shift',
                                ...Array('12'.length).fill('ArrowLeft'),
                            ]);

                        cy.get('@input')
                            .type('0')
                            .should('have.value', '01.11.2022')
                            .should('have.prop', 'selectionStart', '0'.length)
                            .should('have.prop', 'selectionEnd', '0'.length);
                    },
                );

                it('|12.11.2022| => Press 0 => 0|', () => {
                    cy.get('@input')
                        .type('12112022')
                        .type('{selectAll}')
                        .type('0')
                        .should('have.value', '0')
                        .should('have.prop', 'selectionStart', '0'.length)
                        .should('have.prop', 'selectionEnd', '0'.length);
                });

                it('|12.11.2022| => Press 1 => 1|', () => {
                    cy.get('@input')
                        .type('12112022')
                        .type('{selectAll}')
                        .type('1')
                        .should('have.value', '1')
                        .should('have.prop', 'selectionStart', '1'.length)
                        .should('have.prop', 'selectionEnd', '1'.length);
                });
            });
        });
    });
});
