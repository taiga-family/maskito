import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import {NextStepsComponent} from '../next-steps/next-steps.component';

@Component({
    standalone: true,
    selector: 'mask-expression-doc-page',
    imports: [TuiAddonDoc, TuiLink, TuiNotification, RouterLink, NextStepsComponent],
    templateUrl: './mask-expression.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MaskExpressionDocPageComponent {
    protected readonly elementStateDocPage = `/${DemoPath.ElementState}`;
    protected readonly regExpMaskExpDemo = import(
        './examples/reg-exp-mask-expression-demo.md?raw'
    );

    protected readonly basicTimeDemo = import('./examples/basic-time-example.md?raw');
    protected readonly dynamicMaskExpDemo = import(
        './examples/dynamic-mask-expression-demo.md?raw'
    );
}
