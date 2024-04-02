import {DemoPath} from '@demo/constants';

describe('ContentEditable | Multi-line support', () => {
    describe('Deletion', () => {
        beforeEach(() => {
            cy.visit(DemoPath.ContentEditable);
            cy.get('#multi-line [contenteditable]')
                .should('be.visible')
                .first()
                .focus()
                .as('element');
        });

        it('Select all + delete => Empty', () => {
            cy.get('@element').type('{selectAll}{del}').should('have.text', '');
        });

        it('Select all + Backspace => Empty', () => {
            cy.get('@element').type('{selectAll}{backspace}').should('have.text', '');
        });
    });

    describe('Rejects invalid symbols on EVERY line', () => {
        beforeEach(() => {
            cy.visit(DemoPath.ContentEditable);
            cy.get('#multi-line [contenteditable]')
                .should('be.visible')
                .first()
                .focus()
                .clear()
                .should('have.text', '')
                .as('element');
        });

        const tests = [
            // [Typed value, Masked value]
            ['abc123 def', 'abc def'],
            ['abc123 def{enter}1a2b3c 4d', 'abc def\nabc d'],
            ['a{enter}b{enter}{enter}aa11bb', 'a\nb\n\naabb'],
        ] as const;

        tests.forEach(([typed, masked]) => {
            it(`Type ${typed} => ${masked}`, () => {
                cy.get('@element').type(typed).should('have.text', masked);
            });
        });
    });
});
