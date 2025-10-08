import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';

@Component({
    selector: 'synchronous-test-input',
    imports: [FormsModule, MaskitoDirective],
    template: `
        <div
            [maskito]="card.matches(':focus') ? cardMask : nameMask"
            [maskitoElement]="card.matches(':focus') ? cardPredicate : namePredicate"
        >
            <input
                #card
                [(ngModel)]="value.number"
            />
            <input [(ngModel)]="value.name" />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiTestInputComponent {
    protected value = {
        number: '',
        name: '',
    };

    protected readonly cardMask: MaskitoOptions = {
        mask: [
            ...new Array(4).fill(/\d/),
            ' ',
            ...new Array(4).fill(/\d/),
            ' ',
            ...new Array(4).fill(/\d/),
            ' ',
            ...new Array(4).fill(/\d/),
        ],
    };

    protected readonly nameMask: MaskitoOptions = {
        mask: /^[a-zA-Z\s]+$/,
        postprocessors: [
            ({value, selection}) => ({value: value.toUpperCase(), selection}),
        ],
    };

    protected readonly cardPredicate: MaskitoElementPredicate = (element) =>
        element.querySelectorAll('input')[0]!;

    protected readonly namePredicate: MaskitoElementPredicate = (element) =>
        element.querySelectorAll('input')[1]!;
}
