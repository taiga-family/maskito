import type {MaskitoOptions} from '@maskito/core';

import {TestInput} from '../utils';
import {MultiTestInputComponent} from './multi-test.component';

describe('@maskito/angular | Predicate', () => {
    it('can detect run-time changes', () => {
        cy.mount(MultiTestInputComponent);
        cy.get('input').should('be.visible').first().as('card');
        cy.get('input').should('be.visible').eq(1).as('name');

        cy.get('@card')
            .focus()
            .type('12341234abcd12341234')
            .should('have.value', '1234 1234 1234 1234');

        cy.get('@name').focus().type('12341234abcd12341234').should('have.value', 'ABCD');
    });

    it('supports asynchronous predicate', () => {
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

        cy.mount(TestInput, {
            componentProperties: {
                maskitoOptions: cardMask,
                maskitoElementPredicate: async (element) =>
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
