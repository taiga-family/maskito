import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoDirective} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

import {ReactExample1} from './examples/1-use-maskito-basic-usage/example.component';
import {ReactExample2} from './examples/2-element-predicate/example.component';
import {ReactDocPageComponent} from './react-doc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaskitoDirective,
        TuiAddonDocModule,
        TuiLinkModule,
        TuiNotificationModule,
        RouterModule.forChild(tuiGenerateRoutes(ReactDocPageComponent)),
    ],
    declarations: [ReactDocPageComponent, ReactExample1, ReactExample2],
    exports: [ReactDocPageComponent],
})
export class ReactDocPageModule {}
