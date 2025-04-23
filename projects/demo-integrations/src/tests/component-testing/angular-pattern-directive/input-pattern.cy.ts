import {TestInputWithPattern} from './input-pattern.component';

describe('@maskito/angular | MaskitoPatternDirective', () => {
    it('set regex over provided MaskitoOptions mask', () => {
        cy.mount(TestInputWithPattern, {
            componentProperties: {
                pattern: /^\d{0,4}$/,
            },
        });

        cy.get('input').type('a12bc').should('have.value', '12');
    });

    it('set regex from string input', () => {
        cy.mount(TestInputWithPattern, {
            componentProperties: {
                pattern: '^a[0-9]*$',
            },
        });

        cy.get('input').type('a12bc34').should('have.value', 'a1234');
    });
});
