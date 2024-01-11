import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/constants';
import {TuiRawLoaderContent} from '@taiga-ui/addon-doc';

@Component({
    selector: 'react-doc-page',
    templateUrl: './react-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactDocPageComponent {
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    readonly useMaskitoBasicUsage = import(
        './examples/1-use-maskito-basic-usage/use-maskito-basic-usage.tsx?raw'
    );

    readonly elementPredicateExample: Record<string, TuiRawLoaderContent> = {
        'index.tsx': import('./examples/2-element-predicate/index.tsx?raw'),
        'awesome-input.tsx': import(
            './examples/2-element-predicate/awesome-input.tsx?raw'
        ),
    };

    readonly controlledInputDemo = import('./examples/controlled-input.md?raw');
    readonly bestBadPractice = import('./examples/best-bad-practice.md?raw');
}
