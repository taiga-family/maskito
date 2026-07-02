import type {MaskitoOptions} from '@maskito/core';
import {mount} from 'cypress/react';

import {MaskedInput} from './maskedInput';

const phoneMask: MaskitoOptions = {
    mask: ['+', '1', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
};

describe('ReactNative | Phone', () => {
    beforeEach(() => mount(<MaskedInput options={phoneMask} />));

    describe('Typing', () => {
        it('formats a US phone number with brackets and dashes', () => {
            cy.get('input')
                .type('2125552368')
                .should('have.value', '+1 (212) 555-2368')
                .should('have.prop', 'selectionStart', '+1 (212) 555-2368'.length)
                .should('have.prop', 'selectionEnd', '+1 (212) 555-2368'.length);
        });

        it('drops non-digit characters while typing', () => {
            cy.get('input')
                .type('21a25b55c2368')
                .should('have.value', '+1 (212) 555-2368')
                .should('have.prop', 'selectionStart', '+1 (212) 555-2368'.length)
                .should('have.prop', 'selectionEnd', '+1 (212) 555-2368'.length);
        });
    });

    describe('Deletion (value = "+1 (212) 555-2368")', () => {
        beforeEach(() => {
            cy.get('input').type('2125552368');
        });

        it('removes the last digit on Backspace', () => {
            cy.get('input')
                .type('{backspace}')
                .should('have.value', '+1 (212) 555-236')
                .should('have.prop', 'selectionStart', '+1 (212) 555-236'.length)
                .should('have.prop', 'selectionEnd', '+1 (212) 555-236'.length);
        });

        it('jumps over the dash while erasing the whole last group', () => {
            cy.get('input')
                .type('{backspace}'.repeat('2368'.length))
                .should('have.value', '+1 (212) 555')
                .should('have.prop', 'selectionStart', '+1 (212) 555'.length)
                .should('have.prop', 'selectionEnd', '+1 (212) 555'.length);
        });
    });

    describe('Editing in the middle of the value', () => {
        beforeEach(() => {
            cy.get('input').type('2125552368');
        });

        it('reflows digits when a digit is deleted and inserted in the middle', () => {
            // +1 (212) 555-2|368 => Backspace => +1 (212) 555-|368
            cy.get('input')
                .type('{leftArrow}'.repeat('368'.length))
                .type('{backspace}')
                .should('have.value', '+1 (212) 555-368')
                .should('have.prop', 'selectionStart', '+1 (212) 555-'.length)
                .should('have.prop', 'selectionEnd', '+1 (212) 555-'.length);

            // +1 (212) 555-|368 => Type "7" => +1 (212) 555-7|368
            cy.get('input')
                .type('7')
                .should('have.value', '+1 (212) 555-7368')
                .should('have.prop', 'selectionStart', '+1 (212) 555-7'.length)
                .should('have.prop', 'selectionEnd', '+1 (212) 555-7'.length);
        });
    });
});
