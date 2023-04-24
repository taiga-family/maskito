import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'number-mask-doc-example-3',
    template: `
        <tui-input
            [tuiTextfieldLabelOutside]="true"
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            <input
                tuiTextfield
                inputmode="decimal"
                [maskito]="maskitoOptions"
                (focus)="onFocus()"
                (blur)="onBlur()"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample3 {
    value = '97%';
    maskitoOptions = mask;

    onFocus(): void {
        if (!this.value) {
            this.value = '%';
        }
    }

    onBlur(): void {
        if (this.value === '%') {
            this.value = '0%';
        }
    }
}
