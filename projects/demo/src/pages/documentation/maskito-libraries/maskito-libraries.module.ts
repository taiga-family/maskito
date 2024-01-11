import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

import {MaskitoLibrariesDocPageComponent} from './maskito-libraries.component';

@NgModule({
    imports: [
        CommonModule,
        TuiAddonDocModule,
        TuiLinkModule,
        TuiNotificationModule,
        RouterModule.forChild(tuiGenerateRoutes(MaskitoLibrariesDocPageComponent)),
        MaskitoLibrariesDocPageComponent,
    ],
    exports: [MaskitoLibrariesDocPageComponent],
})
export class MaskitoLibrariesDocPageModule {}
