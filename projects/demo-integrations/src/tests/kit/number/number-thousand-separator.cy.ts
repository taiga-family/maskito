import {openNumberPage} from './utils';

describe('Number | thousandSeparator', () => {
    beforeEach(() => {
        openNumberPage('thousandSeparator=-');
    });

    describe('adds thousand separator after pressing new digit', () => {
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
        cy.get('tr')
            .contains('[thousandSeparator]')
            .parents('tr')
            .find('tui-primitive-textfield')
            .clear();

        cy.get('@input')
            .type('1000000')
            .should('have.value', '1000000')
            .should('have.prop', 'selectionStart', '1000000'.length)
            .should('have.prop', 'selectionEnd', '1000000'.length);
    });
});
