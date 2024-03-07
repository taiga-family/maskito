import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';
import {TuiGroupModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

@Component({
    standalone: true,
    selector: 'test-doc-example-1',
    imports: [TuiGroupModule, MaskitoDirective, TuiInputModule, FormsModule],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDocExample1 {
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

    protected readonly cardPredicate: MaskitoElementPredicate = element =>
        element.querySelectorAll('input')[0];

    protected readonly namePredicate: MaskitoElementPredicate = element =>
        element.querySelectorAll('input')[1];

    protected readonly asyncPredicate: MaskitoElementPredicate = async element =>
        Promise.resolve(element.querySelectorAll('input')[0]);
}
