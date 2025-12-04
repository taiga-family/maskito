import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-6',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="@tui.phone"
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            National format (US)
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiTextfieldLegacy
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample6 {
    protected value = '(213) 373-4253';
    protected readonly mask = mask;
}
