import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

import {MaskitoCVA} from '../../../../../../angular/src/lib/maskito.cva';
import {MaskitoDirective} from '../../../../../../angular/src/lib/maskito.directive';

@Component({
    standalone: true,
    selector: 'test-doc-example-3',
    imports: [MaskitoCVA, MaskitoDirective],
    template: `
        <input
            value="$ 100 per day"
            [maskito]="numberMask"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDocExample3 {
    readonly numberMask: MaskitoOptions = maskitoNumberOptionsGenerator({
        prefix: '$ ',
        postfix: ' per day',
    });
}
