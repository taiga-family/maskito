import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'number-mask-doc-example-1',
    template: `
        <tui-input
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            <strong>&pi;</strong>
            -value
            <input
                inputmode="decimal"
                placeholder="3,141..."
                tuiTextfield
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample1 {
    value = '';
    maskitoOptions = mask;
}
