import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiDocCodeModule, TuiDocPageModule} from '@taiga-ui/addon-doc';
import {TuiNotificationModule} from '@taiga-ui/core';

import {NextStepsComponent} from '../next-steps/next-steps.component';

@Component({
    standalone: true,
    selector: 'transformer-doc-page',
    imports: [
        TuiDocPageModule,
        TuiNotificationModule,
        TuiDocCodeModule,
        NextStepsComponent,
    ],
    templateUrl: './transformer.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransformerDocPageComponent {
    readonly utilityInActionDemo = import('./examples/utility-in-action-demo.md?raw');
}
