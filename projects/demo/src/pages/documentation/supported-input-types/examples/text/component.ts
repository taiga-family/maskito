import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'input-type-text-example',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="@tui.clock"
            [style.max-width.rem]="20"
            [tuiTextfieldLabelOutside]="true"
            [(ngModel)]="value"
        >
            Enter time
            <input
                inputmode="decimal"
                tuiTextfieldLegacy
                type="text"
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextDocExample {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
