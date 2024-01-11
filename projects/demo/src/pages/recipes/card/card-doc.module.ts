import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoDirective} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiGroupModule, TuiLinkModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {CardDocComponent} from './card-doc.component';
import {CardDocExample1} from './examples/1-basic/component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaskitoDirective,
        TuiAddonDocModule,
        TuiInputModule,
        TuiGroupModule,
        TuiLinkModule,
        RouterModule.forChild(tuiGenerateRoutes(CardDocComponent)),
        CardDocComponent,
        CardDocExample1,
    ],
    exports: [CardDocComponent],
})
export class CardDocModule {}
