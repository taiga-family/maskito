import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import {VueExample1} from './examples/vue-1/component';

@Component({
    standalone: true,
    selector: 'vue-doc-page',
    imports: [TuiAddonDocModule, TuiNotification, TuiLink, RouterLink, VueExample1],
    templateUrl: './vue-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VueDocPageComponent {
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    protected readonly useMaskitoBasicUsage = import(
        './examples/use-maskito-basic-usage.md?raw'
    );

    protected readonly queryNestedInputDemo = import(
        './examples/query-nested-input.md?raw'
    );

    protected readonly bestBadPractice = import('./examples/best-bad-practice.md?raw');
}
