import { TuiInput } from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import mask from './mask';

@Component({
    selector: 'time-mask-doc-example-4',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInput
    ],
    template: `
        <tui-textfield iconEnd="@tui.timer" [style.max-width.rem]="20">
        <label tuiLabel>Timer (minutes)</label>
        <input
                inputmode="numeric"
                tuiInput
                [maskito]="maskitoOptions" [(ngModel)]="value"/>
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocExample4 {
    protected value = '05:00 left';
    protected readonly maskitoOptions = mask;
}
