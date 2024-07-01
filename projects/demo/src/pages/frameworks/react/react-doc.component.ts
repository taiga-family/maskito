import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import {ReactExample1} from './examples/1-use-maskito-basic-usage/example.component';
import {ReactExample2} from './examples/2-element-predicate/example.component';

@Component({
    standalone: true,
    selector: 'react-doc-page',
    imports: [
        TuiAddonDocModule,
        TuiNotification,
        TuiLink,
        RouterLink,
        ReactExample1,
        ReactExample2,
    ],
    templateUrl: './react-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReactDocPageComponent {
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    protected readonly useMaskitoBasicUsage = import(
        './examples/1-use-maskito-basic-usage/use-maskito-basic-usage.tsx?raw'
    );

    protected readonly elementPredicateExample: Record<string, TuiRawLoaderContent> = {
        'index.tsx': import('./examples/2-element-predicate/index.tsx?raw'),
        'awesome-input.tsx': import(
            './examples/2-element-predicate/awesome-input.tsx?raw'
        ),
    };

    protected readonly controlledInputDemo = import('./examples/controlled-input.md?raw');
    protected readonly bestBadPractice = import('./examples/best-bad-practice.md?raw');
}
