import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

import {NextStepsModule} from '../next-steps/next-steps.module';
import {MaskExpressionDocPageComponent} from './mask-expression.component';

@NgModule({
    imports: [
        CommonModule,
        TuiAddonDocModule,
        TuiLinkModule,
        TuiNotificationModule,
        NextStepsModule,
        RouterModule.forChild(tuiGenerateRoutes(MaskExpressionDocPageComponent)),
        MaskExpressionDocPageComponent,
    ],
    exports: [MaskExpressionDocPageComponent],
})
export class MaskExpressionDocPageModule {}
