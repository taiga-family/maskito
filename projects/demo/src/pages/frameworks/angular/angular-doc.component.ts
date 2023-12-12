import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/constants';
import {TuiDocExample} from '@taiga-ui/addon-doc';

@Component({
    selector: 'angular-doc-page',
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

    readonly cvaExample: TuiDocExample = {
        TypeScript: import('./examples/3-cva/component.ts?raw'),
        HTML: import('./examples/3-cva/template.html?raw'),
    };

    readonly pipeExample: TuiDocExample = {
        TypeScript: import('./examples/4-pipe/component.ts?raw'),
        HTML: import('./examples/4-pipe/template.html?raw'),
    };
}
