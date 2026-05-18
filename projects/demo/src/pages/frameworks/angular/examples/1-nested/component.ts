import { TuiInput } from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';

@Component({
    selector: 'nested-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedDocExample1 {
    protected value = '';

    public readonly nameMask: MaskitoOptions = {
        mask: /^[a-z\s]+$/i,
        postprocessors: [
            ({value, selection}) => ({value: value.toUpperCase(), selection}),
        ],
    };

    public readonly predicate: MaskitoElementPredicate = (element) =>
        element.querySelector<HTMLInputElement>('tui-input input')!;
}
