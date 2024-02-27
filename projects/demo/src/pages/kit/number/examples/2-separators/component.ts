import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'number-mask-doc-example-2',
    imports: [TuiInputModule, FormsModule, MaskitoDirective],
    template: `
        <tui-input
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            Type number like a German
            <input
                inputmode="decimal"
                placeholder="1.000,42"
                tuiTextfield
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample2 {
    protected maskitoOptions = mask;
    protected value = '';
}
