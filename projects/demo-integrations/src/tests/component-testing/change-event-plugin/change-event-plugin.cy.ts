import type {MaskitoOptions} from '@maskito/core';
import {maskitoChangeEventPlugin} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';
import {createOutputSpy} from 'cypress/angular';

import {TestInput} from '../utils';

describe('maskitoChangeEventPlugin', () => {
    const numberMask = maskitoNumberOptionsGenerator({
        thousandSeparator: ' ',
        decimalSeparator: '.',
        maximumFractionDigits: 2,
    });
    const maskitoOptions: MaskitoOptions = {
        ...numberMask,
        plugins: [...numberMask.plugins, maskitoChangeEventPlugin()],
    };

    beforeEach(() => {
        cy.mount(TestInput, {
            componentProperties: {
                maskitoOptions,
                change: createOutputSpy('changeEvent'),
            },
        });
    });

    it('Enter only valid value (Maskito does not prevent any typed character) => only 1 change event on blur', () => {
        cy.get('input').type('123').should('have.value', '123');
        cy.get('@changeEvent').should('not.be.called');
        cy.get('input').blur();
        cy.get('@changeEvent').should('have.callCount', 1);
    });

    it('Enter valid value + pseudo decimal separator (Maskito replaces pseudo separator with valid one) => only 1 change event on blur', () => {
        cy.get('input').type('123,').should('have.value', '123.');
        cy.get('@changeEvent').should('not.be.called');
        cy.get('input').blur();
        cy.get('@changeEvent').should('have.callCount', 1);
    });

    it('Enter only decimal separator (Maskito pads it with zero) => only 1 change event on blur', () => {
        cy.get('input').type('.').should('have.value', '0.');
        cy.get('@changeEvent').should('not.be.called');
        cy.get('input').blur();
        cy.get('@changeEvent').should('have.callCount', 1);
    });

    it('Enter only invalid value (Maskito rejects all typed characters) => no change event', () => {
        cy.get('input').type('abc').should('have.value', '');
        cy.get('@changeEvent').should('not.be.called');
        cy.get('input').blur();
        cy.get('@changeEvent').should('not.be.called');
    });

    it('Enter any value value and then erase it again => no change event', () => {
        cy.get('input').type('123').should('have.value', '123');
        cy.get('@changeEvent').should('not.be.called');
        cy.get('input').clear().blur();
        cy.get('@changeEvent').should('not.be.called');
    });
});
