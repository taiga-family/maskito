import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/routes';
import {TuiDocExample} from '@taiga-ui/addon-doc';

@Component({
    selector: 'overwrite-mode-doc-page',
    templateUrl: './overwrite-mode.template.html',
    styleUrls: ['./overwrite-mode.style.less'],
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
    readonly processorsDocPage = `/${DemoPath.Processors}`;
}
