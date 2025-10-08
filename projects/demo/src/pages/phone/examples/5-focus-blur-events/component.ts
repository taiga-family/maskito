import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiFlagPipe} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-5',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiFlagPipe,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            #textfield
            [style.max-width.rem]="30"
            [tuiTextfieldCustomContent]="flag"
            [(ngModel)]="value"
        >
            {{
                textfield.focused ? 'Blur me to remove prefix' : 'Focus me to see prefix'
            }}
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiTextfieldLegacy
                [maskito]="mask"
            />

            <ng-template #flag>
                <img
                    alt="Turkish flag"
                    width="28"
                    [src]="'TR' | tuiFlag"
                    [style.border-radius.%]="50"
                />
            </ng-template>
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample5 {
    protected value = '';
    protected readonly mask = mask;
}
