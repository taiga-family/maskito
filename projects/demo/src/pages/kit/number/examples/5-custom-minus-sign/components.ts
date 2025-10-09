import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'number-mask-doc-example-5',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInputModule,
        TuiTextfieldControllerModule,
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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample5 {
    protected value = '-42';
    protected readonly options = mask;
}
