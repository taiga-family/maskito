import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';
import {TuiIslandModule, TuiMarkerIconModule} from '@taiga-ui/kit';

import {CoreConceptsOverviewDocPageComponent} from './core-concepts-overview.component';

@NgModule({
    imports: [
        CommonModule,
        TuiAddonDocModule,
        TuiIslandModule,
        TuiLinkModule,
        TuiMarkerIconModule,
        TuiNotificationModule,
        RouterModule.forChild(tuiGenerateRoutes(CoreConceptsOverviewDocPageComponent)),
        CoreConceptsOverviewDocPageComponent,
    ],
    exports: [CoreConceptsOverviewDocPageComponent],
})
export class CoreConceptsOverviewDocPageModule {}
