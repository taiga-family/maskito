/// <reference types="cypress" />
/// <reference types="node" />

/**
 * Check if element has Angular form control with specified value
 *
 * @note WARNING! This assertion uses `window.ng` which works only if application was build with `"optimization": false`
 * @example
 * cy.get('tui-input').should('have.ngControlValue', '123')
 * */
export const haveNgControlValueAssertion: Chai.ChaiPlugin = _chai => {
    chai.Assertion.addMethod('ngControlValue', function (expectedValue: string) {
        const subject = this._obj[0];
        const windowRef = Cypress.dom.getWindowByElement(subject);
        // @ts-ignore
        const angularTools = windowRef.ng;

        const controlValue: string = angularTools.getComponent(subject).control.value;

        this.assert(
            angularTools && controlValue === expectedValue,
            `expected #{this} to have Angular form control with value ${expectedValue}`,
            `expected #{this} to do not have Angular form control with value ${expectedValue}`,
            subject,
        );
    });
};
