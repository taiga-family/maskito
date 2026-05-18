import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiIcon, TuiInput} from '@taiga-ui/core';
import {TuiFlagPipe} from '@taiga-ui/kit';
import {PolymorpheusOutlet} from '@taiga-ui/polymorpheus';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-5',
    imports: [
        FormsModule,
        MaskitoDirective,
        PolymorpheusOutlet,
        TuiFlagPipe,
        TuiIcon,
        TuiInput,
    ],
    template: `
        <tui-textfield
            #textfield
            [style.max-width.rem]="30"
        >
            <label tuiLabel>
                {{
                    textfield.focused()
                        ? 'Blur me to remove prefix'
                        : 'Focus me to see prefix'
                }}
            </label>
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiInput
                [maskito]="mask"
                [(ngModel)]="value"
            />
            <ng-template #flag>
                <img
                    alt="Turkish flag"
                    width="28"
                    [src]="'TR' | tuiFlag"
                    [style.border-radius.%]="50"
                />
            </ng-template>
            <tui-icon
                *polymorpheusOutlet="flag as src"
                [icon]="src"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample5 {
    protected value = '';
    protected readonly mask = mask;
}
