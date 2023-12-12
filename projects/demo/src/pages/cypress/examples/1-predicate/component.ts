import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';

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
        element.querySelectorAll('input')[0]!;

    readonly namePredicate: MaskitoElementPredicate = element =>
        element.querySelectorAll('input')[1]!;

    readonly asyncPredicate: MaskitoElementPredicate = async element =>
        Promise.resolve(element.querySelectorAll('input')[0]!);
}
