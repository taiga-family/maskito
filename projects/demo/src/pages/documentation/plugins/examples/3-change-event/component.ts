import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'plugins-change-event-doc-example-4',
    imports: [FormsModule, MaskitoDirective, TuiInputModule],
    template: `
        <tui-input
            [maskito]="maskitoOptions"
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter number

            <input
                tuiTextfieldLegacy
                [maskito]="maskitoOptions"
                (change)="log($event)"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluginsDocExample4 {
    protected readonly maskitoOptions = mask;
    protected value = '';

    protected log(anything: any): void {
        console.info(anything);
    }
}
