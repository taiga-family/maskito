import {DemoPath} from '@demo/constants';

describe('ContentEditable | With Time mask', () => {
    beforeEach(() => {
        cy.visit(DemoPath.ContentEditable);
        cy.get('#time [contenteditable]')
            .should('be.visible')
            .first()
            .clear()
            .focus()
            .should('have.value', '')
            .as('element');
    });

    describe('basic typing (1 character per keydown)', () => {
        const tests = [
            // [Typed value, Masked value]
            ['1', '1'],
            ['1.', '1'],
            ['12', '12'],
            ['12:', '12:'],
            ['9', '09'],
            ['99', '09:09'],
            ['123', '12:3'],
            ['128', '12:08'],
            ['25', '2'],
        ] as const;

        tests.forEach(([typed, masked]) => {
            it(`Type ${typed} => ${masked}`, () => {
                cy.get('@element').type(typed).should('have.text', masked);
            });
        });
    });

    describe('basic deletion via backspace', () => {
        const tests = [
            // [initialValue, n-times backspace pressed, result]
            ['23:59', 1, '23:5'],
            ['23:59', 2, '23'],
            ['23:59', 3, '2'],
            ['23:59', 4, ''],
        ] as const;

        tests.forEach(([initialValue, n, result]) => {
            it(`${initialValue} => Backspace x${n} => ${result}`, () => {
                cy.get('@element')
                    .type(initialValue)
                    .type('{backspace}'.repeat(n))
                    .should('have.text', result);
            });
        });
    });

    describe('basic deletion via delete', () => {
        const tests = [
            // [initialValue, n-times backspace pressed, result]
            ['23:59', 1, '03:59'],
            ['23:59', 2, '00:59'],
            ['23:59', 3, '00:59'],
            ['23:59', 4, '00:09'],
            ['23:59', 5, '00:0'],
        ] as const;

        tests.forEach(([initialValue, n, result]) => {
            it(`${initialValue} => Move cursor to start => Delete x${n} => ${result}`, () => {
                cy.get('@element')
                    .type(initialValue)
                    .type('{moveToStart}')
                    .type('{del}'.repeat(n))
                    .should('have.text', result);
            });
        });
    });

    it('12:|36 => 12:09|', () => {
        cy.get('@element')
            .type('1236')
            .should('have.text', '12:36')
            .type('{leftArrow}'.repeat(2))
            .type('9')
            .should('have.text', '12:09');
    });
});
