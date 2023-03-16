import {DemoPath} from '@demo/path';

describe('DateTime | Basic', () => {
    beforeEach(() => {
        cy.visit(
            `/${DemoPath.DateTime}/API?dateMode=dd%2Fmm%2Fyyyy&timeMode=HH:MM:SS.MSS`,
        );
        cy.get('#demo-content input').should('be.visible').first().focus().as('input');
    });

    describe('basic typing', () => {
        const tests = [
            // [Typed value, Masked value]
            ['1', '1'],
            ['18', '18'],
            ['181', '18.1'],
            ['1811', '18.11'],
            ['18112', '18.11.2'],
            ['18112016', '18.11.2016'],
            ['181120162', '18.11.2016, 2'],
            ['1811201623', '18.11.2016, 23'],
            ['18112016231', '18.11.2016, 23:1'],
            ['181120162315', '18.11.2016, 23:15'],
            ['1811201623152', '18.11.2016, 23:15:2'],
            ['18112016231522', '18.11.2016, 23:15:22'],
            ['18112016231522123', '18.11.2016, 23:15:22.123'],
            ['0', '0'],
            ['00', '0'],
        ] as const;

        tests.forEach(([typedValue, maskedValue]) => {
            it(`Type "${typedValue}" => "${maskedValue}"`, () => {
                cy.get('@input')
                    .type(typedValue)
                    .should('have.value', maskedValue)
                    .should('have.prop', 'selectionStart', maskedValue.length)
                    .should('have.prop', 'selectionEnd', maskedValue.length);
            });
        });
    });

    describe('invalid date cases', () => {
        it('Empty input => Type "9" => "09|"', () => {
            cy.get('@input')
                .type('9')
                .should('have.value', '09')
                .should('have.prop', 'selectionStart', '09'.length)
                .should('have.prop', 'selectionEnd', '09'.length);
        });

        it('27| => type 2 => 27.02|', () => {
            cy.get('@input')
                .type('27')
                .should('have.value', '27')
                .should('have.prop', 'selectionStart', '27'.length)
                .should('have.prop', 'selectionEnd', '27'.length)
                .type('2')
                .should('have.value', '27.02')
                .should('have.prop', 'selectionStart', '27.02'.length)
                .should('have.prop', 'selectionEnd', '27.02'.length);
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
    });

    describe('invalid time cases', () => {
        beforeEach(() => {
            cy.get('@input').type('10102020');
        });
        it('"10.10.2020" => Type "9" => "10.10.2020, 09|"', () => {
            cy.get('@input')
                .type('9')
                .should('have.value', '10.10.2020, 09')
                .should('have.prop', 'selectionStart', '10.10.2020, 09'.length)
                .should('have.prop', 'selectionEnd', '10.10.2020, 09'.length);
        });

        it('"10.10.2020, 10" => Type "9" => "10.10.2020, 10:09|"', () => {
            cy.get('@input')
                .type('10')
                .should('have.value', '10.10.2020, 10')
                .should('have.prop', 'selectionStart', '10.10.2020, 10'.length)
                .should('have.prop', 'selectionEnd', '10.10.2020, 10'.length)
                .type('9')
                .should('have.value', '10.10.2020, 10:09')
                .should('have.prop', 'selectionStart', '10.10.2020, 10:09'.length)
                .should('have.prop', 'selectionEnd', '10.10.2020, 10:09'.length);
        });

        it('"10.10.2020, 2" => Type "7" => no value changes', () => {
            cy.get('@input')
                .type('2')
                .should('have.value', '10.10.2020, 2')
                .should('have.prop', 'selectionStart', '10.10.2020, 2'.length)
                .should('have.prop', 'selectionEnd', '10.10.2020, 2'.length)
                .type('7')
                .should('have.value', '10.10.2020, 2')
                .should('have.prop', 'selectionStart', '10.10.2020, 2'.length)
                .should('have.prop', 'selectionEnd', '10.10.2020, 2'.length);
        });
    });

    describe('basic erasing (value = "20.01.1990, 15:40:20" & caret is placed after the last value)', () => {
        beforeEach(() => {
            cy.get('@input').type('20011990154020');
        });

        const tests = [
            // [How many times "Backspace"-key was pressed, caretPosition, Masked value]
            [1, '20.01.1990, 15:40:2'.length, '20.01.1990, 15:40:2'],
            [4, '20.01.1990, 15'.length, '20.01.1990, 15'],
            [5, '20.01.1990, 1'.length, '20.01.1990, 1'],
            [6, '20.01.1990'.length, '20.01.1990'],
            [8, '20.01.19'.length, '20.01.19'],
            [12, '20'.length, '20'],
            [13, '2'.length, '2'],
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
                .should('have.value', '20.01.1990, 15:40:20')
                .should('have.prop', 'selectionStart', '20.01.1990, 15:40:20'.length)
                .should('have.prop', 'selectionEnd', '20.01.1990, 15:40:20'.length);
        });

        it('Type `deleteWordBackward` of `InputEvent` works', () => {
            cy.get('@input')
                .type('{ctrl+backspace}')
                .should('have.value', '20.01.1990')
                .should('have.prop', 'selectionStart', '20.01.1990'.length)
                .should('have.prop', 'selectionEnd', '20.01.1990'.length)
                .type('{ctrl+backspace}')
                .should('have.value', '')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });
    });

    describe('Editing somewhere in the middle of a value (NOT the last character)', () => {
        it('25.02.19|99, 15:35 => Backspace => 25.02.1|099, 15:35 => Type "8" => 25.02.18|99, 15:35', () => {
            cy.get('@input')
                .type('250219991535')
                .should('have.value', '25.02.1999, 15:35')
                .type('{leftArrow}'.repeat('99, 15:35'.length))
                .should('have.prop', 'selectionStart', '25.02.19'.length)
                .should('have.prop', 'selectionEnd', '25.02.19'.length)
                .type('{backspace}')
                .should('have.value', '25.02.1099, 15:35')
                .should('have.prop', 'selectionStart', '25.02.1'.length)
                .should('have.prop', 'selectionEnd', '25.02.1'.length)
                .type('8')
                .should('have.value', '25.02.1899, 15:35')
                .should('have.prop', 'selectionStart', '25.02.18'.length)
                .should('have.prop', 'selectionEnd', '25.02.18'.length);
        });

        it('13.06.1736, 15:05|:20 => Backspace => 13.06.1736, 15:0|0:20 => Type "3" => 13.06.1736, 15:03:20', () => {
            cy.get('@input')
                .type('13061736150520')
                .should('have.value', '13.06.1736, 15:05:20')
                .type('{leftArrow}'.repeat(':20'.length))
                .should('have.prop', 'selectionStart', '13.06.1736, 15:05'.length)
                .should('have.prop', 'selectionEnd', '13.06.1736, 15:05'.length)
                .type('{backspace}')
                .should('have.value', '13.06.1736, 15:00:20')
                .should('have.prop', 'selectionStart', '13.06.1736, 15:0'.length)
                .should('have.prop', 'selectionEnd', '13.06.1736, 15:0'.length)
                .type('3')
                .should('have.value', '13.06.1736, 15:03:20')
                .should('have.prop', 'selectionStart', '13.06.1736, 15:03:'.length)
                .should('have.prop', 'selectionEnd', '13.06.1736, 15:03:'.length);
        });

        it('12.|12.2010, 12:30 => Type "9" => 12.09.|2010, 12:30', () => {
            cy.get('@input')
                .type('121220101230')
                .should('have.value', '12.12.2010, 12:30')
                .type('{leftArrow}'.repeat('12.2010, 12:30'.length))
                .should('have.prop', 'selectionStart', '12.'.length)
                .should('have.prop', 'selectionEnd', '12.'.length)
                .type('9')
                .should('have.value', '12.09.2010, 12:30')
                .should('have.prop', 'selectionStart', '12.09.'.length)
                .should('have.prop', 'selectionEnd', '12.09.'.length);
        });

        it('12.12.2010, |12:30 => Type "9" => 12.12.2010, 09|:30', () => {
            cy.get('@input')
                .type('121220101230')
                .should('have.value', '12.12.2010, 12:30')
                .type('{leftArrow}'.repeat('12:30'.length))
                .should('have.prop', 'selectionStart', '12.12.2010, '.length)
                .should('have.prop', 'selectionEnd', '12.12.2010, '.length)
                .type('9')
                .should('have.value', '12.12.2010, 09:30')
                .should('have.prop', 'selectionStart', '12.12.2010, 09:'.length)
                .should('have.prop', 'selectionEnd', '12.12.2010, 09:'.length);
        });
    });

    describe('Text selection', () => {
        describe('Select range and press Backspace / Delete', () => {
            it('10.|12|.2005, 12:30 => Backspace => 10.|01.2005, 12:30', () => {
                cy.get('@input')
                    .type('101220051230')
                    .should('have.value', '10.12.2005, 12:30')
                    .type('{leftArrow}'.repeat('.2005, 12:30'.length))
                    .realPress([
                        'Shift',
                        ...Array('12'.length).fill('ArrowLeft'),
                        'Backspace',
                    ]);

                cy.get('@input')
                    .should('have.value', '10.01.2005, 12:30')
                    .should('have.prop', 'selectionStart', '10.'.length)
                    .should('have.prop', 'selectionEnd', '10.'.length);
            });

            it('10.12.2005, |12|:30 => Backspace => 10.12.2005, |00:30', () => {
                cy.get('@input')
                    .type('101220051230')
                    .should('have.value', '10.12.2005, 12:30')
                    .type('{leftArrow}'.repeat(':30'.length))
                    .realPress([
                        'Shift',
                        ...Array('12'.length).fill('ArrowLeft'),
                        'Backspace',
                    ]);

                cy.get('@input')
                    .should('have.value', '10.12.2005, 00:30')
                    .should('have.prop', 'selectionStart', '10.12.2005, '.length)
                    .should('have.prop', 'selectionEnd', '10.12.2005, '.length);
            });

            it('1|1.1|1.2011, 12:30 => Delete => 10.0|1.2011, 12:30', () => {
                cy.get('@input')
                    .type('111120111230')
                    .should('have.value', '11.11.2011, 12:30')
                    .type('{leftArrow}'.repeat('1.2011, 12:30'.length))
                    .realPress(['Shift', ...Array('1.1'.length).fill('ArrowLeft')]);

                cy.get('@input')
                    .type('{del}')
                    .should('have.value', '10.01.2011, 12:30')
                    .should('have.prop', 'selectionStart', '10.0'.length)
                    .should('have.prop', 'selectionEnd', '10.0'.length);
            });

            it('11.11.2011, 1|2:3|0 => Delete => 11.11.2011, 10:0|0', () => {
                cy.get('@input')
                    .type('111120111230')
                    .should('have.value', '11.11.2011, 12:30')
                    .type('{leftArrow}'.repeat('0'.length))
                    .realPress(['Shift', ...Array('2.3'.length).fill('ArrowLeft')]);

                cy.get('@input')
                    .type('{del}')
                    .should('have.value', '11.11.2011, 10:00')
                    .should('have.prop', 'selectionStart', '11.11.2011, 10:0'.length)
                    .should('have.prop', 'selectionEnd', '11.11.2011, 10:0'.length);
            });
        });

        describe('Select range and press new digit', () => {
            it('|12|.11.2022 (specifically do not completes value) => Press 3 => 3|0.11.2022', () => {
                cy.get('@input')
                    .type('12112022')
                    .type('{leftArrow}'.repeat('.11.2022'.length))
                    .realPress(['Shift', ...Array('12'.length).fill('ArrowLeft')]);

                cy.get('@input')
                    .type('3')
                    .should('have.value', '30.11.2022')
                    .should('have.prop', 'selectionStart', '3'.length)
                    .should('have.prop', 'selectionEnd', '3'.length);
            });

            it('01.01.2000, |12|:30 => Press 2 => 01.01.2000, 2|0:30', () => {
                cy.get('@input')
                    .type('010120001230')
                    .type('{leftArrow}'.repeat(':30'.length))
                    .realPress(['Shift', ...Array('12'.length).fill('ArrowLeft')]);

                cy.get('@input')
                    .type('2')
                    .should('have.value', '01.01.2000, 20:30')
                    .should('have.prop', 'selectionStart', '01.01.2000, 2'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 2'.length);
            });
        });
    });
});
