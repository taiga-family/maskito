import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'phone-doc-example-1',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        FormsModule,
        MaskitoDirective,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="@tui.phone"
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            Basic
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiTextfield
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample1 {
    protected value = '+7 771 931-1111';
    protected readonly mask = mask;
}
