import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import {TuiAddonDocModule, TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

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
        TuiAddonDocModule,
        TuiNotificationModule,
        TuiLinkModule,
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
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;

    readonly importMaskitoExample = import('./examples/import-maskito.md?raw');

    readonly basicDirectiveApproach = import(
        './examples/basic-directive-approach.md?raw'
    );

    readonly customInputExample = import('./examples/custom-input-example.md?raw');

    readonly nestedInputExample: TuiDocExample = {
        TypeScript: import('./examples/1-nested/component.ts?raw'),
        Default: import('./examples/1-nested/template.html?raw'),
        Custom: import('./examples/2-nested/template.html?raw'),
    };

    readonly programmaticallyExample: TuiDocExample = {
        TypeScript: import('./examples/3-programmatically/component.ts?raw'),
        HTML: import('./examples/3-programmatically/template.html?raw'),
    };

    readonly pipeExample: TuiDocExample = {
        TypeScript: import('./examples/4-pipe/component.ts?raw'),
        HTML: import('./examples/4-pipe/template.html?raw'),
    };
}
