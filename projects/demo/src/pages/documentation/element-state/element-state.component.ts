import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink} from '@taiga-ui/core';

@Component({
    selector: 'element-state-doc-page',
    imports: [RouterLink, TuiAddonDoc, TuiLink],
    templateUrl: './element-state.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ElementStateDocPageComponent {
    protected readonly elementStateDemo = import('./examples/element-state-demo.md');

    protected readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    protected readonly processorsDocPage = `/${DemoPath.Processors}`;
    protected readonly overwriteModeDocPage = `/${DemoPath.OverwriteMode}`;
}
