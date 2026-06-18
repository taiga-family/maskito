import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import Example1 from './examples/vue-1/component';

@Component({
    selector: 'vue-doc-page',
    imports: [Example1, RouterLink, TuiAddonDoc, TuiLink, TuiNotification],
    templateUrl: './vue-doc.template.html',
    styleUrl: './vue-doc.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VueDocPageComponent {
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;

    protected readonly useMaskitoBasicUsage =
        import('./examples/use-maskito-basic-usage.md');

    protected readonly queryNestedInputDemo = import('./examples/query-nested-input.md');
    protected readonly bestBadPractice = import('./examples/best-bad-practice.md');
}
