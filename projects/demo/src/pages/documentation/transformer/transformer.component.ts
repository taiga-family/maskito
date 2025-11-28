import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiNotification} from '@taiga-ui/core';

import {NextStepsComponent} from '../next-steps/next-steps.component';

@Component({
    selector: 'transformer-doc-page',
    imports: [NextStepsComponent, TuiAddonDoc, TuiNotification],
    templateUrl: './transformer.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TransformerDocPageComponent {
    protected readonly utilityInActionDemo =
        import('./examples/utility-in-action-demo.md');
}
