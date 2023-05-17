import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {
    TuiFlagPipeModule,
    TuiLinkModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {PlaceholderDocExample1} from './examples/1-cvc-code/component';
import {PlaceholderDocExample2} from './examples/2-phone/component';
import {PlaceholderDocExample3} from './examples/3-date/component';
import {PlaceholderDocComponent} from './placeholder-doc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiFlagPipeModule,
        TuiInputModule,
        TuiLinkModule,
        TuiTextfieldControllerModule,
        RouterModule.forChild(tuiGenerateRoutes(PlaceholderDocComponent)),
    ],
    declarations: [
        PlaceholderDocComponent,
        PlaceholderDocExample1,
        PlaceholderDocExample2,
        PlaceholderDocExample3,
    ],
    exports: [PlaceholderDocComponent],
})
export class PlaceholderDocModule {}
