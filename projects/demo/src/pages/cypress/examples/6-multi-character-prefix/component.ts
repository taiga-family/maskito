import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

import {MaskitoCVA} from '../../../../../../angular/src/lib/maskito.cva';
import {MaskitoDirective} from '../../../../../../angular/src/lib/maskito.directive';

@Component({
    standalone: true,
    selector: 'test-doc-example-6',
    imports: [MaskitoCVA, MaskitoDirective],
    template: `
        <input
            placeholder="Type 'E', 'U' or 'R' character"
            value=""
            [maskito]="numberMask"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDocExample6 {
    readonly numberMask: MaskitoOptions = maskitoNumberOptionsGenerator({
        prefix: 'EUR ',
    });
}
