import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {
    TuiDocCodeModule,
    TuiDocExampleModule,
    TuiDocPageModule,
    TuiRawLoaderContent,
} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

import {ReactExample1} from './examples/1-use-maskito-basic-usage/example.component';
import {ReactExample2} from './examples/2-element-predicate/example.component';

@Component({
    standalone: true,
    selector: 'react-doc-page',
    imports: [
        TuiDocPageModule,
        TuiNotificationModule,
        TuiLinkModule,
        RouterLink,
        TuiDocCodeModule,
        TuiDocExampleModule,
        ReactExample1,
        ReactExample2,
    ],
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
