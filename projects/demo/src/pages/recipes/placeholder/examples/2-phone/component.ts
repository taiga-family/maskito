import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiFlagPipe} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'placeholder-doc-example-2',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiFlagPipe,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            [style.max-width.rem]="20"
            [tuiTextfieldCustomContent]="usFlag"
            [(ngModel)]="value"
        >
            Enter US phone number
            <input
                inputmode="tel"
                tuiTextfieldLegacy
                [maskito]="maskitoOptions"
            />

            <ng-template #usFlag>
                <img
                    alt="Flag of the United States"
                    width="28"
                    [src]="'US' | tuiFlag"
                    [style.border-radius.%]="50"
                />
            </ng-template>
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderDocExample2 {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
