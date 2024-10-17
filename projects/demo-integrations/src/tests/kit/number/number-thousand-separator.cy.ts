import {openNumberPage} from './utils';

describe('Number | thousandSeparator', () => {
    describe('adds thousand separator after pressing new digit', () => {
        beforeEach(() => {
            openNumberPage('thousandSeparator=-');
        });

        const tests = [
            // [Typed value, Masked value]
            ['1', '1'],
            ['10', '10'],
            ['100', '100'],
            ['1000', '1-000'],
            ['10000', '10-000'],
            ['100000', '100-000'],
            ['1000000', '1-000-000'],
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

    describe('move thousand separator after deleting a digit (initial: 1-000-000)', () => {
        beforeEach(() => {
            openNumberPage('thousandSeparator=-');
            cy.get('@input').type('1000000');
        });

        const tests = [
            // [How many times "Backspace"-key was pressed, Masked value]
            [1, '100-000'],
            [2, '10-000'],
            [3, '1-000'],
            [4, '100'],
            [5, '10'],
            [6, '1'],
        ] as const;

        tests.forEach(([n, maskedValue]) => {
            it(`Backspace x${n} => "${maskedValue}"`, () => {
                cy.get('@input')
                    .type('{backspace}'.repeat(n))
                    .should('have.value', maskedValue)
                    .should('have.prop', 'selectionStart', maskedValue.length)
                    .should('have.prop', 'selectionEnd', maskedValue.length);
            });
        });
    });

    describe('Editing somewhere in the middle of a value (NOT the last character)', () => {
        beforeEach(() => {
            openNumberPage('thousandSeparator=-');
        });

        it('1-00|0-000 => Backspace => 10|0-000 => Type "5" => 1-05|0-000', () => {
            cy.get('@input')
                .type('1000000')
                .type('{leftArrow}'.repeat('0-000'.length))
                .should('have.prop', 'selectionStart', '1-00'.length)
                .should('have.prop', 'selectionEnd', '1-00'.length)
                .type('{backspace}')
                .should('have.value', '100-000')
                .should('have.prop', 'selectionStart', '10'.length)
                .should('have.prop', 'selectionEnd', '10'.length)
                .type('5')
                .should('have.value', '1-050-000')
                .should('have.prop', 'selectionStart', '1-05'.length)
                .should('have.prop', 'selectionEnd', '1-05'.length);
        });

        it('1-000-|000 => Backspace => 1-000|-000', () => {
            cy.get('@input')
                .type('1000000')
                .type('{leftArrow}'.repeat('000'.length))
                .should('have.prop', 'selectionStart', '1-000-'.length)
                .should('have.prop', 'selectionEnd', '1-000-'.length)
                .type('{backspace}')
                .should('have.value', '1-000-000')
                .should('have.prop', 'selectionStart', '1-000'.length)
                .should('have.prop', 'selectionEnd', '1-000'.length);
        });

        it('1-000|-000 => Delete => 1-000-|000', () => {
            cy.get('@input')
                .type('1000000')
                .type('{leftArrow}'.repeat('-000'.length))
                .should('have.prop', 'selectionStart', '1-000'.length)
                .should('have.prop', 'selectionEnd', '1-000'.length)
                .type('{del}')
                .should('have.value', '1-000-000')
                .should('have.prop', 'selectionStart', '1-000-'.length)
                .should('have.prop', 'selectionEnd', '1-000-'.length);
        });

        it('100-|000 => Delete => 10-0|00 => Type 5 => 100-5|00', () => {
            cy.get('@input')
                .type('100000')
                .type('{leftArrow}'.repeat('000'.length))
                .should('have.prop', 'selectionStart', '100-'.length)
                .should('have.prop', 'selectionEnd', '100-'.length)
                .type('{del}')
                .should('have.value', '10-000')
                .should('have.prop', 'selectionStart', '10-0'.length)
                .should('have.prop', 'selectionEnd', '10-0'.length)
                .type('5')
                .should('have.value', '100-500')
                .should('have.prop', 'selectionStart', '100-5'.length)
                .should('have.prop', 'selectionEnd', '100-5'.length);
        });

        it('100-|000 => Delete x3 => 100', () => {
            cy.get('@input')
                .type('100000')
                .type('{leftArrow}'.repeat('000'.length))
                .should('have.prop', 'selectionStart', '100-'.length)
                .should('have.prop', 'selectionEnd', '100-'.length)
                .type('{del}'.repeat(3))
                .should('have.value', '100')
                .should('have.prop', 'selectionStart', '100'.length)
                .should('have.prop', 'selectionEnd', '100'.length);
        });

        it('1|-234-567 => Backspace => 234-567', () => {
            cy.get('@input')
                .type('1234567')
                .type('{moveToStart}{rightArrow}')
                .should('have.value', '1-234-567')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1)
                .type('{backspace}')
                .should('have.value', '234-567')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });
    });

    it('allows to set empty string as thousand separator', () => {
        openNumberPage('thousandSeparator=-');

        cy.get('tr').contains('[thousandSeparator]').parents('tr').find('input').clear();

        cy.get('@input')
            .type('1000000')
            .should('have.value', '1000000')
            .should('have.prop', 'selectionStart', '1000000'.length)
            .should('have.prop', 'selectionEnd', '1000000'.length);
    });

    describe('prevent insertion of extra spaces (thousand separator is equal to non-breaking space) on invalid positions', () => {
        beforeEach(() => openNumberPage());

        it('paste value with extra leading and trailing spaces', () => {
            cy.get('@input')
                .paste('    123456    ')
                .should('have.value', '123 456')
                .should('have.prop', 'selectionStart', '123 456'.length)
                .should('have.prop', 'selectionEnd', '123 456'.length);
        });

        it('|123 => Press space => |123', () => {
            cy.get('@input')
                .type('123')
                .type('{moveToStart}')
                .type(' ')
                .should('have.value', '123')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('1|23 => Press space => 1|23', () => {
            cy.get('@input')
                .type('123')
                .type('{moveToStart}')
                .type('{rightArrow}')
                .type(' ')
                .should('have.value', '123')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('12|3 => Press space => 12|3', () => {
            cy.get('@input')
                .type('123')
                .type('{moveToStart}')
                .type('{rightArrow}'.repeat(2))
                .type(' ')
                .should('have.value', '123')
                .should('have.prop', 'selectionStart', 2)
                .should('have.prop', 'selectionEnd', 2);
        });

        it('123| => Press space => 123|', () => {
            cy.get('@input')
                .type('123')
                .type('{moveToEnd}')
                .type(' ')
                .should('have.value', '123')
                .should('have.prop', 'selectionStart', 3)
                .should('have.prop', 'selectionEnd', 3);
        });
    });
});
