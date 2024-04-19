import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'input-type-search-example',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            tuiTextfieldIconLeft="tuiIconSearchLarge"
            [style.max-width.rem]="20"
            [tuiTextfieldLabelOutside]="true"
            [(ngModel)]="value"
        >
            Enter any english word
            <input
                tuiTextfield
                type="search"
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchDocExample {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
