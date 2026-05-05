import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiIcon, TuiInput} from '@taiga-ui/core';
import {TuiFlagPipe} from '@taiga-ui/kit';
import {PolymorpheusOutlet} from '@taiga-ui/polymorpheus';

import mask from './mask';

@Component({
    selector: 'input-type-tel-example',
    imports: [
        FormsModule,
        MaskitoDirective,
        PolymorpheusOutlet,
        TuiFlagPipe,
        TuiIcon,
        TuiInput,
    ],
    template: `
        <tui-textfield [style.max-width.rem]="20">
            <label tuiLabel>Enter phone number</label>
            <input
                tuiInput
                type="tel"
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />

            <tui-icon
                *polymorpheusOutlet="usFlag as src"
                [icon]="src"
            />
        </tui-textfield>

        <ng-template #usFlag>
            <img
                alt="Flag of the United States"
                width="28"
                [src]="'US' | tuiFlag"
                [style.border-radius.%]="50"
            />
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTelDocExample {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
