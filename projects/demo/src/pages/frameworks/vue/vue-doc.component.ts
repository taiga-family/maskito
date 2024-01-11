import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {
    TuiDocCodeModule,
    TuiDocExampleModule,
    TuiDocPageModule,
} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

import {VueExample1} from './examples/vue-1/component';

@Component({
    standalone: true,
    selector: 'vue-doc-page',
    imports: [
        TuiDocPageModule,
        TuiNotificationModule,
        TuiLinkModule,
        RouterLink,
        TuiDocCodeModule,
        TuiDocExampleModule,
        VueExample1,
    ],
    templateUrl: './vue-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VueDocPageComponent {
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    readonly useMaskitoBasicUsage = import('./examples/use-maskito-basic-usage.md?raw');
    readonly queryNestedInputDemo = import('./examples/query-nested-input.md?raw');
    readonly bestBadPractice = import('./examples/best-bad-practice.md?raw');
}
