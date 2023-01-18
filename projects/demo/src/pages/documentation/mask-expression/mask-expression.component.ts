import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/routes';

@Component({
    selector: 'mask-expression-doc-page',
    templateUrl: './mask-expression.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaskExpressionDocPageComponent {
    readonly regExpMaskExpDemo = import('./examples/reg-exp-mask-expression-demo.md?raw');
    readonly basicTimeDemo = import('./examples/basic-time-example.md?raw');
    readonly dynamicMaskExpDemo = import(
        './examples/dynamic-mask-expression-demo.md?raw'
    );

    readonly processorsDocPage = `/${DemoPath.Processors}`;
    readonly overwriteModeDocPage = `/${DemoPath.OverwriteMode}`;
}
