import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'time-mask-doc-example-2',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            tuiTextfieldFiller="HH:MM AA"
            tuiTextfieldIcon="@tui.clock"
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter 12-hour time format
            <input
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
