import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MaskitoDirective} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

import {AngularDocPageComponent} from './angular-doc.component';
import {NestedDocExample1} from './examples/1-nested/component';
import {NestedDocExample2} from './examples/2-nested/component';
import {CvaDocExample3} from './examples/3-cva/component';
import {PipeDocExample4} from './examples/4-pipe/component';

@NgModule({
    imports: [
        CommonModule,
        MaskitoDirective,
        TuiLinkModule,
        TuiNotificationModule,
        TuiAddonDocModule,
        RouterModule.forChild(tuiGenerateRoutes(AngularDocPageComponent)),
        NestedDocExample1,
        NestedDocExample2,
        CvaDocExample3,
        PipeDocExample4,
        AngularDocPageComponent,
    ],
    exports: [AngularDocPageComponent],
})
export class AngularDocPageModule {}
