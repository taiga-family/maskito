import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';
import {TuiCheckboxLabeledModule, TuiInputModule} from '@taiga-ui/kit';

import {AngularDocPageComponent} from './angular-doc.component';
import {NestedDocExample1} from './examples/1-nested/component';
import {NestedDocExample2} from './examples/2-nested/component';
import {CvaDocExample3} from './examples/3-cva/component';
import {PipeDocExample4} from './examples/4-pipe/component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaskitoModule,
        TuiInputModule,
        TuiLinkModule,
        TuiNotificationModule,
        TuiCheckboxLabeledModule,
        TuiAddonDocModule,
        RouterModule.forChild(tuiGenerateRoutes(AngularDocPageComponent)),
    ],
    declarations: [
        AngularDocPageComponent,
        NestedDocExample1,
        NestedDocExample2,
        CvaDocExample3,
        PipeDocExample4,
    ],
    exports: [AngularDocPageComponent],
})
export class AngularDocPageModule {}
