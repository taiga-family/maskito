import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/constants';

@Component({
    selector: 'what-is-maskito-doc-page',
    templateUrl: './what-is-maskito.template.html',
    styleUrls: ['./what-is-maskito.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatIsMaskitoDocPageComponent {
    readonly maskitoLibrariesDocPage = `/${DemoPath.MaskitoLibraries}`;
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    readonly angularDocPage = `/${DemoPath.Angular}`;
    readonly reactDocPage = `/${DemoPath.React}`;
    readonly vueDocPage = `/${DemoPath.Vue}`;
}
