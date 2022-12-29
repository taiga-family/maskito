import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiHintModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';
import {NumberMaskDocComponent} from './number-mask-doc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiHintModule,
        TuiInputModule,
        RouterModule.forChild(tuiGenerateRoutes(NumberMaskDocComponent)),
    ],
    declarations: [NumberMaskDocComponent],
    exports: [NumberMaskDocComponent],
})
export class NumberMaskDocModule {}
