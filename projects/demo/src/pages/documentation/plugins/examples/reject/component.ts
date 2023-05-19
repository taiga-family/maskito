import {ChangeDetectionStrategy, Component} from '@angular/core';
import {maskitoRejectEvent} from '@maskito/kit';

import mask from './mask';

@Component({
    selector: 'plugins-reject-doc-example-1',
    template: `
        <tui-input
            class="input"
            [style.animation-name]="'reject-' + (reject % 2)"
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
    styleUrls: ['./component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluginsDocExample1 {
    maskitoOptions = {...mask, plugins: [maskitoRejectEvent]};

    value = '';

    reject = -1;
}
