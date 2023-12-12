import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoDirective} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {NextStepsModule} from '../next-steps/next-steps.module';
import {PluginsDocExample1} from './examples/reject/component';
import {PluginsDocPageComponent} from './plugins.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaskitoDirective,
        TuiLinkModule,
        TuiInputModule,
        TuiNotificationModule,
        NextStepsModule,
        TuiAddonDocModule,
        RouterModule.forChild(tuiGenerateRoutes(PluginsDocPageComponent)),
    ],
    declarations: [PluginsDocPageComponent, PluginsDocExample1],
    exports: [PluginsDocPageComponent],
})
export class PluginsDocPageModule {}
