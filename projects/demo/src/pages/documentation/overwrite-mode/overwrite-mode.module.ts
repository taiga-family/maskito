import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiHintModule, TuiLinkModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule, TuiTextAreaModule} from '@taiga-ui/kit';

import {NextStepsModule} from '../next-steps/next-steps.module';
import {OverwriteModeDocExample3} from './examples/dynamic/component';
import {OverwriteModeDocExample2} from './examples/replace/component';
import {OverwriteModeDocExample1} from './examples/shift/component';
import {OverwriteModeDocPageComponent} from './overwrite-mode.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiLinkModule,
        TuiInputModule,
        TuiHintModule,
        TuiTextAreaModule,
        TuiTextfieldControllerModule,
        NextStepsModule,
        RouterModule.forChild(tuiGenerateRoutes(OverwriteModeDocPageComponent)),
    ],
    declarations: [
        OverwriteModeDocPageComponent,
        OverwriteModeDocExample1,
        OverwriteModeDocExample2,
        OverwriteModeDocExample3,
    ],
    exports: [OverwriteModeDocPageComponent],
})
export class OverwriteModeDocPageModule {}
