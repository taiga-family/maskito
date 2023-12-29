import {haveNgControlValueAssertion} from './have-ng-control-value';

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
