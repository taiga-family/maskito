import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'number-mask-doc-example-3',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        FormsModule,
        MaskitoDirective,
    ],
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
