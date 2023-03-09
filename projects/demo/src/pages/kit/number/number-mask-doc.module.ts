import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiNotificationModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {NumberMaskDocExample1} from './examples/1-high-precision/component';
import {NumberMaskDocExample2} from './examples/2-separators/component';
import {NumberMaskDocExample3} from './examples/3-decimal-zero-padding/component';
import {NumberMaskDocExample4} from './examples/4-dynamic-decimal-zero-padding/component';
import {NumberMaskDocComponent} from './number-mask-doc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiInputModule,
        TuiNotificationModule,
        TuiTextfieldControllerModule,
        RouterModule.forChild(tuiGenerateRoutes(NumberMaskDocComponent)),
    ],
    declarations: [
        NumberMaskDocComponent,
        NumberMaskDocExample1,
        NumberMaskDocExample2,
        NumberMaskDocExample3,
        NumberMaskDocExample4,
    ],
    exports: [NumberMaskDocComponent],
})
export class NumberMaskDocModule {}
