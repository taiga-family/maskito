import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/constants';

@Component({
    selector: 'vue-doc-page',
    templateUrl: './vue-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VueDocPageComponent {
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    readonly useMaskitoBasicUsage = import('./examples/use-maskito-basic-usage.md?raw');
    readonly queryNestedInputDemo = import('./examples/query-nested-input.md?raw');
    readonly bestBadPractice = import('./examples/best-bad-practice.md?raw');
}
