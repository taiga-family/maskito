import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {getMaskitoOptions} from './mask';

@Component({
    standalone: true,
    selector: 'number-mask-doc-example-6',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        MaskitoDirective,
        FormsModule,
    ],
    template: `
        <tui-input
            [tuiTextfieldLabelOutside]="true"
            [(ngModel)]="value"
        >
            <input
                tuiTextfield
                [maskito]="getMaskOptions(minusSign)"
            />
        </tui-input>
    `,
})
export class NumberMaskDocExample6 {
    protected value = '\u30FC42';
    protected minusSign = '\u30FC';

    protected getMaskOptions(minusSign: string): MaskitoOptions {
        return getMaskitoOptions(minusSign);
    }
}
