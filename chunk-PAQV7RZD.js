import"./chunk-TIC6Q35B.js";var o=`import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';
import {TuiInputModule} from '@taiga-ui/legacy';

@Component({
    selector: 'nested-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiInputModule],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedDocExample1 {
    protected value = '';

    public readonly nameMask: MaskitoOptions = {
        mask: /^[a-zA-Z\\s]+$/,
        postprocessors: [
            ({value, selection}) => ({value: value.toUpperCase(), selection}),
        ],
    };

    public readonly predicate: MaskitoElementPredicate = (element) =>
        element.querySelector<HTMLInputElement>('tui-input input')!;
}
`;export{o as default};
