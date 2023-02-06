import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiHintModule, TuiLinkModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {DateRangeMaskDocComponent} from './date-range-mask-doc.component';
import {DateRangeMaskDocExample1} from './examples/1-date-localization/component';
import {DateRangeMaskDocExample2} from './examples/2-min-max/component';
import {DateRangeMaskDocExample3} from './examples/3-min-max-length/component';

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
        RouterModule.forChild(tuiGenerateRoutes(DateRangeMaskDocComponent)),
    ],
    declarations: [
        DateRangeMaskDocComponent,
        DateRangeMaskDocExample1,
        DateRangeMaskDocExample2,
        DateRangeMaskDocExample3,
    ],
    exports: [DateRangeMaskDocComponent],
})
export class DateRangeMaskDocModule {}
