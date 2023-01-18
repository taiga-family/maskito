import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'overwrite-mode-shift-doc-example-1',
    template: `
        <tui-input
            ngModel="0000"
            tuiHintContent="Insert character somewhere in the middle"
            [style.max-width.rem]="20"
            [tuiTextfieldLabelOutside]="true"
        >
            <input
                tuiTextfield
                inputmode="decimal"
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverwriteModeDocExample1 {
    maskitoOptions = mask;
}
