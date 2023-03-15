import {DemoPath} from '@demo/path';

describe('DateRange | Basic', () => {
    beforeEach(() => {
        cy.visit(`/${DemoPath.DateRange}/API?mode=dd%2Fmm%2Fyyyy`);
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
            ['181120162', '18.11.2016 – 2'],
            ['1811201624', '18.11.2016 – 24'],
            ['18112016240', '18.11.2016 – 24.0'],
            ['181120162403', '18.11.2016 – 24.03'],
            ['18112016240320', '18.11.2016 – 24.03.20'],
            ['1811201624032020', '18.11.2016 – 24.03.2020'],
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

    describe('invalid dates cases', () => {
        it('Empty input => Type "9" => "09|"', () => {
            cy.get('@input')
                .type('9')
                .should('have.value', '09')
                .should('have.prop', 'selectionStart', '09'.length)
                .should('have.prop', 'selectionEnd', '09'.length);
        });

        it('12.12.2020| => Type "4" => 12.12.2020 - 04|', () => {
            cy.get('@input')
                .type('121220204')
                .should('have.value', '12.12.2020 – 04')
                .should('have.prop', 'selectionStart', '12.12.2020 – 04'.length)
                .should('have.prop', 'selectionEnd', '12.12.2020 – 04'.length);
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

        it('12.12.2020 - 27| => type 3 => 12.12.2020 - 27.03|', () => {
            cy.get('@input')
                .type('1212202027')
                .should('have.value', '12.12.2020 – 27')
                .should('have.prop', 'selectionStart', '12.12.2020 – 27'.length)
                .should('have.prop', 'selectionEnd', '12.12.2020 – 27'.length)
                .type('3')
                .should('have.value', '12.12.2020 – 27.03')
                .should('have.prop', 'selectionStart', '12.12.2020 – 27.03'.length)
                .should('have.prop', 'selectionEnd', '12.12.2020 – 27.03'.length);
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

        it('12.12.2020 - 3| => Type 7 => no value changes', () => {
            cy.get('@input')
                .type('121220203')
                .should('have.value', '12.12.2020 – 3')
                .should('have.prop', 'selectionStart', '12.12.2020 – 3'.length)
                .should('have.prop', 'selectionEnd', '12.12.2020 – 3'.length)
                .type('7')
                .should('have.value', '12.12.2020 – 3')
                .should('have.prop', 'selectionStart', '12.12.2020 – 3'.length)
                .should('have.prop', 'selectionEnd', '12.12.2020 – 3'.length);
        });
    });

    describe('basic erasing (value = "20.01.1990 - 31.12.2022" & caret is placed after the last value)', () => {
        beforeEach(() => {
            cy.get('@input').type('2001199031122022');
        });

        const tests = [
            // [How many times "Backspace"-key was pressed, caretPosition, Masked value]
            [1, '20.01.1990 – 31.12.202'.length, '20.01.1990 – 31.12.202'],
            [4, '20.01.1990 – 31.12'.length, '20.01.1990 – 31.12'],
            [5, '20.01.1990 – 31.1'.length, '20.01.1990 – 31.1'],
            [6, '20.01.1990 – 31'.length, '20.01.1990 – 31'],
            [8, '20.01.1990'.length, '20.01.1990'],
            [12, '20.01'.length, '20.01'],
            [13, '20.0'.length, '20.0'],
            [14, '20'.length, '20'],
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
                .should('have.value', '20.01.1990 – 31.12.2022')
                .should('have.prop', 'selectionStart', '20.01.1990 – 31.12.2022'.length)
                .should('have.prop', 'selectionEnd', '20.01.1990 – 31.12.2022'.length);
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
        it('25.02.19|99 - 17.05.2000 => Backspace => 25.02.1|099 - 17.05.2000 => Type "8" => 25.02.18|99 - 17.05.2000', () => {
            cy.get('@input')
                .type('25.02.1999-17.05.2000')
                .should('have.value', '25.02.1999 – 17.05.2000')
                .type('{leftArrow}'.repeat('99 – 17.05.2000'.length))
                .should('have.prop', 'selectionStart', '25.02.19'.length)
                .should('have.prop', 'selectionEnd', '25.02.19'.length)
                .type('{backspace}')
                .should('have.value', '25.02.1099 – 17.05.2000')
                .should('have.prop', 'selectionStart', '25.02.1'.length)
                .should('have.prop', 'selectionEnd', '25.02.1'.length)
                .type('8')
                .should('have.value', '25.02.1899 – 17.05.2000')
                .should('have.prop', 'selectionStart', '25.02.18'.length)
                .should('have.prop', 'selectionEnd', '25.02.18'.length);
        });

        it('13.06.1736 - 14.09|.1821 => Backspace => 13.06.1736 - 14.0|1.1821 => Type "3" => 13.06.1736 - 14.03|.1821', () => {
            cy.get('@input')
                .type('13.06.1736-14.09.1821')
                .should('have.value', '13.06.1736 – 14.09.1821')
                .type('{leftArrow}'.repeat('.1821'.length))
                .should('have.prop', 'selectionStart', '13.06.1736 - 14.09'.length)
                .should('have.prop', 'selectionEnd', '13.06.1736 - 14.09'.length)
                .type('{backspace}')
                .should('have.value', '13.06.1736 – 14.01.1821')
                .should('have.prop', 'selectionStart', '13.06.1736 - 14.0'.length)
                .should('have.prop', 'selectionEnd', '13.06.1736 - 14.0'.length)
                .type('3')
                .should('have.value', '13.06.1736 – 14.03.1821')
                .should('have.prop', 'selectionStart', '13.06.1736 - 14.03.'.length)
                .should('have.prop', 'selectionEnd', '13.06.1736 - 14.03.'.length);
        });

        it('12|.01.2008 - 27.01.2020 => Backspace => 1|0.01.2008 - 27.01.2020 => Type "1" => 11|.01.2008 - 27.01.2020', () => {
            cy.get('@input')
                .type('12012008-27012020')
                .should('have.value', '12.01.2008 – 27.01.2020')
                .type('{leftArrow}'.repeat('.01.2008 - 27.01.2020'.length))
                .should('have.prop', 'selectionStart', '12'.length)
                .should('have.prop', 'selectionEnd', '12'.length)
                .type('{backspace}')
                .should('have.value', '10.01.2008 – 27.01.2020')
                .should('have.prop', 'selectionStart', '1'.length)
                .should('have.prop', 'selectionEnd', '1'.length)
                .type('1')
                .should('have.value', '11.01.2008 – 27.01.2020')
                .should('have.prop', 'selectionStart', '11.'.length)
                .should('have.prop', 'selectionEnd', '11.'.length);
        });

        it('12.01.2008 - 2|7.01.2020 => Backspace => 12.01.2008 - |07.01.2020 => Type "1" => 12.01.2008 - 1|7.01.2020', () => {
            cy.get('@input')
                .type('12012008-27012020')
                .should('have.value', '12.01.2008 – 27.01.2020')
                .type('{leftArrow}'.repeat('7.01.2020'.length))
                .should('have.prop', 'selectionStart', '12.01.2008 - 2'.length)
                .should('have.prop', 'selectionEnd', '12.01.2008 - 2'.length)
                .type('{backspace}')
                .should('have.value', '12.01.2008 – 07.01.2020')
                .should('have.prop', 'selectionStart', '12.01.2008 - '.length)
                .should('have.prop', 'selectionEnd', '12.01.2008 - '.length)
                .type('1')
                .should('have.value', '12.01.2008 – 17.01.2020')
                .should('have.prop', 'selectionStart', '12.01.2008 - 1'.length)
                .should('have.prop', 'selectionEnd', '12.01.2008 - 1'.length);
        });

        it('12.|12.2010 - 12.12.2020 => Type "9" => 12.09.|2010 - 12.12.2020', () => {
            cy.get('@input')
                .type('12122010-12122020')
                .should('have.value', '12.12.2010 – 12.12.2020')
                .type('{leftArrow}'.repeat('12.2010 - 12.12.2020'.length))
                .should('have.prop', 'selectionStart', '12.'.length)
                .should('have.prop', 'selectionEnd', '12.'.length)
                .type('9')
                .should('have.value', '12.09.2010 – 12.12.2020')
                .should('have.prop', 'selectionStart', '12.09.'.length)
                .should('have.prop', 'selectionEnd', '12.09.'.length);
        });

        it('12.12.2010 - 12.|12.2020 => Type "9" => 12.12.2010 - 12.09|.2020', () => {
            cy.get('@input')
                .type('12122010-12122020')
                .should('have.value', '12.12.2010 – 12.12.2020')
                .type('{leftArrow}'.repeat('12.2020'.length))
                .should('have.prop', 'selectionStart', '12.12.2010 - 12.'.length)
                .should('have.prop', 'selectionEnd', '12.12.2010 - 12.'.length)
                .type('9')
                .should('have.value', '12.12.2010 – 12.09.2020')
                .should('have.prop', 'selectionStart', '12.12.2010 - 12.09.'.length)
                .should('have.prop', 'selectionEnd', '12.12.2010 - 12.09.'.length);
        });

        it('|15.01.2012 - 15.01.2022 => Type "3" => 3|0.01.2012 - 15.01.2022', () => {
            cy.get('@input')
                .type('15012012-15012022')
                .should('have.value', '15.01.2012 – 15.01.2022')
                .type('{leftArrow}'.repeat('15.01.2012 - 15.01.2022'.length))
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0)
                .type('3')
                .should('have.value', '30.01.2012 – 15.01.2022')
                .should('have.prop', 'selectionStart', '3'.length)
                .should('have.prop', 'selectionEnd', '3'.length);
        });

        it('15.01.2012 - |15.01.2022 => Type "3" => 15.01.2012 - 3|0.01.2022', () => {
            cy.get('@input')
                .type('15012012-15012022')
                .should('have.value', '15.01.2012 – 15.01.2022')
                .type('{leftArrow}'.repeat('15.01.2022'.length))
                .should('have.prop', 'selectionStart', '15.01.2012 - '.length)
                .should('have.prop', 'selectionEnd', '15.01.2012 - '.length)
                .type('3')
                .should('have.value', '15.01.2012 – 30.01.2022')
                .should('have.prop', 'selectionStart', '15.01.2012 - 3'.length)
                .should('have.prop', 'selectionEnd', '15.01.2012 - 3'.length);
        });
    });

    describe('Fixed values', () => {
        it('Press Backspace after fixed value => no value change => move caret to the left', () => {
            cy.get('@input')
                .type('28032015-01042021')
                .should('have.value', '28.03.2015 – 01.04.2021')
                .type('{leftArrow}'.repeat(' 01.04.2021'.length))
                .should('have.prop', 'selectionStart', '28.03.2015 -'.length)
                .should('have.prop', 'selectionEnd', '28.03.2015 -'.length)
                .type('{backspace}')
                .should('have.value', '28.03.2015 – 01.04.2021')
                .should('have.prop', 'selectionStart', '28.03.2015 '.length)
                .should('have.prop', 'selectionEnd', '28.03.2015 '.length);
        });

        it('Press Delete after fixed value => no value change => move caret to the right', () => {
            cy.get('@input')
                .type('28032015-01042021')
                .should('have.value', '28.03.2015 – 01.04.2021')
                .type('{leftArrow}'.repeat('.04.2021'.length))
                .should('have.prop', 'selectionStart', '28.03.2015 – 01'.length)
                .should('have.prop', 'selectionEnd', '28.03.2015 – 01'.length)
                .type('{del}')
                .should('have.value', '28.03.2015 – 01.04.2021')
                .should('have.prop', 'selectionStart', '28.03.2015 – 01.'.length)
                .should('have.prop', 'selectionEnd', '28.03.2015 – 01.'.length);
        });
    });

    describe('Text selection', () => {
        describe('Select range and press Backspace / Delete', () => {
            it('10.|12|.2005 - 16.12.2007 => Backspace => 10.|01.2005 - 16.12.2007', () => {
                cy.get('@input')
                    .type('10122005-16122007')
                    .should('have.value', '10.12.2005 – 16.12.2007')
                    .type('{leftArrow}'.repeat('.2005 - 16.12.2007'.length))
                    .realPress([
                        'Shift',
                        ...Array('12'.length).fill('ArrowLeft'),
                        'Backspace',
                    ]);

                cy.get('@input')
                    .should('have.value', '10.01.2005 – 16.12.2007')
                    .should('have.prop', 'selectionStart', '10.'.length)
                    .should('have.prop', 'selectionEnd', '10.'.length);
            });

            it('10.12.2005 - |16|.12.2007 => Backspace => 10.12.2005 - |01.12.2007', () => {
                cy.get('@input')
                    .type('10122005-16122007')
                    .should('have.value', '10.12.2005 – 16.12.2007')
                    .type('{leftArrow}'.repeat('.12.2007'.length))
                    .realPress([
                        'Shift',
                        ...Array('16'.length).fill('ArrowLeft'),
                        'Backspace',
                    ]);

                cy.get('@input')
                    .should('have.value', '10.12.2005 – 01.12.2007')
                    .should('have.prop', 'selectionStart', '10.12.2005 - '.length)
                    .should('have.prop', 'selectionEnd', '10.12.2005 - '.length);
            });

            it('1|1.1|1.2011 - 11.11.2025 => Delete => 10.0|1.2011 - 11.11.2025', () => {
                cy.get('@input')
                    .type('11112011-11112025')
                    .should('have.value', '11.11.2011 – 11.11.2025')
                    .type('{leftArrow}'.repeat('1.2011 – 11.11.2025'.length))
                    .realPress(['Shift', ...Array('1.1'.length).fill('ArrowLeft')]);

                cy.get('@input')
                    .type('{del}')
                    .should('have.value', '10.01.2011 – 11.11.2025')
                    .should('have.prop', 'selectionStart', '10.0'.length)
                    .should('have.prop', 'selectionEnd', '10.0'.length);
            });

            it('11.11.2011 - 1|1.1|1.2025 => Delete => 11.11.2011 - 10.0|1.2025', () => {
                cy.get('@input')
                    .type('11112011-11112025')
                    .should('have.value', '11.11.2011 – 11.11.2025')
                    .type('{leftArrow}'.repeat('1.2025'.length))
                    .realPress(['Shift', ...Array('1.1'.length).fill('ArrowLeft')]);

                cy.get('@input')
                    .type('{del}')
                    .should('have.value', '11.11.2011 – 10.01.2025')
                    .should('have.prop', 'selectionStart', '11.11.2011 - 10.0'.length)
                    .should('have.prop', 'selectionEnd', '11.11.2011 - 10.0'.length);
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

            it('01.01.2000 - |12|.11.2022 => Press 3 => 01.01.2000 - 3|0.11.2022', () => {
                cy.get('@input')
                    .type('01012000-12112022')
                    .type('{leftArrow}'.repeat('.11.2022'.length))
                    .realPress(['Shift', ...Array('12'.length).fill('ArrowLeft')]);

                cy.get('@input')
                    .type('3')
                    .should('have.value', '01.01.2000 – 30.11.2022')
                    .should('have.prop', 'selectionStart', '01.01.2000 - 3'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000 - 3'.length);
            });
        });
    });
});
