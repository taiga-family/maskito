import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'number-mask-doc-example-9',
    imports: [FormsModule, MaskitoDirective, TuiInputModule],
    template: `
        <tui-input
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            Indian numbering system
            <input
                inputmode="decimal"
                placeholder="₹12,34,567"
                tuiTextfieldLegacy
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample9 {
    protected maskitoOptions = mask;
    protected value = '';
}
