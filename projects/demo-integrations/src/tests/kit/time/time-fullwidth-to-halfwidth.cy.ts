import {DemoPath} from '@demo/constants';

describe('Time', () => {
    describe('Full width character parsing', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Time}/API?mode=HH:MM`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        describe('basic typing (1 character per keydown)', () => {
            const tests = [
                // [Typed value, Masked value, caretIndex]
                ['１', '1', 1],
                ['１２', '12', '12'.length],
                ['１２：', '12:', '12:'.length],
                ['１２３', '12:3', '12:3'.length],
                ['１２３４', '12:34', '12:34'.length],
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
    });
});
