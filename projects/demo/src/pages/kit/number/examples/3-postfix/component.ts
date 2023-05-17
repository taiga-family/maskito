import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';

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
                #nativeInput
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
    private readonly postfix = '%';

    @ViewChild('nativeInput', {read: ElementRef})
    inputRef!: ElementRef<HTMLInputElement>;

    value = `97${this.postfix}`;
    maskitoOptions = mask;

    onFocus(): void {
        if (!this.value) {
            this.value = this.postfix;
        }

        const newCaretIndex = this.value.length - this.postfix.length;

        setTimeout(() => {
            // To put cursor before postfix
            this.inputRef.nativeElement.setSelectionRange(newCaretIndex, newCaretIndex);
        });
    }

    onBlur(): void {
        if (this.value === this.postfix) {
            this.value = `0${this.postfix}`;
        }
    }
}
