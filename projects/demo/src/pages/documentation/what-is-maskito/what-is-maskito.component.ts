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
    readonly maskitoLibrariesDocPage = `/${DemoPath.MaskitoLibraries}`;
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    readonly angularDocPage = `/${DemoPath.Angular}`;
    readonly reactDocPage = `/${DemoPath.React}`;
    readonly vueDocPage = `/${DemoPath.Vue}`;
}
