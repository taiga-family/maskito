import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiTextareaModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'overwrite-mode-dynamic-doc-example-3',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiTextareaModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-textarea
            [expandable]="true"
            [ngModel]="initialValue"
            [style.max-width.rem]="20"
            [tuiTextfieldLabelOutside]="true"
        >
            <textarea
                tuiTextfieldLegacy
                [maskito]="maskitoOptions"
            ></textarea>
        </tui-textarea>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverwriteModeDocExample3 {
    protected maskitoOptions = mask;

    protected initialValue =
        'This artificial example demonstrates the usage of dynamic mode. ' +
        'If this textarea contains only digits — "replace" mode is enabled. ' +
        'Otherwise, "shift" mode is enabled.';
}
