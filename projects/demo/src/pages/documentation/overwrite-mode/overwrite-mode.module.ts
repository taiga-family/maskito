import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoDirective} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiHintModule, TuiLinkModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule, TuiTextareaModule} from '@taiga-ui/kit';

import {OverwriteModeDocExample3} from './examples/dynamic/component';
import {OverwriteModeDocExample2} from './examples/replace/component';
import {OverwriteModeDocExample1} from './examples/shift/component';
import {OverwriteModeDocPageComponent} from './overwrite-mode.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaskitoDirective,
        TuiAddonDocModule,
        TuiLinkModule,
        TuiInputModule,
        TuiHintModule,
        TuiTextareaModule,
        TuiTextfieldControllerModule,
        RouterModule.forChild(tuiGenerateRoutes(OverwriteModeDocPageComponent)),
        OverwriteModeDocPageComponent,
        OverwriteModeDocExample1,
        OverwriteModeDocExample2,
        OverwriteModeDocExample3,
    ],
    exports: [OverwriteModeDocPageComponent],
})
export class OverwriteModeDocPageModule {}
