import { TuiInput, TuiIcon } from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import mask from './mask';

@Component({
    selector: 'input-type-url-example',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInput,
        TuiIcon
    ],
    template: `
        <tui-textfield [style.max-width.rem]="20">
        <label tuiLabel>Enter url</label>
        <input
                tuiInput
                type="url"
                [maskito]="maskitoOptions" [(ngModel)]="value"/>

        <tui-icon icon="@tui.globe" />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputURLDocExample {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
