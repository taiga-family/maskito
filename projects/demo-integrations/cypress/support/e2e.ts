/// <reference types="cypress" />
import 'cypress-real-events'; // https://github.com/cypress-io/cypress/issues/2839
import './command';

import {haveNgControlValueAssertion} from './assertions';

declare global {
    namespace Cypress {
        interface Chainer<Subject> {
            /**
             * Assertion that checks if given subject has Angular form control with specified value
             *
             * @example
             * cy.get('tui-input').should('have.ngControlValue', '123')
             * */
            (chainer: 'have.ngControlValue'): Chainable<Subject>;
        }
    }
}

chai.use(haveNgControlValueAssertion);

Cypress.on('window:before:load', win => {
    cy.spy(win.console, 'error');
});

afterEach(() => {
    cy.window().then(win => expect(win.console.error).to.have.callCount(0));
});
