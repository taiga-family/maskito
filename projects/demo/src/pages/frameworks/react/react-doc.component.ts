import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';
import {TuiTabs} from '@taiga-ui/kit';

import {ReactExample1} from './examples/1-use-maskito-basic-usage/example.component';
import {ReactExample2} from './examples/2-element-predicate/example.component';

@Component({
    selector: 'react-doc-page',
    imports: [
        ReactExample1,
        ReactExample2,
        RouterLink,
        TuiAddonDoc,
        TuiLink,
        TuiNotification,
        TuiTabs,
    ],
    templateUrl: './react-doc.template.html',
    styleUrls: ['./react-doc.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReactDocPageComponent {
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    protected readonly useMaskitoBasicUsage = import(
        './examples/1-use-maskito-basic-usage/use-maskito-basic-usage.tsx?raw'
    );

    protected readonly controlledInputDemo = import('./examples/controlled-input.md?raw');
    protected readonly mergeRefDemo = import('./examples/merge-ref.md?raw');

    protected readonly elementPredicateExample: Record<string, TuiRawLoaderContent> = {
        'index.tsx': import('./examples/2-element-predicate/index.tsx?raw'),
        'awesome-input.tsx': import(
            './examples/2-element-predicate/awesome-input.tsx?raw'
        ),
    };

    protected readonly reactHookFormExample: Record<string, TuiRawLoaderContent> = {
        'index.tsx': import('./examples/3-react-hook-form/index.tsx?raw'),
        'with-maskito-register.ts': import(
            './examples/3-react-hook-form/with-maskito-register.ts?raw'
        ),
    };

    protected readonly bestBadPractice = import('./examples/best-bad-practice.md?raw');
}
