import {TestWrapper} from './angular-wrapper';

describe('Async predicate works', () => {
    describe('Basic async predicate (it returns promise which resolves in 2s)', () => {
        beforeEach(() => {
            cy.clock();
            cy.mount(TestWrapper);
            cy.get('#async-predicate-2s-resolves')
                .scrollIntoView()
                .should('be.visible')
                .as('input');
        });

        it('does not apply mask until `elementPredicate` resolves', () => {
            const typedText = 'Element predicate will resolves only in 2000 ms';

            cy.get('@input').type(typedText);

            cy.smartTick(300);
            cy.get('@input').should('have.value', typedText);
            cy.smartTick(700);
            cy.get('@input').should('have.value', typedText);
            cy.smartTick(2000);
            cy.get('@input').should('have.value', '20:00');
        });

        it('rejects invalid character (after `elementPredicate` resolves)', () => {
            cy.smartTick(2_000);

            cy.get('@input').type('0taiga_family').should('have.value', '0');
        });

        it('automatically adds fixed characters (after `elementPredicate` resolves)', () => {
            cy.smartTick(2_000);

            cy.get('@input').type('1234').should('have.value', '12:34');
        });

        it('automatically pads time segments with zeroes for large digits (after `elementPredicate` resolves)', () => {
            cy.smartTick(2_000);

            cy.get('@input').type('99').should('have.value', '09:09');
        });
    });

    describe('race condition check', () => {
        beforeEach(() => {
            cy.clock();
            cy.mount(TestWrapper);
            cy.get('#race-condition-check')
                .scrollIntoView()
                .should('be.visible')
                .as('input');
        });

        it('does not apply mask until the first (fast valid) `elementPredicate` resolves', () => {
            const typedText =
                'UseEffect will be triggered in 2s and predicate will resolve only in 0.5 seconds';

            cy.get('@input').type(typedText);

            cy.smartTick(500); // Selected predicate is longInvalidPredicate (pending state)
            cy.get('@input').should('have.value', typedText);

            cy.smartTick(1000); // Selected predicate is longInvalidPredicate (still pending state)
            cy.get('@input').should('have.value', typedText);

            cy.smartTick(600); // Selected predicate is fastValidPredicate (pending state)
            cy.get('@input').should('have.value', typedText);

            cy.smartTick(1000); // Selected predicate is fastValidPredicate (promise is resolved)
            cy.get('@input').should('have.value', '20:5');
        });

        it('ignores the previous predicate if it resolves after the switching to new one', () => {
            cy.smartTick(10_000);

            cy.get('@input').type('taiga1134 family').should('have.value', '11:34');
        });
    });
});
