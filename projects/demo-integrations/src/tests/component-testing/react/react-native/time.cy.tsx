import {maskitoTime} from '@maskito/kit';
import {mount} from 'cypress/react';

import {MaskedInput} from './maskedInput';

const timeMask = maskitoTime({mode: 'HH:MM'});

describe('ReactNative | Time', () => {
    beforeEach(() => mount(<MaskedInput options={timeMask} />));

    describe('Typing', () => {
        it('inserts the colon separator between hours and minutes', () => {
            cy.get('input')
                .type('1234')
                .should('have.value', '12:34')
                .should('have.prop', 'selectionStart', '12:34'.length)
                .should('have.prop', 'selectionEnd', '12:34'.length);
        });

        it('zero-pads an unambiguous hour', () => {
            cy.get('input')
                .type('9')
                .should('have.value', '09')
                .should('have.prop', 'selectionStart', '09'.length)
                .should('have.prop', 'selectionEnd', '09'.length);
        });

        it('rejects non-digit characters', () => {
            cy.get('input')
                .type('ab:cd')
                .should('have.value', '')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('keeps only digits when mixed with invalid characters', () => {
            cy.get('input')
                .type('1a2b3c4d')
                .should('have.value', '12:34')
                .should('have.prop', 'selectionStart', '12:34'.length)
                .should('have.prop', 'selectionEnd', '12:34'.length);
        });
    });

    describe('Deletion (value = "12:34")', () => {
        beforeEach(() => {
            cy.get('input').type('1234');
        });

        it('removes the last digit on Backspace', () => {
            cy.get('input')
                .type('{backspace}')
                .should('have.value', '12:3')
                .should('have.prop', 'selectionStart', '12:3'.length)
                .should('have.prop', 'selectionEnd', '12:3'.length);
        });

        it('jumps over the colon while erasing across the segment boundary', () => {
            cy.get('input')
                .type('{backspace}'.repeat(2))
                .should('have.value', '12')
                .should('have.prop', 'selectionStart', '12'.length)
                .should('have.prop', 'selectionEnd', '12'.length);
        });
    });

    describe('Editing in the middle of the value', () => {
        beforeEach(() => {
            cy.get('input').type('1234');
        });

        it('replaces a minute digit in the middle by a zero, then overwrites it', () => {
            // 12:3|4 => Backspace => 12:|04 (deleted digit becomes zero)
            cy.get('input')
                .type('{leftArrow}')
                .type('{backspace}')
                .should('have.value', '12:04')
                .should('have.prop', 'selectionStart', '12:'.length)
                .should('have.prop', 'selectionEnd', '12:'.length);

            // 12:|04 => Type "5" => 12:5|4
            cy.get('input')
                .type('5')
                .should('have.value', '12:54')
                .should('have.prop', 'selectionStart', '12:5'.length)
                .should('have.prop', 'selectionEnd', '12:5'.length);
        });
    });
});
