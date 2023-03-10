import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {PostfixDocExample1} from './examples/1-percentage/component';
import {PostfixDocExample2} from './examples/2-time-pm/component';
import {PostfixDocComponent} from './postfix-doc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiInputModule,
        TuiLinkModule,
        TuiNotificationModule,
        RouterModule.forChild(tuiGenerateRoutes(PostfixDocComponent)),
    ],
    declarations: [PostfixDocComponent, PostfixDocExample1, PostfixDocExample2],
    exports: [PostfixDocComponent],
})
export class PostfixDocModule {}
