import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoPredicate} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';

@Component({
    selector: 'test-doc-example-1',
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDocExample1 {
    value = {
        number: '',
        name: '',
    };

    readonly cardMask: MaskitoOptions = {
        mask: [
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(4).fill(/\d/),
        ],
    };

    readonly nameMask: MaskitoOptions = {
        mask: /^[a-zA-Z\s]+$/,
        postprocessor: ({value, selection}) => ({value: value.toUpperCase(), selection}),
    };

    readonly cardPredicate: MaskitoPredicate = element =>
        element.querySelectorAll('input')[0]!;

    readonly namePredicate: MaskitoPredicate = element =>
        element.querySelectorAll('input')[1]!;
}
