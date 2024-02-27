import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiFlagPipeModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'phone-doc-example-1',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiFlagPipeModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            [style.max-width.rem]="20"
            [tuiTextfieldCustomContent]="usFlag"
            [(ngModel)]="value"
        >
            Enter a phone number
            <input
                inputmode="tel"
                tuiTextfield
                [maskito]="maskitoOptions"
            />

            <ng-template #usFlag>
                <img
                    alt="Flag of the United States"
                    width="28"
                    [src]="'US' | tuiFlag"
                />
            </ng-template>
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneUSDocExample1 {
    protected readonly maskitoOptions = mask;
    protected value = '+1 (212) 555-2368';
}
