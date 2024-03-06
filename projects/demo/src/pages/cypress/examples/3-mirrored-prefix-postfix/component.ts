import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

@Component({
    standalone: true,
    selector: 'test-doc-example-3',
    imports: [MaskitoDirective],
    template: `
        <input
            value="$ 100 per day"
            [maskito]="numberMask"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDocExample3 {
    protected readonly numberMask: MaskitoOptions = maskitoNumberOptionsGenerator({
        prefix: '$ ',
        postfix: ' per day',
    });
}
