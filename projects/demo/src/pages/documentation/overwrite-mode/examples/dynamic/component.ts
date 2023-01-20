import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'overwrite-mode-dynamic-doc-example-3',
    template: `
        <tui-text-area
            [ngModel]="initialValue"
            [style.max-width.rem]="20"
            [expandable]="true"
            [tuiTextfieldLabelOutside]="true"
        >
            <textarea
                tuiTextfield
                [maskito]="maskitoOptions"
            ></textarea>
        </tui-text-area>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverwriteModeDocExample3 {
    maskitoOptions = mask;

    initialValue =
        'This artificial example demonstrates the usage of dynamic mode. ' +
        'If this textarea contains only digits – "replace"-mode is enabled. ' +
        'Otherwise, "shift"-mode is enabled.';
}
