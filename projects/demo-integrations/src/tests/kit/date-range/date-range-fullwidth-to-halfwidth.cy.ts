import {DemoPath} from '@demo/constants';

import {BROWSER_SUPPORTS_REAL_EVENTS} from '../../../support/constants';

describe('DateRange | Full width character parsing', () => {
    beforeEach(() => {
        cy.visit(`/${DemoPath.DateRange}/API?mode=dd%2Fmm%2Fyyyy`);
        cy.get('#demo-content input').should('be.visible').first().focus().as('input');
    });

    describe('basic typing', () => {
        const tests = [
            // [Typed value, Masked value]
            ['1', '1'],
            ['18', '18'],
            ['181', '18.1'],
            ['1811', '18.11'],
            ['18112', '18.11.2'],
            ['18112016', '18.11.2016'],
            ['181120162', '18.11.2016 – 2'],
            ['1811201624', '18.11.2016 – 24'],
            ['18112016240', '18.11.2016 – 24.0'],
            ['181120162403', '18.11.2016 – 24.03'],
            ['18112016240320', '18.11.2016 – 24.03.20'],
            ['1811201624032020', '18.11.2016 – 24.03.2020'],
        ] as const;

        tests.forEach(([typedValue, maskedValue]) => {
            it(`Type "${typedValue}" => "${maskedValue}"`, () => {
                cy.get('@input')
                    .type(typedValue)
                    .should('have.value', maskedValue)
                    .should('have.prop', 'selectionStart', maskedValue.length)
                    .should('have.prop', 'selectionEnd', maskedValue.length);
            });
        });
    });
});
