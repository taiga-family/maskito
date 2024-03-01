import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';

@Component({
    standalone: true,
    selector: 'synchronous-test-input',
    imports: [MaskitoDirective, FormsModule],
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
export class SynchronousTestInputComponent {
    value = {
        number: '',
        name: '',
    };

    readonly cardMask: MaskitoOptions = {
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

    readonly nameMask: MaskitoOptions = {
        mask: /^[a-zA-Z\s]+$/,
        postprocessors: [
            ({value, selection}) => ({value: value.toUpperCase(), selection}),
        ],
    };

    readonly cardPredicate: MaskitoElementPredicate = element =>
        element.querySelectorAll('input')[0];

    readonly namePredicate: MaskitoElementPredicate = element =>
        element.querySelectorAll('input')[1];
}
