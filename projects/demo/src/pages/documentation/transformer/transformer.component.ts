import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/path';

@Component({
    selector: 'transformer-doc-page',
    templateUrl: './transformer.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransformerDocPageComponent {
    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly processorsDocPage = `/${DemoPath.Processors}`;
    readonly overwriteModeDocPage = `/${DemoPath.OverwriteMode}`;

    readonly utilityInActionDemo = import('./examples/utility-in-action-demo.md?raw');
}
