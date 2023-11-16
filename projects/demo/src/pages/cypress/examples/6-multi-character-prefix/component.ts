import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

@Component({
    selector: 'test-doc-example-6',
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
