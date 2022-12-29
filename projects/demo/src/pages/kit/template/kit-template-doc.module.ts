import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiInputModule} from '@taiga-ui/kit';
import {KitTemplateDocComponent} from './kit-template-doc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiInputModule,
        RouterModule.forChild(tuiGenerateRoutes(KitTemplateDocComponent)),
    ],
    declarations: [KitTemplateDocComponent],
    exports: [KitTemplateDocComponent],
})
export class KitTemplateDocModule {}
