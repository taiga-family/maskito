import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'prefix-doc-example-2',
    template: `
        <tui-input
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter price
            <input
                tuiTextfield
                inputmode="tel"
                [maskito]="maskitoOptions"
                (focus)="onFocus()"
                (blur)="onBlur()"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrefixDocExample2 {
    readonly maskitoOptions = mask;

    value = '';

    onFocus(): void {
        if (!this.value) {
            this.value = '$';
        }
    }

    onBlur(): void {
        if (this.value === '$') {
            this.value = '';
        }
    }
}
