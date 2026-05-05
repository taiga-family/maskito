import { TuiInput, TuiIcon } from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import mask from './mask';

@Component({
    selector: 'date-time-mask-doc-example-4',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInput,
        TuiIcon
    ],
    template: `
        <tui-textfield [style.max-width.rem]="30" [filler]="filler">
        <label tuiLabel>Time Stepping</label>
        <input
                inputmode="decimal"
                tuiInput
                [maskito]="mask" [(ngModel)]="value"/>

        <tui-icon icon="@tui.calendar" />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeMaskDocExample4 {
    protected value = '09.01.2018, 15:30';
    protected readonly filler = 'dd.mm.yyyy, hh:mm';
    protected readonly mask = mask;
}
