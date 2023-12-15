import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {maskitoRejectEvent} from '@maskito/kit';

import mask from './mask';

@Component({
    selector: 'plugins-reject-doc-example-1',
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
