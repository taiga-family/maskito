import {DemoPath} from '@demo/constants';
import {BROWSER_SUPPORTS_REAL_EVENTS} from 'projects/demo-integrations/src/support/constants';

describe('Date segment stepping', () => {
    function openDemo(step: number): void {
        cy.visit(`/${DemoPath.Date}/API?step=${step}`);
        cy.get('#demo-content input').first().should('be.visible').focus().as('input');
    }

    it('steps the month and year at the caret and clamps the day', () => {
        openDemo(1);

        cy.get('@input')
            .type('31012024')
            .should('have.value', '31.01.2024')
            .type('{leftArrow}'.repeat('1.2024'.length))
            .type('{upArrow}')
            .should('have.value', '29.02.2024')
            .should('have.prop', 'selectionStart', '29.0'.length)
            .should('have.prop', 'selectionEnd', '29.0'.length)
            .type('{moveToEnd}{upArrow}')
            .should('have.value', '28.02.2025');
    });

    it('wraps the day in either direction with a custom step', () => {
        openDemo(2);

        cy.get('@input')
            .type('30012024')
            .type('{moveToStart}{upArrow}')
            .should('have.value', '01.01.2024')
            .type('{downArrow}')
            .should('have.value', '30.01.2024');
    });

    it('leaves stepping disabled when step is zero', () => {
        openDemo(0);

        cy.get('@input')
            .type('15062024')
            .type('{upArrow}')
            .should('have.value', '15.06.2024')
            .type('{downArrow}')
            .should('have.value', '15.06.2024');
    });

    it('keeps the native Shift+Arrow selection', BROWSER_SUPPORTS_REAL_EVENTS, () => {
        openDemo(1);

        cy.get('@input').type('15062024').realPress(['Shift', 'ArrowUp']);

        cy.get('@input')
            .should('have.value', '15.06.2024')
            .should('have.prop', 'selectionStart', 0)
            .should('have.prop', 'selectionEnd', 10);
    });

    it('leaves a focused readonly date unchanged', BROWSER_SUPPORTS_REAL_EVENTS, () => {
        openDemo(1);

        cy.get('@input')
            .type('15062024')
            .then(($input) => {
                $input.prop('readOnly', true);
            });

        cy.get('@input').should('be.focused').realPress('ArrowUp');
        cy.get('@input').should('have.value', '15.06.2024');
    });
});
