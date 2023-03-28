import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {PrefixDocExample1} from './examples/1-pattern-mask/component';
import {PrefixDocExample2} from './examples/2-postprocessor/component';
import {PrefixDocComponent} from './prefix-doc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiInputModule,
        TuiLinkModule,
        TuiNotificationModule,
        RouterModule.forChild(tuiGenerateRoutes(PrefixDocComponent)),
    ],
    declarations: [PrefixDocComponent, PrefixDocExample1, PrefixDocExample2],
    exports: [PrefixDocComponent],
})
export class PrefixDocModule {}
