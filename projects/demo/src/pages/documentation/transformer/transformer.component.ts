import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiNotificationModule} from '@taiga-ui/core';

import {NextStepsComponent} from '../next-steps/next-steps.component';

@Component({
    standalone: true,
    selector: 'transformer-doc-page',
    imports: [TuiAddonDocModule, TuiNotificationModule, NextStepsComponent],
    templateUrl: './transformer.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TransformerDocPageComponent {
    protected readonly utilityInActionDemo = import(
        './examples/utility-in-action-demo.md?raw'
    );
}
