import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';
import {TuiFlagPipe} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    selector: 'placeholder-doc-example-2',
    imports: [FormsModule, MaskitoDirective, TuiFlagPipe, TuiInput],
    template: `
        <tui-textfield [style.max-width.rem]="20">
            <label tuiLabel>Enter US phone number</label>
            <input
                inputmode="tel"
                tuiInput
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />

            <img
                alt="Flag of the United States"
                width="28"
                [src]="'US' | tuiFlag"
                [style.border-radius.%]="50"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
