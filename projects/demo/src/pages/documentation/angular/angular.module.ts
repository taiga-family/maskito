import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {AngularDocPageComponent} from './angular.component';
import {NestedDocExample1} from './examples/1-nested/component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaskitoModule,
        TuiInputModule,
        TuiLinkModule,
        TuiNotificationModule,
        TuiAddonDocModule,
        RouterModule.forChild(tuiGenerateRoutes(AngularDocPageComponent)),
    ],
    declarations: [AngularDocPageComponent, NestedDocExample1],
    exports: [AngularDocPageComponent],
})
export class AngularDocPageModule {}
