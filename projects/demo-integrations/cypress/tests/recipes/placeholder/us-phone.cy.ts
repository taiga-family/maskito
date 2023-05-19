import {DemoPath} from '@demo/constants';

describe('Placeholder | US phone', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Placeholder);
        cy.get('#phone input')
            .should('be.visible')
            .first()
            .should('have.value', '')
            .focus()
            .should('have.value', '+1 (   ) ___-____')
            .should('have.prop', 'selectionStart', '+1'.length)
            .should('have.prop', 'selectionEnd', '+1'.length)
            .as('input');
    });

    describe('basic typing (1 character per keydown)', () => {
        const tests = [
            // [Typed value, Masked value, caretIndex]
            ['2', '+1 (2  ) ___-____', '+1 (2'.length],
            ['21', '+1 (21 ) ___-____', '+1 (21'.length],
            ['212', '+1 (212) ___-____', '+1 (212'.length],
            ['2125', '+1 (212) 5__-____', '+1 (212) 5'.length],
            ['21255', '+1 (212) 55_-____', '+1 (212) 55'.length],
            ['212555', '+1 (212) 555-____', '+1 (212) 555'.length],
            ['2125552', '+1 (212) 555-2___', '+1 (212) 555-2'.length],
            ['21255523', '+1 (212) 555-23__', '+1 (212) 555-23'.length],
            ['212555236', '+1 (212) 555-236_', '+1 (212) 555-236'.length],
            ['2125552368', '+1 (212) 555-2368', '+1 (212) 555-2368'.length],
        ] as const;

        tests.forEach(([typed, masked, caretIndex]) => {
            it(`Type ${typed} => ${masked}`, () => {
                cy.get('@input')
                    .type(typed)
                    .should('have.value', masked)
                    .should('have.prop', 'selectionStart', caretIndex)
                    .should('have.prop', 'selectionEnd', caretIndex);
            });
        });
    });

    it('Can type 1 after country code +1', () => {
        cy.get('@input')
            .type('1')
            .should('have.value', '+1 (1  ) ___-____')
            .should('have.prop', 'selectionStart', '+1 (1'.length)
            .should('have.prop', 'selectionEnd', '+1 (1'.length);
    });

    it('cannot erase country code +1', () => {
        cy.get('@input')
            .type('{backspace}'.repeat(10))
            .should('have.value', '+1 (   ) ___-____')
            .type('{selectAll}{backspace}')
            .should('have.value', '+1 (   ) ___-____')
            .type('{selectAll}{del}')
            .should('have.value', '+1 (   ) ___-____')
            .should('have.prop', 'selectionStart', '+1'.length)
            .should('have.prop', 'selectionEnd', '+1'.length);
    });

    it('cannot move caret outside actual value', () => {
        cy.get('@input')
            .type('{rightArrow}')
            .should('have.prop', 'selectionStart', '+1'.length)
            .should('have.prop', 'selectionEnd', '+1'.length)
            .type('{selectAll}')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', '+1'.length);
    });
});
