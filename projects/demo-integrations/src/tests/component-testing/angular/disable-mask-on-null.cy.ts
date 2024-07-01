import type {MaskitoOptions} from '@maskito/core';

import {TestInput} from '../utils';

describe('@maskito/angular | Disable mask if null is passed as options', () => {
    describe('type="email" is not compatible with Maskito (it does not have `setSelectionRange`)', () => {
        it('should throw error if non-nullable options are passed', (done) => {
            const maskitoOptions: MaskitoOptions = {
                mask: [/[a-z]/, /[a-z]/, '@', /[a-z]/],
            };

            cy.mount(TestInput, {
                componentProperties: {
                    type: 'email',
                    maskitoOptions,
                },
            });

            cy.on('uncaught:exception', ({message}) => {
                expect(message).to.include(
                    "Failed to execute 'setSelectionRange' on 'HTMLInputElement': The input element's type ('email') does not support selection",
                );

                // ensure that an uncaught exception was thrown
                done();
            });

            cy.get('input').type('a12bc');
        });

        it('should not throw any error is options are equal to `null`', () => {
            cy.mount(TestInput, {
                componentProperties: {
                    type: 'email',
                    maskitoOptions: null,
                },
            });

            cy.get('input').type('a12bc').should('have.value', 'a12bc');
        });
    });
});
