import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'input-type-text-example',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconClockLarge"
            [style.max-width.rem]="20"
            [tuiTextfieldLabelOutside]="true"
            [(ngModel)]="value"
        >
            Enter time
            <input
                inputmode="decimal"
                tuiTextfield
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
