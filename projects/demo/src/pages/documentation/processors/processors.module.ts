import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

import {ProcessorsDocPageComponent} from './processors.component';

@NgModule({
    imports: [
        CommonModule,
        TuiAddonDocModule,
        TuiLinkModule,
        TuiNotificationModule,
        RouterModule.forChild(tuiGenerateRoutes(ProcessorsDocPageComponent)),
        ProcessorsDocPageComponent,
    ],
    exports: [ProcessorsDocPageComponent],
})
export class ProcessorsDocPageModule {}
