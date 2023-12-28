import {Component, Input} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';

@Component({
    standalone: true,
    imports: [MaskitoDirective],
    template: `
        <input [maskito]="maskitoOptions" />
    `,
})
class TestInput {
    @Input()
    maskitoOptions: MaskitoOptions | null = null;
}

describe('Component testing demo', () => {
    it('Test #1', () => {
        const maskitoOptions: MaskitoOptions = {mask: /^\d+$/};

        cy.mount(TestInput, {componentProperties: {maskitoOptions}});
        cy.get('input').type('123abc!!!!!567').should('have.value', '123567');
    });

    it('Test #2', () => {
        const maskitoOptions: MaskitoOptions = {mask: [/\d/, /\d/, ':', /\d/, /\d/]};

        cy.mount(TestInput, {componentProperties: {maskitoOptions}});
        cy.get('input').type('1234').should('have.value', '12:34');
    });
});
