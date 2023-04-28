import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/path';

@Component({
    selector: 'react-doc-page',
    templateUrl: './react-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactDocPageComponent {
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    readonly useMaskitoBasicUsage = import('./examples/use-maskito-basic-usage.md?raw');
    readonly queryNestedInputDemo = import('./examples/query-nested-input.md?raw');
    readonly controlledInputDemo = import('./examples/controlled-input.md?raw');
}
