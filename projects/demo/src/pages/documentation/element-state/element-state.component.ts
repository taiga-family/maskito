import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';

@Component({
    standalone: true,
    selector: 'element-state-doc-page',
    imports: [TuiAddonDocModule, TuiLinkModule, RouterLink],
    templateUrl: './element-state.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ElementStateDocPageComponent {
    protected readonly elementStateDemo = import('./examples/element-state-demo.md?raw');

    protected readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    protected readonly processorsDocPage = `/${DemoPath.Processors}`;
    protected readonly overwriteModeDocPage = `/${DemoPath.OverwriteMode}`;
}
