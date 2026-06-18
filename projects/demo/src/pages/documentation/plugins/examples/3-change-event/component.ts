import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'plugins-change-event-doc-example-4',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield [style.max-width.rem]="20">
            <label tuiLabel>Enter number</label>
            <input
                tuiInput
                [maskito]="maskitoOptions"
                (change)="log($event)"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example {
    protected readonly maskitoOptions = mask;
    protected value = '';

    protected log(anything: any): void {
        console.info(anything);
    }
}
