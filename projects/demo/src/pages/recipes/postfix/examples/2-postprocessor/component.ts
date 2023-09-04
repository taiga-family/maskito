import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'postfix-doc-example-2',
    template: `
        <tui-input
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter price
            <input
                #inputRef
                inputmode="numeric"
                tuiTextfield
                [maskito]="maskitoOptions"
                (blur)="onBlur()"
                (focus)="onFocus()"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostfixDocExample2 {
    @ViewChild('inputRef', {read: ElementRef})
    inputElement!: ElementRef<HTMLInputElement>;

    readonly maskitoOptions = mask;
    value = '';

    onFocus(): void {
        if (!this.value) {
            this.value = '$.00';
        }
    }

    onBlur(): void {
        if (this.value === '$.00') {
            this.value = '';
        }
    }
}
