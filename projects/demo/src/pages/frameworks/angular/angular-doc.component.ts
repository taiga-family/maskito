import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import {TuiAddonDoc, type TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import {NestedDocExample1} from './examples/1-nested/component';
import {NestedDocExample2} from './examples/2-nested/component';
import {PatternDocExample3} from './examples/3-pattern/component';
import {PipeDocExample4} from './examples/4-pipe/component';
import {UnmaskDocExample5} from './examples/5-custom-unmask-handler';
import {ProgrammaticallyDocExample6} from './examples/6-programmatically/component';
import {CvaAutoTransformDocExample7} from './examples/7-cva-auto-transform';

@Component({
    selector: 'angular-doc-page',
    imports: [
        CvaAutoTransformDocExample7,
        MaskitoDirective,
        NestedDocExample1,
        NestedDocExample2,
        PatternDocExample3,
        PipeDocExample4,
        ProgrammaticallyDocExample6,
        RouterLink,
        TuiAddonDoc,
        TuiLink,
        TuiNotification,
        UnmaskDocExample5,
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
