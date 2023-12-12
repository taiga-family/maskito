import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';
import {TuiInputModule} from '@taiga-ui/kit';

@Component({
    standalone: true,
    selector: 'nested-doc-example-1',
    imports: [MaskitoDirective, FormsModule, TuiInputModule],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedDocExample1 {
    value = '';

    readonly nameMask: MaskitoOptions = {
        mask: /^[a-zA-Z\s]+$/,
        postprocessors: [
            ({value, selection}) => ({value: value.toUpperCase(), selection}),
        ],
    };

    readonly predicate: MaskitoElementPredicate = element =>
        element.querySelector('tui-input input')!;
}
