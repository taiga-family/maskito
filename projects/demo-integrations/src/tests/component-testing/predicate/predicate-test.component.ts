import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';
import {TuiGroupModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

@Component({
    standalone: true,
    selector: 'predicate-test',
    imports: [TuiGroupModule, MaskitoDirective, TuiInputModule, FormsModule],
    template: `
        <div
            id="predicate"
            tuiGroup
            [maskito]="card.focused ? cardMask : nameMask"
            [maskitoElement]="card.focused ? cardPredicate : namePredicate"
        >
            <tui-input
                #card
                [(ngModel)]="value.number"
            >
                Card number
            </tui-input>
            <tui-input [(ngModel)]="value.name">Name</tui-input>
        </div>

        <div
            id="async-predicate"
            tuiGroup
            [maskito]="cardMask"
            [maskitoElement]="asyncPredicate"
        >
            <tui-input [(ngModel)]="value.number">Card number</tui-input>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PredicateTestComponent {
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

    readonly asyncPredicate: MaskitoElementPredicate = async element =>
        Promise.resolve(element.querySelectorAll('input')[0]);
}
