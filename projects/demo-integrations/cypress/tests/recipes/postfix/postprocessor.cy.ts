import {DemoPath} from '@demo/path';

describe('Postfix | Postprocessor (maskitoPostfixPostprocessorGenerator)', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Postfix);
        cy.get('#by-postprocessor input')
            .should('be.visible')
            .first()
            .should('have.value', '')
            .focus()
            .as('input');
    });

    it('Type 100 => $100|.00', () => {
        cy.get('@input')
            .should('have.value', '$.00')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1)
            .type('100')
            .should('have.value', '$100.00')
            .should('have.prop', 'selectionStart', '$100'.length)
            .should('have.prop', 'selectionEnd', '$100'.length);
    });

    it('$10|0.00 => Backspace => Type 5 => $15|0.00', () => {
        cy.get('@input')
            .should('have.value', '$.00')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1)
            .type('100')
            .type('{leftArrow}{backspace}')
            .type('5')
            .should('have.value', '$150.00')
            .should('have.prop', 'selectionStart', '$15'.length)
            .should('have.prop', 'selectionEnd', '$15'.length);
    });

    describe('Attempts to delete the postfix', () => {
        beforeEach(() => {
            cy.get('@input')
                .should('have.value', '$.00')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1)
                .type('100');
        });

        it('$100.00| => Backspace => $100.0|0', () => {
            cy.get('@input')
                .type('{moveToEnd}{backspace}')
                .should('have.value', '$100.00')
                .should('have.prop', 'selectionStart', '$100.0'.length)
                .should('have.prop', 'selectionEnd', '$100.0'.length);
        });

        it('$100.0|0 => Backspace => $100.|00', () => {
            cy.get('@input')
                .type('{moveToEnd}{leftArrow}{backspace}')
                .should('have.value', '$100.00')
                .should('have.prop', 'selectionStart', '$100.'.length)
                .should('have.prop', 'selectionEnd', '$100.'.length);
        });

        it('$100.|00 => Backspace => $100|.00', () => {
            cy.get('@input')
                .type('{moveToEnd}')
                .type('{leftArrow}'.repeat('00'.length))
                .type('{backspace}')
                .should('have.value', '$100.00')
                .should('have.prop', 'selectionStart', '$100'.length)
                .should('have.prop', 'selectionEnd', '$100'.length);
        });

        it('$100.00 => Select All => Delete => $|.00', () => {
            cy.get('@input')
                .type('{selectAll}{del}')
                .should('have.value', '$.00')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });
    });

    describe('Attempts to delete the prefix', () => {
        beforeEach(() => {
            cy.get('@input')
                .should('have.value', '$.00')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1)
                .type('1')
                .should('have.value', '$1.00')
                .should('have.prop', 'selectionStart', 2)
                .should('have.prop', 'selectionEnd', 2);
        });

        it('$|1.00 => Backspace => $|1.00', () => {
            cy.get('@input')
                .type('{leftArrow}')
                .type('{backspace}')
                .should('have.value', '$1.00')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('|$1.00 => Delete => $|1.00', () => {
            cy.get('@input')
                .type('{moveToStart}')
                .type('{del}')
                .should('have.value', '$1.00')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });
    });
});
