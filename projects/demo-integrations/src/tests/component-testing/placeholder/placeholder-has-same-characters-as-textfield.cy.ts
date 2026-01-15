import type {MaskitoOptions} from '@maskito/core';
import {maskitoWithPlaceholder} from '@maskito/kit';

import {TestInput} from '../utils';

describe('Placeholder | intersects with some characters from textfield value', () => {
    const maskitoOptions: MaskitoOptions = {
        ...maskitoWithPlaceholder('DD/MMM/YYYY', true),
        mask: [
            /\d/,
            /\d/,
            '/',
            /[a-zA-Z]/i,
            /[a-zA-Z]/i,
            /[a-zA-Z]/i,
            '/',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
        ],
    };

    beforeEach(() => {
        cy.mount(TestInput, {componentProperties: {maskitoOptions}});
    });

    it('Empty => focus => show placeholder', () => {
        cy.get('input').focus().should('have.value', 'DD/MMM/YYYY');
    });

    it('Empty => Type 31 => 31/MMM/YYYY', () => {
        cy.get('input')
            .type('31')
            .should('have.value', '31/MMM/YYYY')
            .should('have.prop', 'selectionStart', 2)
            .should('have.prop', 'selectionEnd', 2)
            .blur()
            .should('have.value', '31');
    });

    it('31|/MMM/YYYY => Type May => 31/May|/YYYY', () => {
        cy.get('input')
            .type('31')
            .should('have.value', '31/MMM/YYYY')
            .type('M')
            .should('have.value', '31/MMM/YYYY')
            .should('have.prop', 'selectionStart', '31/M'.length)
            .should('have.prop', 'selectionEnd', '31/M'.length)
            .type('ay')
            .should('have.value', '31/May/YYYY')
            .should('have.prop', 'selectionStart', '31/May'.length)
            .should('have.prop', 'selectionEnd', '31/May'.length)
            .blur()
            .should('have.value', '31/May');
    });
});
