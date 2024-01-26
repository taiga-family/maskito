import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'postfix-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiInputModule],
    template: `
        <tui-input
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter percentage amount
            <input
                inputmode="tel"
                tuiTextfield
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostfixDocExample1 {
    readonly maskitoOptions = mask;
    value = '';
}
