import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

@Component({
    selector: 'test-doc-example-2',
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
    readonly numberMask = maskitoNumberOptionsGenerator({
        thousandSeparator: ' ',
    });

    readonly hexColorMask: MaskitoOptions = {
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
