import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'overwrite-mode-shift-doc-example-1',
    template: `
        <tui-input
            tuiHintContent="Insert character somewhere in the middle"
            [style.max-width.rem]="20"
            [tuiTextfieldLabelOutside]="true"
            [(ngModel)]="value"
        >
            <input
                inputmode="decimal"
                tuiTextfield
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverwriteModeDocExample1 {
    readonly maskitoOptions = mask;
    value = '0000';
}
