import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {
    TuiErrorModule,
    TuiLinkModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';

import {DateMaskDocExample1} from './examples/1-basic/component';
import {PhoneDocComponent} from './phone-doc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiInputModule,
        TuiLinkModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiTextfieldControllerModule,
        RouterModule.forChild(tuiGenerateRoutes(PhoneDocComponent)),
    ],
    declarations: [PhoneDocComponent, DateMaskDocExample1],
    exports: [PhoneDocComponent],
})
export class PhoneDocModule {}
