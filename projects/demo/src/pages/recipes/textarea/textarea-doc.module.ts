import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {TuiTextareaModule} from '@taiga-ui/kit';

import {TextareaDocExample1} from './examples/1-latin/component';
import {TextareaDocComponent} from './textarea-doc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaskitoModule,
        TuiAddonDocModule,
        TuiTextareaModule,
        TuiLinkModule,
        RouterModule.forChild(tuiGenerateRoutes(TextareaDocComponent)),
    ],
    declarations: [TextareaDocComponent, TextareaDocExample1],
    exports: [TextareaDocComponent],
})
export class TextareaDocModule {}
