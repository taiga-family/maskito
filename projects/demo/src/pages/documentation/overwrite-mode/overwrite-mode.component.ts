import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/path';
import {TuiDocExample} from '@taiga-ui/addon-doc';

@Component({
    selector: 'overwrite-mode-doc-page',
    templateUrl: './overwrite-mode.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverwriteModeDocPageComponent {
    readonly shiftExample: TuiDocExample = {
        MaskitoOptions: import('./examples/shift/mask.ts?raw'),
    };

    readonly replaceExample: TuiDocExample = {
        MaskitoOptions: import('./examples/replace/mask.ts?raw'),
    };

    readonly dynamicExample: TuiDocExample = {
        MaskitoOptions: import('./examples/dynamic/mask.ts?raw'),
    };

    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly elementStateDocPage = `/${DemoPath.ElementState}`;
    readonly processorsDocPage = `/${DemoPath.Processors}`;
}
