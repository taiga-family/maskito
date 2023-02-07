import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {PhoneUSDocExample1} from './examples/1-us-phone/component';
import {PhoneRUDocExample2} from './examples/2-ru-phone/component';
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
        TuiTextfieldControllerModule,
        RouterModule.forChild(tuiGenerateRoutes(PhoneDocComponent)),
    ],
    declarations: [PhoneDocComponent, PhoneUSDocExample1, PhoneRUDocExample2],
    exports: [PhoneDocComponent],
})
export class PhoneDocModule {}
