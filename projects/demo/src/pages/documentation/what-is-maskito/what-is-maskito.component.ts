import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiSurface, TuiTitle} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';

@Component({
    selector: 'what-is-maskito-doc-page',
    imports: [
        RouterLink,
        TuiAddonDoc,
        TuiAvatar,
        TuiCardLarge,
        TuiHeader,
        TuiLink,
        TuiSurface,
        TuiTitle,
    ],
    templateUrl: './what-is-maskito.template.html',
    styleUrl: './what-is-maskito.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WhatIsMaskitoDocPageComponent {
    protected readonly maskitoLibrariesDocPage = `/${DemoPath.MaskitoLibraries}`;
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    protected readonly angularDocPage = `/${DemoPath.Angular}`;
    protected readonly reactDocPage = `/${DemoPath.React}`;
    protected readonly vueDocPage = `/${DemoPath.Vue}`;
}
