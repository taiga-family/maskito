import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'time-mask-doc-example-2',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="@tui.clock"
            tuiTextfieldFiller="HH:MM AA"
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter 12-hour time format
            <input
                inputmode="decimal"
                tuiTextfieldLegacy
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocExample2 {
    protected readonly mask = mask;
    protected value = '03:30 PM';
}