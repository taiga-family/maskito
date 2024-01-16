import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'prefix-doc-example-2',
    imports: [FormsModule, MaskitoDirective, TuiInputModule],
    template: `
        <tui-input
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter price
            <input
                inputmode="tel"
                tuiTextfield
                [maskito]="maskitoOptions"
                (blur)="onBlur()"
                (focus)="onFocus()"
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
