import type {MaskitoOptions} from '@maskito/core';

import {BROWSER_SUPPORTS_REAL_EVENTS} from '../../../support/constants';
import {TestInput} from '../utils';

describe('overwriteMode = replace', () => {
    const digitsOnlyMask: MaskitoOptions = {
        mask: /^\d+$/gi,
        overwriteMode: 'replace',
    };

    describe('selection contains several characters', () => {
        beforeEach(() => {
            cy.mount(TestInput, {componentProperties: {maskitoOptions: digitsOnlyMask}});
        });

        it('12|34| => Press 0 => 120', BROWSER_SUPPORTS_REAL_EVENTS, () => {
            cy.get('input')
                .type('1234')
                .should('have.value', '1234')
                .realPress(['Shift', ...new Array('34'.length).fill('ArrowLeft')]);

            cy.get('input').type('0').should('have.value', '120');
        });

        it('1|23|4 => Press 0 => 104', BROWSER_SUPPORTS_REAL_EVENTS, () => {
            cy.get('input')
                .type('1234')
                .should('have.value', '1234')
                .realPress([
                    'ArrowLeft',
                    'Shift',
                    ...new Array('23'.length).fill('ArrowLeft'),
                ]);

            cy.get('input').type('0').should('have.value', '104');
        });

        it('1234 => select all => Press 0 => 0', () => {
            cy.get('input')
                .type('1234')
                .should('have.value', '1234')
                .type('{selectall}')
                .type('0')
                .should('have.value', '0');
        });

        it('1|23|4 => Backspace => 14', BROWSER_SUPPORTS_REAL_EVENTS, () => {
            cy.get('input')
                .type('1234')
                .should('have.value', '1234')
                .realPress([
                    'ArrowLeft',
                    'Shift',
                    ...new Array('23'.length).fill('ArrowLeft'),
                ]);

            cy.get('input').type('{backspace}').should('have.value', '14');
        });

        it('1|23|4 => Delete => 14', BROWSER_SUPPORTS_REAL_EVENTS, () => {
            cy.get('input')
                .type('1234')
                .should('have.value', '1234')
                .realPress([
                    'ArrowLeft',
                    'Shift',
                    ...new Array('23'.length).fill('ArrowLeft'),
                ]);

            cy.get('input').type('{del}').should('have.value', '14');
        });
    });

    describe('selectionStart === selectionEnd', () => {
        beforeEach(() => {
            cy.mount(TestInput, {componentProperties: {maskitoOptions: digitsOnlyMask}});
        });

        it('|123 => Press 0 => 0|23', () => {
            cy.get('input')
                .type('123')
                .should('have.value', '123')
                .type('{moveToStart}')
                .type('0')
                .should('have.value', '023')
                .should('have.a.prop', 'selectionStart', 1)
                .should('have.a.prop', 'selectionEnd', 1);
        });

        it('1|23 => Press 0 => 10|3', () => {
            cy.get('input')
                .type('123')
                .should('have.value', '123')
                .type('{moveToStart}{rightArrow}')
                .type('0')
                .should('have.value', '103')
                .should('have.a.prop', 'selectionStart', 2)
                .should('have.a.prop', 'selectionEnd', 2);
        });

        it('12|3 => Press 0 => 120|', () => {
            cy.get('input')
                .type('123')
                .should('have.value', '123')
                .type('{moveToEnd}{leftArrow}')
                .type('0')
                .should('have.value', '120')
                .should('have.a.prop', 'selectionStart', 3)
                .should('have.a.prop', 'selectionEnd', 3);
        });

        it('123| => Press 4 => 1234|', () => {
            cy.get('input')
                .type('123')
                .should('have.value', '123')
                .type('4')
                .should('have.value', '1234')
                .should('have.a.prop', 'selectionStart', 4)
                .should('have.a.prop', 'selectionEnd', 4);
        });

        it('12|3 => Press Backspace => 1|3', () => {
            cy.get('input')
                .type('123')
                .should('have.value', '123')
                .type('{moveToEnd}{leftArrow}')
                .type('{backspace}')
                .should('have.value', '13')
                .should('have.a.prop', 'selectionStart', 1)
                .should('have.a.prop', 'selectionEnd', 1);
        });

        it('1|23 => Press Delete => 1|3', () => {
            cy.get('input')
                .type('123')
                .should('have.value', '123')
                .type('{moveToStart}{rightArrow}')
                .type('{del}')
                .should('have.value', '13')
                .should('have.a.prop', 'selectionStart', 1)
                .should('have.a.prop', 'selectionEnd', 1);
        });
    });
});
