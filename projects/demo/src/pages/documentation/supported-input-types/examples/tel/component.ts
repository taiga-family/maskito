import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiFlagPipeModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'input-type-tel-example',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiFlagPipeModule,
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
                tuiTextfield
                type="tel"
                [maskito]="maskitoOptions"
            />
        </tui-input>

        <ng-template #usFlag>
            <img
                alt="Flag of the United States"
                width="28"
                [src]="'US' | tuiFlag"
            />
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTelDocExample {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
