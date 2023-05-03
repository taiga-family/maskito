import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiDocExample} from '@taiga-ui/addon-doc';

@Component({
    selector: 'overwrite-mode-doc-page',
    templateUrl: './overwrite-mode.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverwriteModeDocPageComponent {
    readonly shiftExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/shift/mask.ts?raw'),
    };

    readonly replaceExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/replace/mask.ts?raw'),
    };

    readonly dynamicExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/dynamic/mask.ts?raw'),
    };

    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly elementStateDocPage = `/${DemoPath.ElementState}`;
    readonly processorsDocPage = `/${DemoPath.Processors}`;
}
