import {DemoPath} from '@demo/constants';

describe('@maskito/react | Element Predicate', () => {
    describe('Sync predicate works', () => {
        beforeEach(() => {
            cy.visit(DemoPath.React);
            cy.get('#awesome-input-wrapper input.real-input')
                .scrollIntoView()
                .should('be.visible')
                .as('input');
        });

        it('rejects invalid characters', () => {
            cy.get('@input').type('abc12def').should('have.value', '12');
        });

        it('accepts valid input', () => {
            cy.get('@input').type('12.09.2023').should('have.value', '12.09.2023');
        });

        it('automatically adds fixed characters', () => {
            cy.get('@input').type('12092023').should('have.value', '12.09.2023');
        });

        it('automatically pads day / month segments with zeroes for large digits', () => {
            cy.get('@input').type('992023').should('have.value', '09.09.2023');
        });
    });
});
