import { TuiInput, TuiIcon } from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import mask from './mask';

@Component({
    selector: 'date-time-mask-doc-example-5',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInput,
        TuiIcon
    ],
    template: `
        <tui-textfield [style.max-width.rem]="30" [filler]="filler">
        <label tuiLabel>With 12-hour time format</label>
        <input
                tuiInput
                [maskito]="mask" [(ngModel)]="value"/>

        <tui-icon icon="@tui.calendar" />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeMaskDocExample5 {
    protected value = '20/09/2020, 03:30 PM';
    protected readonly filler = 'mm/dd/yyyy, hh:mm aa';
    protected readonly mask = mask;
}
