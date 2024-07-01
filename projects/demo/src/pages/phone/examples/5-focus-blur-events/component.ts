import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiFlagPipeModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'phone-doc-example-5',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        FormsModule,
        MaskitoDirective,
        TuiFlagPipeModule,
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
                tuiTextfield
                [maskito]="mask"
            />

            <ng-template #flag>
                <img
                    alt="Turkish flag"
                    width="28"
                    [src]="'TR' | tuiFlag"
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
