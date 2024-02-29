import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {TuiIslandModule, TuiMarkerIconModule} from '@taiga-ui/kit';

@Component({
    standalone: true,
    selector: 'what-is-maskito-doc-page',
    imports: [
        RouterLink,
        TuiAddonDocModule,
        TuiIslandModule,
        TuiLinkModule,
        TuiMarkerIconModule,
    ],
    templateUrl: './what-is-maskito.template.html',
    styleUrls: ['./what-is-maskito.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WhatIsMaskitoDocPageComponent {
    protected readonly maskitoLibrariesDocPage = `/${DemoPath.MaskitoLibraries}`;
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    protected readonly angularDocPage = `/${DemoPath.Angular}`;
    protected readonly reactDocPage = `/${DemoPath.React}`;
    protected readonly vueDocPage = `/${DemoPath.Vue}`;
}
