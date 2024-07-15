import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import {NextStepsComponent} from '../next-steps/next-steps.component';

@Component({
    standalone: true,
    selector: 'processors-doc-page',
    imports: [TuiAddonDoc, TuiLink, TuiNotification, RouterLink, NextStepsComponent],
    templateUrl: './processors.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProcessorsDocPageComponent {
    protected readonly preprocessorFirstArgDemo = import(
        './examples/preprocessor-first-arg-demo.md?raw'
    );

    protected readonly preprocessorsSecondArgDemo = import(
        './examples/processor-second-arg-demo.md?raw'
    );

    protected readonly preprocessorInActionDemo = import(
        './examples/preprocessor-in-action-demo.md?raw'
    );

    protected readonly postprocessorInActionDemo = import(
        './examples/postprocessor-in-action.md?raw'
    );

    protected readonly elementStateDocPage = `/${DemoPath.ElementState}`;
}
