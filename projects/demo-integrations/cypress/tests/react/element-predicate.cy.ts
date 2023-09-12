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

    describe('Async predicate works', () => {
        beforeEach(() => {
            cy.clock();
            cy.visit(DemoPath.Cypress);
            cy.get('#react-async-predicate input.real-input')
                .scrollIntoView()
                .should('be.visible')
                .as('input');
        });

        it('does not apply mask until `elementPredicate` resolves', () => {
            const typedText = 'Element predicate will resolves only in 2000 ms';

            cy.get('@input').type(typedText);

            cy.tick(300);
            cy.get('@input').should('have.value', typedText);
            cy.tick(700);
            cy.get('@input').should('have.value', typedText);
            cy.tick(2000);
            cy.get('@input').should('have.value', '20:00');
        });

        it('rejects invalid character (after `elementPredicate` resolves', () => {
            cy.tick(2_000);

            cy.get('@input').type('0taiga_family').should('have.value', '0');
        });

        it('automatically adds fixed characters (after `elementPredicate` resolves)', () => {
            cy.tick(2_000);

            cy.get('@input').type('1234').should('have.value', '12:34');
        });

        it('automatically pads time segments with zeroes for large digits (after `elementPredicate` resolves)', () => {
            cy.tick(2_000);

            cy.get('@input').type('99').should('have.value', '09:09');
        });
    });
});
