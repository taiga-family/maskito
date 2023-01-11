import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '../../../app/app.routes';

@Component({
    selector: 'what-is-maskito-doc-page',
    templateUrl: './what-is-maskito.template.html',
    styleUrls: ['./what-is-maskito.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatIsMaskitoDocPageComponent {
    readonly maskitoLibrariesDocPage = `/${DemoPath.MaskitoLibraries}`;
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
}
