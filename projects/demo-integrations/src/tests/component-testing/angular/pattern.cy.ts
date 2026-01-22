import {MaskitoPattern} from '@maskito/angular';

describe('@maskito/angular | MaskitoPattern', () => {
    it('set regex over provided MaskitoOptions mask', () => {
        cy.mount('<input [maskitoPattern]="pattern" />', {
            imports: [MaskitoPattern],
            componentProperties: {pattern: /^\d{0,4}$/},
        });
        cy.get('input').type('a12bc').should('have.value', '12');
    });

    it('set regex from string input', () => {
        cy.mount('<input maskitoPattern="a[1-4]*" />', {imports: [MaskitoPattern]});

        cy.get('input').type('a12bc34').should('have.value', 'a1234');
    });
});
