import {mount} from 'cypress/react';

import {App, PREDICATE_RESOLVING_TIME, SWITCH_OPTIONS_TIME} from './react-app';

describe('React async predicate + maskitoOptions race', () => {
    beforeEach(() => {
        cy.clock();
        mount(<App />);
        cy.get('.real-input').should('be.visible').as('textfield');
    });

    it('can enter any value before no predicate is resolved', () => {
        cy.get('@textfield').focus().type('12abc3').should('have.value', '12abc3');
    });

    it('enabling of the first mask should be skipped if `options` were changed during resolving of element predicate', () => {
        cy.smartTick(PREDICATE_RESOLVING_TIME); // predicate is resolved only once for digit cases
        cy.get('@textfield').focus().type('12abc3').should('have.value', '12abc3');
    });

    it('only the last mask should be applied if [maskitoOptions] were changed during resolving of element predicates', () => {
        cy.smartTick(SWITCH_OPTIONS_TIME + PREDICATE_RESOLVING_TIME); // enough time to resolve element predicated for both cases
        cy.get('@textfield').focus().type('12abc3').should('have.value', 'abc');
    });
});
