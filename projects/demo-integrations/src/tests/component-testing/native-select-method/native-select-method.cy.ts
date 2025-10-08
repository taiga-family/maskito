import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {maskitoEventHandler} from '@maskito/kit';

@Component({
    imports: [MaskitoDirective],
    template: `
        <input
            value="123"
            [maskito]="maskitoOptions"
        />
        <textarea [maskito]="maskitoOptions">123</textarea>
        <div
            contenteditable="true"
            [maskito]="maskitoOptions"
            [textContent]="'123'"
        ></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {
    protected readonly maskitoOptions: MaskitoOptions = {
        mask: /^\d+$/,
        plugins: [
            maskitoEventHandler('focus', (element) => element.select(), {once: true}),
        ],
    };
}

describe('Native method `.select()` works', () => {
    ['input', 'textarea'].forEach((selector) => {
        it(`for <${selector} />`, () => {
            cy.mount(TestComponent);
            cy.get(selector)
                .should('have.value', '123')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0)
                .should('not.be.focused')
                .focus()
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 3);
        });
    });

    it('for [contenteditable]', () => {
        cy.mount(TestComponent);
        cy.get('[contenteditable]')
            .should('have.text', '123')
            .should('not.be.focused')
            .focus()
            .type('0') // all selected value will be overwritten
            .should('have.text', '0')
            .focus()
            .type('2') // no selection (plugin works only for the first focus), just append value
            .should('have.text', '02');
    });
});
