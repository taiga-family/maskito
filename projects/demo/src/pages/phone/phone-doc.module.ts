import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {
    TuiErrorModule,
    TuiLinkModule,
    TuiNotificationModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';

import {PhoneMaskDocExample1} from './examples/1-basic/component';
import {PhoneMaskDocExample2} from './examples/2-validation/component';
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
        TuiNotificationModule,
        TuiFieldErrorPipeModule,
        TuiTextfieldControllerModule,
        RouterModule.forChild(tuiGenerateRoutes(PhoneDocComponent)),
    ],
    declarations: [PhoneDocComponent, PhoneMaskDocExample1, PhoneMaskDocExample2],
    exports: [PhoneDocComponent],
})
export class PhoneDocModule {}
