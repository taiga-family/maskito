import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'number-mask-doc-example-4',
    template: `
        <tui-input
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            Cost
            <input
                tuiTextfield
                inputmode="decimal"
                [maskito]="maskitoOptions"
                (blur)="onBlur()"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample4 {
    value = '$100.00';
    maskitoOptions = mask;

    onBlur(): void {
        this.value = this.value.replace('$.', '$0.');
    }
}
