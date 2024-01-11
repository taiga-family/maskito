import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiPrimitiveTextfieldModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiTextareaModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'overwrite-mode-dynamic-doc-example-3',
    imports: [
        TuiTextareaModule,
        ReactiveFormsModule,
        FormsModule,
        TuiTextfieldControllerModule,
        TuiPrimitiveTextfieldModule,
        MaskitoDirective,
    ],
    template: `
        <tui-textarea
            [expandable]="true"
            [ngModel]="initialValue"
            [style.max-width.rem]="20"
            [tuiTextfieldLabelOutside]="true"
        >
            <textarea
                tuiTextfield
                [maskito]="maskitoOptions"
            ></textarea>
        </tui-textarea>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverwriteModeDocExample3 {
    maskitoOptions = mask;

    initialValue =
        'This artificial example demonstrates the usage of dynamic mode. ' +
        'If this textarea contains only digits — "replace" mode is enabled. ' +
        'Otherwise, "shift" mode is enabled.';
}
