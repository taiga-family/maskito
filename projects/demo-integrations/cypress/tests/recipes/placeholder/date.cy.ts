import {DemoPath} from '@demo/constants';

describe('Placeholder | Date', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Placeholder);
        cy.get('#date input')
            .should('be.visible')
            .first()
            .should('have.value', '')
            .focus()
            .should('have.value', 'dd/mm/yyyy')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 0)
            .as('input');
    });

    describe('basic typing (1 character per keydown)', () => {
        const tests = [
            // [Typed value, Masked value, caretIndex]
            ['1', '1d/mm/yyyy', 1],
            ['16', '16/mm/yyyy', '16'.length],
            ['160', '16/0m/yyyy', '16/0'.length],
            ['1605', '16/05/yyyy', '16/05'.length],
            ['16052', '16/05/2yyy', '16/05/2'.length],
            ['160520', '16/05/20yy', '16/05/20'.length],
            ['1605202', '16/05/202y', '16/05/202'.length],
            ['16052023', '16/05/2023', '16/05/2023'.length],
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

    it('Type 999 => 09/09/9yyy', () => {
        cy.get('@input')
            .type('999')
            .should('have.value', '09/09/9yyy')
            .should('have.prop', 'selectionStart', '09/09/9'.length)
            .should('have.prop', 'selectionEnd', '09/09/9'.length);
    });

    it('Type 39 => 3d/mm/yyyy', () => {
        cy.get('@input')
            .type('39')
            .should('have.value', '3d/mm/yyyy')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1);
    });

    it('Type 31/13 => 31/1m/yyyy', () => {
        cy.get('@input')
            .type('3113')
            .should('have.value', '31/1m/yyyy')
            .should('have.prop', 'selectionStart', '31/1'.length)
            .should('have.prop', 'selectionEnd', '31/1'.length);
    });

    it('Cannot move caret outside actual value', () => {
        cy.get('@input')
            .type('311')
            .type('{rightArrow}')
            .should('have.prop', 'selectionStart', '31/1'.length)
            .should('have.prop', 'selectionEnd', '31/1'.length)
            .type('{selectAll}')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', '31/1'.length);
    });

    it('Removes placeholder on blur', () => {
        cy.get('@input')
            .type('311')
            .should('have.value', '31/1m/yyyy')
            .should('have.prop', 'selectionStart', '31/1'.length)
            .should('have.prop', 'selectionEnd', '31/1'.length)
            .blur()
            .should('have.value', '31/1');
    });

    it('Removes placeholder from Angular control', () => {
        cy.get('@input')
            .type('311')
            .should('have.value', '31/1m/yyyy')
            .blur()
            .should('have.value', '31/1');
        // .magicNgMethod(
        //     ng
        //         .getComponent(document.querySelector('placeholder-doc-example-3'))
        //         .value.should('eq', '31/1'),
        // );
    });
});
