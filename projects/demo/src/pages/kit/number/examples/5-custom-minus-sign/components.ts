import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'number-mask-doc-example-5',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        MaskitoDirective,
        FormsModule,
    ],
    template: `
        <tui-input
            [style.max-width.rem]="30"
            [tuiTextfieldLabelOutside]="true"
            [(ngModel)]="value"
        >
            <input
                tuiTextfieldLegacy
                [maskito]="options"
            />
        </tui-input>
    `,
})
export class NumberMaskDocExample5 {
    protected value = '-42';
    protected readonly options = mask;
}
