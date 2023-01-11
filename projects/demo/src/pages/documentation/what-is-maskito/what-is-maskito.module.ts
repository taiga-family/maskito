import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {TuiIslandModule, TuiMarkerIconModule} from '@taiga-ui/kit';
import {WhatIsMaskitoDocPageComponent} from './what-is-maskito.component';

@NgModule({
    imports: [
        CommonModule,
        TuiAddonDocModule,
        TuiIslandModule,
        TuiLinkModule,
        TuiMarkerIconModule,
        RouterModule.forChild(tuiGenerateRoutes(WhatIsMaskitoDocPageComponent)),
    ],
    declarations: [WhatIsMaskitoDocPageComponent],
    exports: [WhatIsMaskitoDocPageComponent],
})
export class WhatIsMaskitoDocPageModule {}
