import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/path';

@Component({
    selector: 'angular-doc-page',
    templateUrl: './angular.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularDocPageComponent {
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;

    readonly importMaskitoModuleExample = import(
        './examples/import-maskito-module.md?raw'
    );

    readonly basicDirectiveApproach = import(
        './examples/basic-directive-approach.md?raw'
    );

    readonly customInputExample = import('./examples/custom-input-example.md?raw');
    readonly customInputDiApproachExample = import(
        './examples/custom-input-di-approach-inside.md?raw'
    );

    readonly diApproachInAction = import('./examples/di-approach-usage.md?raw');
}
