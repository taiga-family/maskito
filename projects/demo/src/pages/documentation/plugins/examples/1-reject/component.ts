import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoRejectEvent} from '@maskito/kit';
import {TuiPrimitiveTextfieldModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'plugins-reject-doc-example-1',
    imports: [
        TuiInputModule,
        ReactiveFormsModule,
        FormsModule,
        TuiPrimitiveTextfieldModule,
        MaskitoDirective,
    ],
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
                tuiTextfield
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    styleUrls: ['./animation.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluginsDocExample1 {
    maskitoOptions = {...mask, plugins: [maskitoRejectEvent]};

    value = '';

    reject = -1;
}
