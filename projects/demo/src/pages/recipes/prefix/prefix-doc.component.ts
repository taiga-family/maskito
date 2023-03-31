import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/path';
import {TuiDocExample} from '@taiga-ui/addon-doc';

@Component({
    selector: 'prefix-doc',
    templateUrl: './prefix-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrefixDocComponent {
    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly processorsDocPage = `/${DemoPath.Processors}`;

    readonly patternMaskApproachExample1: TuiDocExample = {
        MaskitoOptions: import('./examples/1-pattern-mask/mask.ts?raw'),
    };

    readonly postprocessorApproachExample2: TuiDocExample = {
        MaskitoOptions: import('./examples/2-postprocessor/mask.ts?raw'),
    };
}
