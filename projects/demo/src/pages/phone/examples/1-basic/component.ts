import { TuiInput, TuiIcon } from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import mask from './mask';

@Component({
    selector: 'phone-doc-example-1',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInput,
        TuiIcon
    ],
    template: `
        <tui-textfield [style.max-width.rem]="30">
        <label tuiLabel>Basic</label>
        <input
                autocomplete="tel"
                inputmode="tel"
                tuiInput
                [maskito]="mask" [(ngModel)]="value"/>

        <tui-icon icon="@tui.phone" />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample1 {
    protected value = '+7 771 931-1111';
    protected readonly mask = mask;
}
