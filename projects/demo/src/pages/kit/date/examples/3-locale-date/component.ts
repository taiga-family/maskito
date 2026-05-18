import { TuiInput, TuiIcon } from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import mask from './mask';

@Component({
    selector: 'date-mask-doc-example-3',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInput,
        TuiIcon
    ],
    template: `
        <tui-textfield [style.max-width.rem]="30" [filler]="filler">
        <label tuiLabel>Lithuanian locale (lt-LT)</label>
        <input
                inputmode="numeric"
                tuiInput
                [maskito]="mask" [(ngModel)]="value"/>

        <tui-icon icon="@tui.calendar" />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateMaskDocExample3 {
    protected value = '2005-10-21';
    protected readonly filler = 'yyyy-mm-dd';
    protected readonly mask = mask;
}
