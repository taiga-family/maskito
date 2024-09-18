import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import {NestedDocExample1} from './examples/1-nested/component';
import {NestedDocExample2} from './examples/2-nested/component';
import {ProgrammaticallyDocExample3} from './examples/3-programmatically/component';
import {PipeDocExample4} from './examples/4-pipe/component';
import {UnmaskDocExample5} from './examples/5-custom-unmask-handler';

@Component({
    standalone: true,
    selector: 'angular-doc-page',
    imports: [
        MaskitoDirective,
        NestedDocExample1,
        NestedDocExample2,
        PipeDocExample4,
        ProgrammaticallyDocExample3,
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

    protected readonly importMaskitoExample = import('./examples/import-maskito.md?raw');

    protected readonly basicDirectiveApproach = import(
        './examples/basic-directive-approach.md?raw'
    );

    protected readonly customInputExample = import(
        './examples/custom-input-example.md?raw'
    );

    protected readonly nestedInputExample: Record<string, TuiRawLoaderContent> = {
        TypeScript: import('./examples/1-nested/component.ts?raw'),
        Default: import('./examples/1-nested/template.html?raw'),
        Custom: import('./examples/2-nested/template.html?raw'),
    };

    protected readonly programmaticallyExample: Record<string, TuiRawLoaderContent> = {
        TypeScript: import('./examples/3-programmatically/component.ts?raw'),
        HTML: import('./examples/3-programmatically/template.html?raw'),
    };

    protected readonly pipeExample: Record<string, TuiRawLoaderContent> = {
        TypeScript: import('./examples/4-pipe/component.ts?raw'),
        HTML: import('./examples/4-pipe/template.html?raw'),
    };

    protected readonly customUnmaskHandlerExample: Record<string, TuiRawLoaderContent> = {
        'index.html': import('./examples/5-custom-unmask-handler/index.html?raw'),
        'index.ts': import('./examples/5-custom-unmask-handler/index.ts?raw'),
        'unmask.directive.ts': import(
            './examples/5-custom-unmask-handler/unmask.directive.ts?raw'
        ),
    };
}
