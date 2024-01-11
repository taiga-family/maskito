import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';

import {BrowserSupportComponent} from './browser-support.component';

@NgModule({
    imports: [
        CommonModule,
        TuiAddonDocModule,
        RouterModule.forChild(tuiGenerateRoutes(BrowserSupportComponent)),
        BrowserSupportComponent,
    ],
    exports: [BrowserSupportComponent],
})
export class BrowserSupportModule {}
