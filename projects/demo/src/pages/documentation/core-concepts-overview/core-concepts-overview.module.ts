import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {TuiIslandModule, TuiMarkerIconModule} from '@taiga-ui/kit';

import {CoreConceptsOverviewDocPageComponent} from './core-concepts-overview.component';

@NgModule({
    imports: [
        CommonModule,
        TuiAddonDocModule,
        TuiIslandModule,
        TuiLinkModule,
        TuiMarkerIconModule,
        RouterModule.forChild(tuiGenerateRoutes(CoreConceptsOverviewDocPageComponent)),
    ],
    declarations: [CoreConceptsOverviewDocPageComponent],
    exports: [CoreConceptsOverviewDocPageComponent],
})
export class CoreConceptsOverviewDocPageModule {}
