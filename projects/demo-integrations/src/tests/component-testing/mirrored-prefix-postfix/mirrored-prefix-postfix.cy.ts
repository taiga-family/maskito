import {maskitoNumberOptionsGenerator} from '@maskito/kit';
import {BROWSER_SUPPORTS_REAL_EVENTS} from 'projects/demo-integrations/src/support/constants';

import {TestInput} from '../utils';

describe('[prefix]="$ " | [postfix]=" per day" (without caret guard)', () => {
    beforeEach(() => {
        cy.mount(TestInput, {
            componentProperties: {
                initialValue: '$ 100 per day',
                maskitoOptions: maskitoNumberOptionsGenerator({
                    prefix: '$ ',
                    postfix: ' per day',
                }),
            },
        });
        cy.get(' input')
            .focus()
            .type('{selectAll}{del}')
            .should('have.value', '$  per day')
            .should('have.prop', 'selectionStart', '$ '.length)
            .should('have.prop', 'selectionEnd', '$ '.length)
            .as('input');
    });

    it('$  per day| => Type Backspace => $  per da|y', () => {
        cy.get('@input')
            .type('{moveToEnd}')
            .type('{backspace}')
            .should('have.value', '$  per day')
            .should('have.prop', 'selectionStart', '$  per da'.length)
            .should('have.prop', 'selectionEnd', '$  per da'.length);
    });

    it('$  per da|y => Type Backspace => $  per d|ay', () => {
        cy.get('@input')
            .type('{moveToEnd}{leftArrow}')
            .type('{backspace}')
            .should('have.value', '$  per day')
            .should('have.prop', 'selectionStart', '$  per d'.length)
            .should('have.prop', 'selectionEnd', '$  per d'.length);
    });

    it(
        '$  p|er |day => Type Backspace => $  p|er da|y',
        BROWSER_SUPPORTS_REAL_EVENTS,
        () => {
            cy.get('@input')
                .type('{moveToEnd}')
                .type('{leftArrow}'.repeat('day'.length))
                .realPress(['Shift', ...new Array('1.1'.length).fill('ArrowLeft')]);

            cy.get('@input')
                .type('{backspace}')
                .should('have.value', '$  per day')
                .should('have.prop', 'selectionStart', '$  p'.length)
                .should('have.prop', 'selectionEnd', '$  p'.length);
        },
    );
});
