import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiHint} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'overwrite-mode-shift-doc-example-1',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiHint,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            tuiHintContent="Insert character somewhere in the middle"
            [style.max-width.rem]="20"
            [tuiTextfieldLabelOutside]="true"
            [(ngModel)]="value"
        >
            <input
                inputmode="decimal"
                tuiTextfieldLegacy
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverwriteModeDocExample1 {
    protected readonly maskitoOptions = mask;
    protected value = '0000';
}
