import {maskitoNumber} from '@maskito/kit';
import {mount} from 'cypress/react';

import {MaskedInput} from './maskedInput';

const numberMask = maskitoNumber({maximumFractionDigits: 2});

describe('ReactNative | Number', () => {
    beforeEach(() => mount(<MaskedInput options={numberMask} />));

    describe('Typing', () => {
        it('keeps only digits and places the caret after the last one', () => {
            cy.get('input')
                .type('1a2b3c')
                .should('have.value', '123')
                .should('have.prop', 'selectionStart', '123'.length)
                .should('have.prop', 'selectionEnd', '123'.length);
        });

        it('prepends a zero to a lonely decimal separator', () => {
            cy.get('input')
                .type('.')
                .should('have.value', '0.')
                .should('have.prop', 'selectionStart', '0.'.length)
                .should('have.prop', 'selectionEnd', '0.'.length);
        });

        it('groups thousands with a space', () => {
            cy.get('input')
                .type('123456')
                .should('have.value', '123 456')
                .should('have.prop', 'selectionStart', '123 456'.length)
                .should('have.prop', 'selectionEnd', '123 456'.length);
        });
    });

    describe('Deletion (value = "1 234 567")', () => {
        beforeEach(() => {
            cy.get('input').type('1234567').should('have.value', '1 234 567');
        });

        it('re-groups thousands after the last digit is removed', () => {
            cy.get('input')
                .type('{backspace}')
                .should('have.value', '123 456')
                .should('have.prop', 'selectionStart', '123 456'.length)
                .should('have.prop', 'selectionEnd', '123 456'.length);
        });
    });

    describe('Editing in the middle of the value', () => {
        beforeEach(() => {
            cy.get('input').type('123456').should('have.value', '123 456');
        });

        it('re-groups thousands when a digit is deleted and inserted in the middle', () => {
            // 123 45|6 => Backspace => 12 34|6 (thousand separator shifts left)
            cy.get('input')
                .type('{leftArrow}')
                .type('{backspace}')
                .should('have.value', '12 346')
                .should('have.prop', 'selectionStart', '12 34'.length)
                .should('have.prop', 'selectionEnd', '12 34'.length);

            // 12 34|6 => Type "9" => 123 49|6
            cy.get('input')
                .type('9')
                .should('have.value', '123 496')
                .should('have.prop', 'selectionStart', '123 49'.length)
                .should('have.prop', 'selectionEnd', '123 49'.length);
        });
    });
});
