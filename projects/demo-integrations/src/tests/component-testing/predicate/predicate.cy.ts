import {MaskitoOptions} from '@maskito/core';

import {TestInput} from '../utils';

describe('@maskito/angular | Predicate', () => {
    const cardMask: MaskitoOptions = {
        mask: [
            ...new Array(4).fill(/\d/),
            ' ',
            ...new Array(4).fill(/\d/),
            ' ',
            ...new Array(4).fill(/\d/),
            ' ',
            ...new Array(4).fill(/\d/),
        ],
    };

    const nameMask: MaskitoOptions = {
        mask: /^[a-zA-Z\s]+$/,
        postprocessors: [
            ({value, selection}) => ({value: value.toUpperCase(), selection}),
        ],
    };

    describe('can detect run-time changes', () => {
        it('12341234abcd12341234 => 1234 1234 1234 1234', () => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions: cardMask,
                    maskitoElementPredicate: element => element as HTMLInputElement,
                },
            });

            cy.get('input')
                .type('12341234abcd12341234')
                .should('have.value', '1234 1234 1234 1234');
        });

        it('12341234abcd12341234 => ABCD', () => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions: nameMask,
                    maskitoElementPredicate: element => element as HTMLInputElement,
                },
            });

            cy.get('input').type('12341234abcd12341234').should('have.value', 'ABCD');
        });
    });
    describe('supports asynchronous predicate', () => {
        it('12341234abcd12341234 => 1234 1234 1234 1234', () => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions: cardMask,
                    maskitoElementPredicate: async element =>
                        Promise.resolve(element as HTMLInputElement),
                },
            });
            cy.get('input').as('card');
            cy.get('@card')
                .focus()
                .type('12341234abcd12341234')
                .should('have.value', '1234 1234 1234 1234');
        });
    });
});
