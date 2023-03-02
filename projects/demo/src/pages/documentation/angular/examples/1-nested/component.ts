import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoPredicate} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';

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

    readonly predicate: MaskitoPredicate = element => element.querySelector('input')!;
}
