import {DemoPath} from '@demo/routes';

describe('DateRange | Basic', () => {
    beforeEach(() => {
        cy.visit(`/${DemoPath.DateRange}/API?mode=DMY`);
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

        // TODO BUG!
        it.skip('12.12.2020 - 3| => Type 7 => no value changes', () => {
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
    });
});
