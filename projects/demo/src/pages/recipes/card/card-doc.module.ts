import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {
    TuiGroupModule,
    TuiHintModule,
    TuiLabelModule,
    TuiNotificationModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {CardDocComponent} from './card-doc.component';
import {CardDocExample1} from './examples/1-basic/component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiHintModule,
        TuiInputModule,
        TuiLabelModule,
        TuiNotificationModule,
        TuiGroupModule,
        TuiTextfieldControllerModule,
        RouterModule.forChild(tuiGenerateRoutes(CardDocComponent)),
    ],
    declarations: [CardDocComponent, CardDocExample1],
    exports: [CardDocComponent],
})
export class CardDocModule {}
