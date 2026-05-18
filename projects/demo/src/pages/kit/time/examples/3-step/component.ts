import { TuiInput } from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import mask from './mask';

@Component({
    selector: 'time-mask-doc-example-3',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInput
    ],
    template: `
        <tui-textfield filler="hh:mm:ss" iconEnd="@tui.clock" [style.max-width.rem]="20">
        <input
                inputmode="decimal"
                tuiInput
                [maskito]="mask" [(ngModel)]="value"/>
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocExample3 {
    protected value = '11:59:59';
    protected readonly mask = mask;
}
