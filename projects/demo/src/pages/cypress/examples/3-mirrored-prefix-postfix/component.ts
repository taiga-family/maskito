import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

@Component({
    selector: 'test-doc-example-3',
    template: `
        <input
            value="$ 100 per kg"
            [maskito]="numberMask"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDocExample3 {
    readonly numberMask: MaskitoOptions = maskitoNumberOptionsGenerator({
        prefix: '$ ',
        postfix: ' per kg',
    });
}
