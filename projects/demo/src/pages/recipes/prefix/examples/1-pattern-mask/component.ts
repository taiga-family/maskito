import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiPrimitiveTextfieldModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'prefix-doc-example-1',
    imports: [
        TuiInputModule,
        ReactiveFormsModule,
        FormsModule,
        TuiPrimitiveTextfieldModule,
        MaskitoDirective,
    ],
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
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrefixDocExample1 {
    readonly maskitoOptions = mask;
    value = '';
}
