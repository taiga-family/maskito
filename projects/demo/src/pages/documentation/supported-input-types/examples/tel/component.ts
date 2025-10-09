import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiFlagPipe} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'input-type-tel-example',
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
            [tuiTextfieldLabelOutside]="true"
            [(ngModel)]="value"
        >
            Enter phone number
            <input
                tuiTextfieldLegacy
                type="tel"
                [maskito]="maskitoOptions"
            />
        </tui-input>

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
