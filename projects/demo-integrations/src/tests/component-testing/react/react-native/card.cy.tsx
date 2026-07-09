import type {MaskitoOptions} from '@maskito/core';
import {mount} from 'cypress/react';

import {MaskedInput} from './maskedInput';

const cardMask: MaskitoOptions = {
    mask: [
        ...Array.from<RegExp>({length: 4}).fill(/\d/),
        ' ',
        ...Array.from<RegExp>({length: 4}).fill(/\d/),
        ' ',
        ...Array.from<RegExp>({length: 4}).fill(/\d/),
        ' ',
        ...Array.from<RegExp>({length: 4}).fill(/\d/),
        ' ',
        ...Array.from<RegExp>({length: 3}).fill(/\d/),
    ],
};

describe('ReactNative | Card', () => {
    beforeEach(() => mount(<MaskedInput options={cardMask} />));

    describe('Typing', () => {
        it('adds a space after every 4 digits', () => {
            cy.get('input')
                .type('1234456778900123')
                .should('have.value', '1234 4567 7890 0123')
                .should('have.prop', 'selectionStart', '1234 4567 7890 0123'.length)
                .should('have.prop', 'selectionEnd', '1234 4567 7890 0123'.length);
        });

        it('ignores all same digits beyond the 19-digit limit', () => {
            cy.get('input')
                .type('2222222222222222222222')
                .should('have.value', '2222 2222 2222 2222 222')
                .should('have.prop', 'selectionStart', '2222 2222 2222 2222 222'.length)
                .should('have.prop', 'selectionEnd', '2222 2222 2222 2222 222'.length);
        });
    });

    describe('Deletion (value = "1234 4567 7890 0123")', () => {
        beforeEach(() => {
            cy.get('input').type('1234456778900123');
        });

        it('removes the last digit on Backspace', () => {
            cy.get('input')
                .type('{backspace}')
                .should('have.value', '1234 4567 7890 012')
                .should('have.prop', 'selectionStart', '1234 4567 7890 012'.length)
                .should('have.prop', 'selectionEnd', '1234 4567 7890 012'.length);
        });

        it('jumps over the separator while erasing across a group boundary', () => {
            cy.get('input')
                .type('{backspace}'.repeat('0123'.length))
                .should('have.value', '1234 4567 7890')
                .should('have.prop', 'selectionStart', '1234 4567 7890'.length)
                .should('have.prop', 'selectionEnd', '1234 4567 7890'.length);
        });
    });

    describe('Editing in the middle of the value', () => {
        beforeEach(() => {
            cy.get('input').type('2222222222222222').should('have.value', '2222 2222 2222 2222');
        });

        it('reflows groups when a digit is deleted and inserted in the middle', () => {
            // 2222 22|22 2222 2222 => Backspace => 2222 2|222 2222 222
            cy.get('input')
                .type('{leftArrow}'.repeat('22 2222 2222'.length))
                .should('have.prop', 'selectionStart', '2222 22'.length)
                .should('have.prop', 'selectionEnd', '2222 22'.length)
                .type('{backspace}')
                .should('have.value', '2222 2222 2222 222')
                .should('have.prop', 'selectionStart', '2222 2'.length)
                .should('have.prop', 'selectionEnd', '2222 2'.length);

            // 2222 2|222 2222 222 => Type "0" => 2222 20|22 2222 2222
            cy.get('input')
                .type('0')
                .should('have.value', '2222 2022 2222 2222')
                .should('have.prop', 'selectionStart', '2222 20'.length)
                .should('have.prop', 'selectionEnd', '2222 20'.length);
        });
    });
});
