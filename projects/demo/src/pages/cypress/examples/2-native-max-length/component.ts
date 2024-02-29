import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

@Component({
    standalone: true,
    selector: 'test-doc-example-2',
    imports: [MaskitoDirective],
    template: `
        <input
            maxlength="3"
            [maskito]="numberMask"
        />

        <input
            maxlength="6"
            [maskito]="hexColorMask"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDocExample2 {
    protected readonly numberMask = maskitoNumberOptionsGenerator({
        thousandSeparator: ' ',
    });

    protected readonly hexColorMask: MaskitoOptions = {
        mask: /^[A-F\d]*$/gi,
        overwriteMode: 'replace',
        postprocessors: [
            ({value, selection}) => ({
                selection,
                value: value.toUpperCase(),
            }),
        ],
    };
}
