import { TuiInput } from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import mask from './mask';

@Component({
    selector: 'kit-plugins-doc-example-2',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield
            [style.max-width.rem]="20"
            [tuiTextfieldCleaner]="false"
        >
            <input
                inputmode="numeric"
                tuiInput
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitPluginsDocExample2 {
    protected value = '$100 per day';
    protected maskitoOptions = mask;
}
