import {ChangeDetectionStrategy, Component} from '@angular/core';
import mask from './mask';

@Component({
    selector: 'number-mask-doc-example-2',
    template: `
        <tui-input
            [style.max-width.rem]="30"
            [ngModel]=""
        >
            Type number like a German
            <input
                tuiTextfield
                placeholder="1.000,42"
                inputmode="decimal"
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample2 {
    maskitoOptions = mask;
}
