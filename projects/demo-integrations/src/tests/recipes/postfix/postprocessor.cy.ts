import {DemoPath} from '@demo/constants';

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

        it('$1.00 => Select All => Delete => $|.00', () => {
            cy.get('@input')
                .type('{selectAll}{del}')
                .should('have.value', '$.00')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });
    });

    describe('Caret guard works', () => {
        beforeEach(() => {
            cy.get('@input')
                .should('have.value', '$.00')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1)
                .type('42')
                .should('have.value', '$42.00');
        });

        it('forbids to put caret before the prefix', () => {
            cy.get('@input')
                .type('{moveToStart}')
                .should('have.value', '$42.00')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1)
                .type('{leftArrow}'.repeat(5))
                .should('have.value', '$42.00')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('forbids to put caret after the postfix', () => {
            cy.get('@input')
                .type('{moveToEnd}')
                .should('have.value', '$42.00')
                .should('have.prop', 'selectionStart', '$42'.length)
                .should('have.prop', 'selectionEnd', '$42'.length)
                .type('{rightArrow}'.repeat(5))
                .should('have.value', '$42.00')
                .should('have.prop', 'selectionStart', '$42'.length)
                .should('have.prop', 'selectionEnd', '$42'.length);
        });

        it('forbids to select prefix/postfix via select all', () => {
            cy.get('@input')
                .type('{selectAll}')
                .should('have.value', '$42.00')
                .should('have.prop', 'selectionStart', '$'.length)
                .should('have.prop', 'selectionEnd', '$42'.length);
        });
    });
});
