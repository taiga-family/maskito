import { TuiInput } from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import mask from './mask';

@Component({
    selector: 'number-mask-doc-example-8',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield [style.max-width.rem]="30">
        <label tuiLabel>Japanese yen</label>
        <input
                inputmode="decimal"
                placeholder="¥1,2345,6789"
                tuiInput
                [maskito]="maskitoOptions" [(ngModel)]="value"/>
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample8 {
    protected maskitoOptions = mask;
    protected value = '';
}
