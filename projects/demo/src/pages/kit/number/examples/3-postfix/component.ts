import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'number-mask-doc-example-3',
    template: `
        <tui-input
            [style.max-width.rem]="30"
            [tuiTextfieldLabelOutside]="true"
            [(ngModel)]="value"
        >
            <input
                #nativeInput
                inputmode="decimal"
                tuiTextfield
                [maskito]="maskitoOptions"
                (blur)="onBlur()"
                (focus)="onFocus()"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample3 {
    private readonly postfix = '%';

    @ViewChild('nativeInput', {read: ElementRef})
    inputRef!: ElementRef<HTMLInputElement>;

    value = `97${this.postfix}`;
    maskitoOptions = mask;

    onFocus(): void {
        if (!this.value) {
            this.value = this.postfix;
        }
    }

    onBlur(): void {
        if (this.value === this.postfix) {
            this.value = `0${this.postfix}`;
        }
    }
}
