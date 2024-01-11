import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoDirective} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {PluginsDocExample1} from './examples/1-reject/component';
import {PluginsDocExample2} from './examples/2-initial-calibration/component';
import {PluginsDocExample3} from './examples/3-strict-composition/component';
import {PluginsDocPageComponent} from './plugins.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaskitoDirective,
        TuiLinkModule,
        TuiInputModule,
        TuiNotificationModule,
        TuiAddonDocModule,
        RouterModule.forChild(tuiGenerateRoutes(PluginsDocPageComponent)),
        PluginsDocPageComponent,
        PluginsDocExample1,
        PluginsDocExample2,
        PluginsDocExample3,
    ],
    exports: [PluginsDocPageComponent],
})
export class PluginsDocPageModule {}
