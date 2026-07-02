import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import {TuiAddonDoc, type TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification, TuiTitle} from '@taiga-ui/core';

import Example1 from './examples/1-nested/component';
import Example2 from './examples/2-nested/component';
import Example3 from './examples/3-pattern/component';
import Example4 from './examples/4-pipe/component';
import Example5 from './examples/5-custom-unmask-handler';
import Example6 from './examples/6-programmatically/component';
import Example7 from './examples/7-cva-auto-transform';

@Component({
    selector: 'angular-doc-page',
    imports: [
        Example1,
        Example2,
        Example3,
        Example4,
        Example5,
        Example6,
        Example7,
        MaskitoDirective,
        RouterLink,
        TuiAddonDoc,
        TuiLink,
        TuiNotification,
        TuiTitle,
    ],
    templateUrl: './angular-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AngularDocPageComponent {
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    protected readonly importMaskitoExample = import('./examples/import-maskito.md');

    protected readonly basicDirectiveApproach =
        import('./examples/basic-directive-approach.md');

    protected readonly customInputExample = import('./examples/custom-input-example.md');

    protected readonly nestedInputExample: Record<string, TuiRawLoaderContent> = {
        TypeScript: import('./examples/1-nested/component.ts?raw', {
            with: {loader: 'text'},
        }),
        Default: import('./examples/1-nested/template.html'),
        Custom: import('./examples/2-nested/template.html'),
    };

    protected readonly programmaticallyExample: Record<string, TuiRawLoaderContent> = {
        TypeScript: import('./examples/6-programmatically/component.ts?raw', {
            with: {loader: 'text'},
        }),
        HTML: import('./examples/6-programmatically/template.html'),
    };

    protected readonly pipeExample: Record<string, TuiRawLoaderContent> = {
        TypeScript: import('./examples/4-pipe/component.ts?raw', {
            with: {loader: 'text'},
        }),
        HTML: import('./examples/4-pipe/template.html'),
    };

    protected readonly customUnmaskHandlerExample: Record<string, TuiRawLoaderContent> = {
        'index.html': import('./examples/5-custom-unmask-handler/index.html'),
        'index.ts': import('./examples/5-custom-unmask-handler/index.ts?raw', {
            with: {loader: 'text'},
        }),
        'unmask.directive.ts': import(
            './examples/5-custom-unmask-handler/unmask.directive.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly patternDirectiveExample: Record<string, TuiRawLoaderContent> = {
        TypeScript: import('./examples/3-pattern/component.ts?raw', {
            with: {loader: 'text'},
        }),
        HTML: import('./examples/3-pattern/template.html'),
    };

    protected readonly cvaAutoTransformExample: Record<string, TuiRawLoaderContent> = {
        TypeScript: import('./examples/7-cva-auto-transform/index.ts?raw', {
            with: {loader: 'text'},
        }),
        HTML: import('./examples/7-cva-auto-transform/index.html'),
        'auto-transform.ts': import(
            './examples/7-cva-auto-transform/auto-transform.ts?raw',
            {with: {loader: 'text'}}
        ),
        'custom-input.ts': import('./examples/7-cva-auto-transform/custom-input.ts?raw', {
            with: {loader: 'text'},
        }),
    };
}
