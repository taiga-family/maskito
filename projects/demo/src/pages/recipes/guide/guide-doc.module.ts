import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {
    TuiFlagPipeModule,
    TuiLinkModule,
    TuiNotificationModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {GuideDocExample1} from './examples/1-cvc-code/component';
import {GuideDocExample2} from './examples/2-phone/component';
import {GuideDocExample3} from './examples/3-date/component';
import {GuideDocComponent} from './guide-doc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiFlagPipeModule,
        TuiInputModule,
        TuiLinkModule,
        TuiNotificationModule,
        TuiTextfieldControllerModule,
        RouterModule.forChild(tuiGenerateRoutes(GuideDocComponent)),
    ],
    declarations: [
        GuideDocComponent,
        GuideDocExample1,
        GuideDocExample2,
        GuideDocExample3,
    ],
    exports: [GuideDocComponent],
})
export class GuideDocModule {}
