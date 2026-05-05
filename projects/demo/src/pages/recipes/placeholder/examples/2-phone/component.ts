import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiIcon, TuiInput} from '@taiga-ui/core';
import {TuiFlagPipe} from '@taiga-ui/kit';
import {PolymorpheusOutlet} from '@taiga-ui/polymorpheus';

import mask from './mask';

@Component({
    selector: 'placeholder-doc-example-2',
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
            <label tuiLabel>Enter US phone number</label>
            <input
                inputmode="tel"
                tuiInput
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />
            <ng-template #usFlag>
                <img
                    alt="Flag of the United States"
                    width="28"
                    [src]="'US' | tuiFlag"
                    [style.border-radius.%]="50"
                />
            </ng-template>
            <tui-icon
                *polymorpheusOutlet="usFlag as src"
                [icon]="src"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderDocExample2 {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
