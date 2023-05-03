import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/constants';

@Component({
    selector: 'element-state-doc-page',
    templateUrl: './element-state.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementStateDocPageComponent {
    readonly elementStateDemo = import('./examples/element-state-demo.md?raw');

    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly processorsDocPage = `/${DemoPath.Processors}`;
    readonly overwriteModeDocPage = `/${DemoPath.OverwriteMode}`;
}
