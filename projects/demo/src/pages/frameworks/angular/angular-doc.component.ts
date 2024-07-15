import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import {NestedDocExample1} from './examples/1-nested/component';
import {NestedDocExample2} from './examples/2-nested/component';
import {ProgrammaticallyDocExample3} from './examples/3-programmatically/component';
import {PipeDocExample4} from './examples/4-pipe/component';

@Component({
    standalone: true,
    selector: 'angular-doc-page',
    imports: [
        MaskitoDirective,
        RouterLink,
        TuiAddonDoc,
        TuiNotification,
        TuiLink,
        NestedDocExample1,
        NestedDocExample2,
        ProgrammaticallyDocExample3,
        PipeDocExample4,
    ],
    templateUrl: './angular-doc.template.html',
    styleUrls: ['./angular-doc.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularDocPageComponent {
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;

    protected readonly importMaskitoExample = import('./examples/import-maskito.md?raw');

    protected readonly basicDirectiveApproach = import(
        './examples/basic-directive-approach.md?raw'
    );

    protected readonly customInputExample = import(
        './examples/custom-input-example.md?raw'
    );

    protected readonly nestedInputExample: Record<string, Promise<unknown> | string> = {
        TypeScript: import('./examples/1-nested/component.ts?raw'),
        Default: import('./examples/1-nested/template.html?raw'),
        Custom: import('./examples/2-nested/template.html?raw'),
    };

    protected readonly programmaticallyExample: Record<
        string,
        Promise<unknown> | string
    > = {
        TypeScript: import('./examples/3-programmatically/component.ts?raw'),
        HTML: import('./examples/3-programmatically/template.html?raw'),
    };

    protected readonly pipeExample: Record<string, Promise<unknown> | string> = {
        TypeScript: import('./examples/4-pipe/component.ts?raw'),
        HTML: import('./examples/4-pipe/template.html?raw'),
    };
}
