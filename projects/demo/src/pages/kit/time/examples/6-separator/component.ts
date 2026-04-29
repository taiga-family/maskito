import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'time-mask-doc-example-6',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            tuiTextfieldFiller="HH h MM min SS,MS"
            tuiTextfieldIcon="@tui.clock"
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            fr-CA locale
            <input
                inputmode="numeric"
                tuiTextfieldLegacy
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocExample6 {
    protected readonly mask = mask;
    protected value = '18 h 05 min 05,766';
}
