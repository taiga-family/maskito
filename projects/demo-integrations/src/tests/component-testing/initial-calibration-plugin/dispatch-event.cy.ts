import type {MaskitoOptions} from '@maskito/core';
import {maskitoInitialCalibrationPlugin} from '@maskito/core';
import {createOutputSpy} from 'cypress/angular';

import {TestInput} from '../utils';

describe('InitialCalibrationPlugin | count number of dispatched input event', () => {
    const maskitoOptions: MaskitoOptions = {
        mask: /^\d+$/,
        plugins: [maskitoInitialCalibrationPlugin()],
    };

    it('Valid initial value => no dispatch of InputEvent', () => {
        cy.mount(TestInput, {
            componentProperties: {
                initialValue: '123',
                maskitoOptions,
                input: createOutputSpy('inputEvent'),
            },
        });

        cy.get('input').should('have.value', '123');
        cy.get('@inputEvent').should('not.be.called');
    });

    it('Invalid initial value => dispatch of InputEvent', () => {
        cy.mount(TestInput, {
            componentProperties: {
                initialValue: '4abc56',
                maskitoOptions,
                input: createOutputSpy('inputEvent'),
            },
        });

        cy.get('input').should('have.value', '456');
        cy.get('@inputEvent').should('have.callCount', 1);
    });
});
