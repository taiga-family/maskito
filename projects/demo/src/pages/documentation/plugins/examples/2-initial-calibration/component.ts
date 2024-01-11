import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiPrimitiveTextfieldModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {MaskitoDirective} from '../../../../../../../angular/src/lib/maskito.directive';
import mask from './mask';

@Component({
    standalone: true,
    selector: 'plugins-initial-calibration-doc-example-2',
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
            Enter number

            <input
                tuiTextfield
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluginsDocExample2 {
    maskitoOptions = mask;
    value = '12345';
}
