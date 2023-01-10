import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {
    TuiHintModule,
    TuiNotificationModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';
import {NumberMaskDocComponent} from './number-mask-doc.component';
import {NumberMaskDocExample1} from './examples/1-high-precision/component';
import {NumberMaskDocExample2} from './examples/2-separators/component';
import {NumberMaskDocExample3} from './examples/3-decimal-zero-padding/component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiHintModule,
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
    ],
    exports: [NumberMaskDocComponent],
})
export class NumberMaskDocModule {}
