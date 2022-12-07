import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiInputModule} from '@taiga-ui/kit';
import {KitTemplateComponent} from './kit-template.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiInputModule,
        RouterModule.forChild(tuiGenerateRoutes(KitTemplateComponent)),
    ],
    declarations: [KitTemplateComponent],
    exports: [KitTemplateComponent],
})
export class KitTemplateModule {}
