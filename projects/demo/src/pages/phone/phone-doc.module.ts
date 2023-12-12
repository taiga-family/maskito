import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoDirective} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {
    TuiErrorModule,
    TuiFlagPipeModule,
    TuiLinkModule,
    TuiNotificationModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';

import {PhoneMaskDocExample1} from './examples/1-basic/component';
import {PhoneMaskDocExample2} from './examples/2-validation/component';
import {PhoneMaskDocExample3} from './examples/3-non-strict/component';
import {PhoneMaskDocExample4} from './examples/4-lazy-metadata/component';
import {PhoneDocComponent} from './phone-doc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaskitoDirective,
        TuiAddonDocModule,
        TuiInputModule,
        TuiFlagPipeModule,
        TuiLinkModule,
        TuiErrorModule,
        TuiNotificationModule,
        TuiFieldErrorPipeModule,
        TuiTextfieldControllerModule,
        RouterModule.forChild(tuiGenerateRoutes(PhoneDocComponent)),
    ],
    declarations: [
        PhoneDocComponent,
        PhoneMaskDocExample1,
        PhoneMaskDocExample2,
        PhoneMaskDocExample3,
        PhoneMaskDocExample4,
    ],
    exports: [PhoneDocComponent],
})
export class PhoneDocModule {}
