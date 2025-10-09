import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiHint} from '@taiga-ui/core';
import {TuiInputPasswordModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'input-type-password-example',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiHint,
        TuiInputPasswordModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input-password
            tuiHintContent="Only 3 digits are allowed"
            [style.max-width.rem]="20"
            [tuiTextfieldLabelOutside]="true"
            [(ngModel)]="value"
        >
            Enter password
            <input
                tuiTextfieldLegacy
                type="password"
                [maskito]="maskitoOptions"
            />
        </tui-input-password>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordDocExample {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
