import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

import {NextStepsComponent} from '../next-steps/next-steps.component';

@Component({
    standalone: true,
    selector: 'mask-expression-doc-page',
    imports: [
        TuiAddonDocModule,
        TuiLinkModule,
        TuiNotificationModule,
        RouterLink,
        NextStepsComponent,
    ],
    templateUrl: './mask-expression.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MaskExpressionDocPageComponent {
    readonly elementStateDocPage = `/${DemoPath.ElementState}`;
    readonly regExpMaskExpDemo = import('./examples/reg-exp-mask-expression-demo.md?raw');
    readonly basicTimeDemo = import('./examples/basic-time-example.md?raw');
    readonly dynamicMaskExpDemo = import(
        './examples/dynamic-mask-expression-demo.md?raw'
    );
}
