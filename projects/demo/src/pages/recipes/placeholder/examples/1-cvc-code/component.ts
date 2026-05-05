import { TuiInput, TuiIcon } from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import mask from './mask';

@Component({
    selector: 'placeholder-doc-example-1',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInput,
        TuiIcon
    ],
    template: `
        <tui-textfield [style.max-width.rem]="20">
        <label tuiLabel>Enter CVC code</label>
        <input
                inputmode="numeric"
                tuiInput
                [maskito]="maskitoOptions" [(ngModel)]="value"/>

        <tui-icon icon="@tui.credit-card" />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderDocExample1 {
    protected readonly maskitoOptions = mask;
    protected value = 'xxx';
}
