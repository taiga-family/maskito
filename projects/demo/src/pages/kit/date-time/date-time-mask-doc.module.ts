import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiHintModule, TuiLinkModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {DateTimeMaskDocComponent} from './date-time-mask-doc.component';
import {DateTimeMaskDocExample1} from './examples/1-date-time-localization/component';
import {DateTimeMaskDocExample2} from './examples/2-min-max/component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiHintModule,
        TuiInputModule,
        TuiLinkModule,
        TuiTextfieldControllerModule,
        RouterModule.forChild(tuiGenerateRoutes(DateTimeMaskDocComponent)),
    ],
    declarations: [
        DateTimeMaskDocComponent,
        DateTimeMaskDocExample1,
        DateTimeMaskDocExample2,
    ],
    exports: [DateTimeMaskDocComponent],
})
export class DateTimeMaskDocModule {}
