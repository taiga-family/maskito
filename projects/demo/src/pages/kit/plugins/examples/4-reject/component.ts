import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'kit-plugins-doc-example-4',
    imports: [FormsModule, MaskitoDirective, TuiInputModule],
    template: `
        <tui-input
            [style.animation-duration.ms]="300"
            [style.animation-iteration-count]="1"
            [style.animation-name]="'reject-' + (reject % 2)"
            [style.max-width.rem]="20"
            [(ngModel)]="value"
            (maskitoReject)="reject = reject + 1"
        >
            CVC
            <input
                tuiTextfieldLegacy
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    styleUrl: './animation.css',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitPluginsDocExample4 {
    protected maskitoOptions = mask;

    protected value = '';

    protected reject = -1;
}
