import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';

import {ElementStateDocPageComponent} from './element-state.component';

@NgModule({
    imports: [
        CommonModule,
        TuiAddonDocModule,
        TuiLinkModule,
        RouterModule.forChild(tuiGenerateRoutes(ElementStateDocPageComponent)),
        ElementStateDocPageComponent,
    ],
    exports: [ElementStateDocPageComponent],
})
export class ElementStateDocPageModule {}
