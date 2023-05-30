import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';

@Component({
    selector: 'nested-doc-example-1',
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedDocExample1 {
    value = '';

    readonly nameMask: MaskitoOptions = {
        mask: /^[a-zA-Z\s]+$/,
        postprocessor: ({value, selection}) => ({value: value.toUpperCase(), selection}),
    };

    readonly predicate: MaskitoElementPredicate = element =>
        element.querySelector('tui-input input')!;
}
