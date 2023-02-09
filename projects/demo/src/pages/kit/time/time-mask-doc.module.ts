import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {TimeMaskDocExample1} from './examples/1-modes/component';
import {TimeMaskDocExample2} from './examples/2-twelve-hour-format/component';
import {TimeMaskDocComponent} from './time-mask-doc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        RouterModule.forChild(tuiGenerateRoutes(TimeMaskDocComponent)),
    ],
    declarations: [TimeMaskDocComponent, TimeMaskDocExample1, TimeMaskDocExample2],
    exports: [TimeMaskDocComponent],
})
export class TimeMaskDocModule {}
